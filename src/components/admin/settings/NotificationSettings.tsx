import React from 'react';
import { BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface NotificationConfig {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  reminderHours: number;
  digestFrequency: 'daily' | 'weekly' | 'monthly';
}

interface NotificationSettingsProps {
  config: NotificationConfig;
  onChange: (field: string, value: any) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4 sm:mb-6">
        <BellIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 font-cairo">إعدادات الإشعارات</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-purple-50 rounded-xl p-4 sm:p-6 border border-purple-200">
          <h3 className="text-base sm:text-lg font-bold text-purple-900 mb-3 sm:mb-4 font-cairo">أنواع الإشعارات</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.emailNotifications}
                  onChange={(e) => onChange('emailNotifications', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <span className="font-medium text-gray-900 font-cairo">إشعارات البريد الإلكتروني</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">إرسال إشعارات عبر البريد الإلكتروني</p>
                </div>
              </label>
            </div>
            
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.smsNotifications}
                  onChange={(e) => onChange('smsNotifications', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-base sm:text-lg">📱</span>
                    <span className="font-medium text-gray-900 font-cairo">رسائل SMS</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">إرسال رسائل نصية قصيرة</p>
                </div>
              </label>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4">
              <label className="flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.pushNotifications}
                  onChange={(e) => onChange('pushNotifications', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="text-right">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <BellIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <span className="font-medium text-gray-900 font-cairo">الإشعارات الفورية</span>
                  </div>
                  <p className="text-sm text-gray-600 font-cairo">إشعارات المتصفح والتطبيق</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 border border-indigo-200">
          <h3 className="text-base sm:text-lg font-bold text-indigo-900 mb-3 sm:mb-4 font-cairo">إعدادات التوقيت</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                إرسال التذكيرات قبل (ساعة)
              </label>
              <select
                value={config.reminderHours}
                onChange={(e) => onChange('reminderHours', parseInt(e.target.value))}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo text-sm sm:text-base"
              >
                <option value={1}>ساعة واحدة</option>
                <option value={2}>ساعتان</option>
                <option value={6}>6 ساعات</option>
                <option value={12}>12 ساعة</option>
                <option value={24}>24 ساعة</option>
                <option value={48}>48 ساعة</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                تكرار الملخص الدوري
              </label>
              <select
                value={config.digestFrequency}
                onChange={(e) => onChange('digestFrequency', e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo text-sm sm:text-base"
              >
                <option value="daily">يومي</option>
                <option value="weekly">أسبوعي</option>
                <option value="monthly">شهري</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;