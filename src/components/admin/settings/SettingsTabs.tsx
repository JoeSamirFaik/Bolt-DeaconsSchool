import React from 'react';
import { 
  TrophyIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  BellIcon, 
  ServerIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'points', label: 'نظام النقاط', shortLabel: 'النقاط', icon: TrophyIcon, color: 'from-amber-500 to-orange-500' },
    { id: 'academic', label: 'الإعدادات الأكاديمية', shortLabel: 'أكاديمي', icon: AcademicCapIcon, color: 'from-blue-500 to-indigo-500' },
    { id: 'attendance', label: 'إعدادات الحضور', shortLabel: 'الحضور', icon: ClockIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'notifications', label: 'الإشعارات', icon: BellIcon, color: 'from-purple-500 to-indigo-500' },
    { id: 'system', label: 'إعدادات النظام', shortLabel: 'النظام', icon: ServerIcon, color: 'from-red-500 to-rose-500' },
    { id: 'backup', label: 'النسخ الاحتياطي', shortLabel: 'النسخ', icon: ShieldCheckIcon, color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`p-3 sm:p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                activeTab === tab.id
                  ? `bg-gradient-to-br ${tab.color} text-white shadow-lg scale-105`
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="text-center">
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium font-cairo">
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel || tab.label}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsTabs;