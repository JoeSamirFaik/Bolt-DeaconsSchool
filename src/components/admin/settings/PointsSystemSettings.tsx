import React from 'react';
import { TrophyIcon } from '@heroicons/react/24/outline';

interface PointsSystemConfig {
  liturgyPoints: number;
  prayerPoints: number;
  lessonPoints: number;
  servicePoints: number;
  achievementBonus: number;
  streakBonus: number;
}

interface PointsSystemSettingsProps {
  config: PointsSystemConfig;
  onChange: (field: string, value: number) => void;
}

const PointsSystemSettings: React.FC<PointsSystemSettingsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <TrophyIcon className="w-6 h-6 text-amber-600" />
        <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات نظام النقاط</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-4 font-cairo">نقاط الأنشطة الدينية</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                نقاط القداسات والصلوات الكنسية
              </label>
              <input
                type="number"
                value={config.liturgyPoints}
                onChange={(e) => onChange('liturgyPoints', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                نقاط الصلوات الشخصية
              </label>
              <input
                type="number"
                value={config.prayerPoints}
                onChange={(e) => onChange('prayerPoints', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4 font-cairo">نقاط التعلم والخدمة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                نقاط إكمال الدروس
              </label>
              <input
                type="number"
                value={config.lessonPoints}
                onChange={(e) => onChange('lessonPoints', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                نقاط الخدمة المجتمعية
              </label>
              <input
                type="number"
                value={config.servicePoints}
                onChange={(e) => onChange('servicePoints', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
              />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-bold text-purple-900 mb-4 font-cairo">نقاط المكافآت</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                مكافأة الإنجازات
              </label>
              <input
                type="number"
                value={config.achievementBonus}
                onChange={(e) => onChange('achievementBonus', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                مكافأة الحضور المتتالي (يومياً)
              </label>
              <input
                type="number"
                value={config.streakBonus}
                onChange={(e) => onChange('streakBonus', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Points Preview */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-900 mb-4 font-cairo">معاينة نظام النقاط</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">⛪</div>
            <div className="text-lg font-bold text-amber-600">{config.liturgyPoints}</div>
            <div className="text-sm text-gray-600 font-cairo">قداس/صلاة كنسية</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">🙏</div>
            <div className="text-lg font-bold text-amber-600">{config.prayerPoints}</div>
            <div className="text-sm text-gray-600 font-cairo">صلاة شخصية</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-lg font-bold text-amber-600">{config.lessonPoints}</div>
            <div className="text-sm text-gray-600 font-cairo">درس مكتمل</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl mb-2">❤️</div>
            <div className="text-lg font-bold text-amber-600">{config.servicePoints}</div>
            <div className="text-sm text-gray-600 font-cairo">خدمة مجتمعية</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSystemSettings;