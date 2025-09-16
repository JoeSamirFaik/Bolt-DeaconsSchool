import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface AcademicConfig {
  currentAcademicYear: string;
  termStartDate: string;
  termEndDate: string;
  registrationPeriod: {
    start: string;
    end: string;
  };
  defaultPassPercentage: number;
  maxRetakeAttempts: number;
}

interface AcademicSettingsProps {
  config: AcademicConfig;
  onChange: (field: string, value: any) => void;
  onNestedChange: (nestedField: string, field: string, value: any) => void;
}

const AcademicSettings: React.FC<AcademicSettingsProps> = ({ config, onChange, onNestedChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <AcademicCapIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900 font-cairo">الإعدادات الأكاديمية</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4 font-cairo">السنة الأكاديمية الحالية</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                السنة الأكاديمية
              </label>
              <input
                type="text"
                value={config.currentAcademicYear}
                onChange={(e) => onChange('currentAcademicYear', e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  value={config.termStartDate}
                  onChange={(e) => onChange('termStartDate', e.target.value)}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  value={config.termEndDate}
                  onChange={(e) => onChange('termEndDate', e.target.value)}
                  className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 font-cairo">فترة التسجيل</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                  بداية التسجيل
                </label>
                <input
                  type="date"
                  value={config.registrationPeriod.start}
                  onChange={(e) => onNestedChange('registrationPeriod', 'start', e.target.value)}
                  className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                  نهاية التسجيل
                </label>
                <input
                  type="date"
                  value={config.registrationPeriod.end}
                  onChange={(e) => onNestedChange('registrationPeriod', 'end', e.target.value)}
                  className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                  نسبة النجاح الافتراضية (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={config.defaultPassPercentage}
                  onChange={(e) => onChange('defaultPassPercentage', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                  عدد محاولات الإعادة
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.maxRetakeAttempts}
                  onChange={(e) => onChange('maxRetakeAttempts', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicSettings;