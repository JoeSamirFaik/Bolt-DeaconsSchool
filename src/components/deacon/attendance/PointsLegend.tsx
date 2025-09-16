import React from 'react';

const PointsLegend: React.FC = () => {
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo">دليل الألوان والنقاط</h3>
      
      {/* Activity Types Legend */}
      <div className="mb-6">
        <h4 className="text-md font-bold text-gray-700 mb-3 text-right font-cairo">أنواع الأنشطة</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm text-gray-700 font-cairo">{item.type}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className={`w-4 h-4 ${item.color} rounded shadow-sm`}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Points System Explanation */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
        <h4 className="text-md font-bold text-amber-900 mb-3 text-right font-cairo">نظام النقاط 🏆</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {pointsSystem.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 space-x-reverse">
              <span className={`px-2 py-1 rounded-full font-medium ${item.color}`}>{item.points}</span>
              <span className="text-amber-800 font-cairo">{item.activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsLegend;