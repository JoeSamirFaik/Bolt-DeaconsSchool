import React from 'react';

interface SystemConfig {
  pointsSystem: {
    liturgyPoints: number;
    prayerPoints: number;
    lessonPoints: number;
    servicePoints: number;
    achievementBonus: number;
    streakBonus: number;
  };
  academicSettings: {
    currentAcademicYear: string;
    termStartDate: string;
    termEndDate: string;
    registrationPeriod: {
      start: string;
      end: string;
    };
    defaultPassPercentage: number;
    maxRetakeAttempts: number;
  };
  attendanceSettings: {
    lateThresholdMinutes: number;
    excusedRequiresApproval: boolean;
    autoMarkAbsentAfterHours: number;
    attendanceGracePeriod: number;
  };
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    reminderHours: number;
    digestFrequency: 'daily' | 'weekly' | 'monthly';
  };
}

interface SettingsSummaryProps {
  config: SystemConfig;
}

const SettingsSummary: React.FC<SettingsSummaryProps> = ({ config }) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-amber-200">
      <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3 sm:mb-4 text-right font-cairo">ملخص الإعدادات الحالية</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
          <div className="text-lg sm:text-2xl font-bold text-amber-600 mb-1">{config.pointsSystem.liturgyPoints}</div>
          <div className="text-xs sm:text-sm text-gray-600 font-cairo">نقاط القداس</div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">{config.academicSettings.defaultPassPercentage}%</div>
          <div className="text-xs sm:text-sm text-gray-600 font-cairo">نسبة النجاح</div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">{config.attendanceSettings.lateThresholdMinutes}</div>
          <div className="text-xs sm:text-sm text-gray-600 font-cairo">دقائق التأخير</div>
        </div>
        <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">{config.notificationSettings.reminderHours}</div>
          <div className="text-xs sm:text-sm text-gray-600 font-cairo">ساعات التذكير</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSummary;