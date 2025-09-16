import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface AttendanceConfig {
  lateThresholdMinutes: number;
  excusedRequiresApproval: boolean;
  autoMarkAbsentAfterHours: number;
  attendanceGracePeriod: number;
}

interface AttendanceSettingsProps {
  config: AttendanceConfig;
  onChange: (field: string, value: any) => void;
}

const AttendanceSettings: React.FC<AttendanceSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4 sm:mb-6">
        <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-cairo">إعدادات الحضور</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-green-50 rounded-xl p-4 sm:p-6 border border-green-200">
          <h3 className="text-base sm:text-lg font-bold text-green-900 mb-3 sm:mb-4 font-cairo">قواعد الحضور</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                حد التأخير (دقيقة)
              </label>
              <input
                type="number"
                min="1"
                value={config.lateThresholdMinutes}
                onChange={(e) => onChange('lateThresholdMinutes', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                فترة السماح للحضور (دقيقة)
              </label>
              <input
                type="number"
                min="0"
                value={config.attendanceGracePeriod}
                onChange={(e) => onChange('attendanceGracePeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border border-emerald-200">
          <h3 className="text-base sm:text-lg font-bold text-emerald-900 mb-3 sm:mb-4 font-cairo">الإعدادات التلقائية</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-2 text-right font-cairo">
                تحديد الغياب تلقائياً بعد (ساعة)
              </label>
              <input
                type="number"
                min="1"
                value={config.autoMarkAbsentAfterHours}
                onChange={(e) => onChange('autoMarkAbsentAfterHours', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right font-cairo text-sm sm:text-base"
              />
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                <span className="text-sm font-medium text-emerald-700 font-cairo">الغياب بعذر يحتاج موافقة</span>
                <input
                  type="checkbox"
                  checked={config.excusedRequiresApproval}
                  onChange={(e) => onChange('excusedRequiresApproval', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSettings;