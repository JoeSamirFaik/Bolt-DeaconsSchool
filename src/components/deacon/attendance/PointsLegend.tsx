import React from 'react';

interface PointsLegendProps {
  isMobile?: boolean;
}

const PointsLegend: React.FC<PointsLegendProps> = ({ isMobile = false }) => {
  const legendItems = [
    {
      type: 'دروس',
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      type: 'فعاليات',
      icon: '🎉',
      color: 'bg-green-500'
    },
    {
      type: 'رحلات',
      icon: '🚌',
      color: 'bg-purple-500'
    },
    {
      type: 'اجتماعات',
      icon: '👥',
      color: 'bg-orange-500'
    },
    {
      type: 'قداسات',
      icon: '⛪',
      color: 'bg-amber-500'
    },
    {
      type: 'صلوات',
      icon: '🙏',
      color: 'bg-indigo-500'
    }
  ];

  const pointsSystem = [
    {
      activity: '⛪ حضور قداس',
      points: '+50 نقطة',
      color: 'bg-green-100 text-green-800'
    },
    {
      activity: '🙏 صلاة شخصية',
      points: '+25 نقطة',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      activity: '📚 حضور جلسة',
      points: '+30 نقطة',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6 text-right font-cairo">
        <span className="hidden sm:inline">دليل الألوان والنقاط</span>
        <span className="sm:hidden">دليل النقاط</span>
      </h3>
      
      {/* Activity Types Legend */}
      <div className="mb-3 sm:mb-6">
        <h4 className="text-sm sm:text-md font-bold text-gray-700 mb-2 sm:mb-3 text-right font-cairo">أنواع الأنشطة</h4>
        <div className={`grid gap-2 sm:gap-4 ${
          isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
        }`}>
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
              <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
                <span className="text-xs sm:text-sm text-gray-700 font-cairo">{item.type}</span>
                <span className="text-sm sm:text-lg">{item.icon}</span>
              </div>
              <div className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} rounded shadow-sm`}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Points System Explanation */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-yellow-200">
        <h4 className="text-sm sm:text-md font-bold text-amber-900 mb-2 sm:mb-3 text-right font-cairo">
          <span className="hidden sm:inline">نظام النقاط 🏆</span>
          <span className="sm:hidden">النقاط 🏆</span>
        </h4>
        <div className={`grid gap-2 sm:gap-4 text-xs sm:text-sm ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        }`}>
          {pointsSystem.map((item, index) => (
            <div key={index} className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
              <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium ${item.color}`}>{item.points}</span>
              <span className="text-amber-800 font-cairo">{item.activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsLegend;