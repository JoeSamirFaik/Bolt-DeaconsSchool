import React from 'react';
import { ServerIcon, UserGroupIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface SystemConfig {
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  maxFileSize: number;
  supportedLanguages: string[];
}

interface SystemSecuritySettingsProps {
  config: SystemConfig;
  onChange: (field: string, value: any) => void;
}

const SystemSecuritySettings: React.FC<SystemSecuritySettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4 sm:mb-6">
        <ServerIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-cairo">إعدادات النظام</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-red-50 rounded-xl p-4 sm:p-6 border border-red-200">
          <h3 className="text-base sm:text-lg font-bold text-red-900 mb-3 sm:mb-4 font-cairo">الأمان والوصول</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.maintenanceMode}
                  onChange={(e) => onChange('maintenanceMode', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-base sm:text-lg">🔧</span>
                    <span className="font-medium text-gray-900 font-cairo">وضع الصيانة</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">منع الوصول للمستخدمين العاديين</p>
                </div>
              </label>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.allowRegistration}
                  onChange={(e) => onChange('allowRegistration', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <UserGroupIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <span className="font-medium text-gray-900 font-cairo">السماح بالتسجيل</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">السماح للمستخدمين الجدد بالتسجيل</p>
                </div>
              </label>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.requireEmailVerification}
                  onChange={(e) => onChange('requireEmailVerification', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <span className="font-medium text-gray-900 font-cairo">تأكيد البريد الإلكتروني</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">طلب تأكيد البريد عند التسجيل</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-xl p-4 sm:p-6 border border-rose-200">
          <h3 className="text-base sm:text-lg font-bold text-rose-900 mb-3 sm:mb-4 font-cairo">إعدادات الجلسة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2 text-right font-cairo">
                انتهاء الجلسة (دقيقة)
              </label>
              <select
                value={config.sessionTimeout}
                onChange={(e) => onChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-right font-cairo text-sm sm:text-base"
              >
                <option value={30}>30 دقيقة</option>
                <option value={60}>ساعة واحدة</option>
                <option value={120}>ساعتان</option>
                <option value={240}>4 ساعات</option>
                <option value={480}>8 ساعات</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-rose-700 mb-2 text-right font-cairo">
                الحد الأقصى لحجم الملف (MB)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.maxFileSize}
                onChange={(e) => onChange('maxFileSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-right font-cairo text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSecuritySettings;