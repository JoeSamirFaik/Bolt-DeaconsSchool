import React from 'react';
import { ShieldCheckIcon, DocumentArrowDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface BackupConfig {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  retentionDays: number;
  lastBackup?: string;
}

interface BackupSettingsProps {
  config: BackupConfig;
  onChange: (field: string, value: any) => void;
}

const BackupSettings: React.FC<BackupSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <ShieldCheckIcon className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات النسخ الاحتياطي</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-cairo">النسخ التلقائي</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.autoBackup}
                  onChange={(e) => onChange('autoBackup', e.target.checked)}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900 font-cairo">تفعيل النسخ التلقائي</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">نسخ احتياطي تلقائي للبيانات</p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                تكرار النسخ الاحتياطي
              </label>
              <select
                value={config.backupFrequency}
                onChange={(e) => onChange('backupFrequency', e.target.value)}
                disabled={!config.autoBackup}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-right font-cairo disabled:bg-gray-100"
              >
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                فترة الاحتفاظ (يوم)
              </label>
              <input
                type="number"
                min="7"
                max="365"
                value={config.retentionDays}
                onChange={(e) => onChange('retentionDays', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-right font-cairo"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 font-cairo">حالة النسخ الاحتياطي</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-cairo">نشط</span>
                </div>
                <span className="text-sm font-medium text-gray-900 font-cairo">آخر نسخة احتياطية</span>
              </div>
              <p className="text-gray-600 font-cairo text-right">
                {config.lastBackup ? 
                  new Date(config.lastBackup).toLocaleDateString('ar-EG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 
                  'لم يتم إجراء نسخ احتياطي بعد'
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors font-medium font-cairo">
                نسخ احتياطي الآن
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-medium font-cairo flex items-center justify-center space-x-2 space-x-reverse">
                <DocumentArrowDownIcon className="w-4 h-4" />
                <span>تحميل</span>
              </button>
            </div>

            <div className="bg-green-100 rounded-lg p-3 border border-green-200">
              <div className="flex items-center space-x-2 space-x-reverse">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800 font-cairo">
                  النظام يعمل بشكل طبيعي
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupSettings;