import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  BellIcon,
  ChartBarIcon,
  UsersIcon,
  UserIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const common: any[] = [];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'deacon':
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
          ...common,
          { id: 'lessons', icon: BookOpenIcon, label: 'الدروس' },
          { id: 'calendar', icon: CalendarIcon, label: 'التقويم' },
          { id: 'attendance-board', icon: ClipboardDocumentCheckIcon, label: 'سجل الحضور' },
          { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
        ];
      case 'servant':
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
          ...common,
          { id: 'deacon-parent-mgmt', icon: UsersIcon, label: 'الشمامسة وأولياء الأمور' },
          { id: 'attendance', icon: ClipboardDocumentCheckIcon, label: 'الحضور' },
          { id: 'reports', icon: ChartBarIcon, label: 'التقارير' },
          { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
        ];
      case 'parent':
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
          ...common,
          { id: 'child-progress', icon: ChartBarIcon, label: 'تقدم الطفل' },
          { id: 'reports', icon: ClipboardDocumentCheckIcon, label: 'التقارير' },
          { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
        ];
      case 'admin':
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
          ...common,
          { id: 'deacon-parent-mgmt', icon: UsersIcon, label: 'الشمامسة وأولياء الأمور' },
          { id: 'servant-mgmt', icon: UserIcon, label: 'إدارة الخدام' },
          { id: 'lessons-mgmt', icon: BookOpenIcon, label: 'إدارة المحتوى' },
          { id: 'attendance', icon: ClipboardDocumentCheckIcon, label: 'إدارة الحضور' },
          { id: 'reports', icon: ChartBarIcon, label: 'التحليلات' },
          { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
          { id: 'settings', icon: Cog6ToothIcon, label: 'الإعدادات' },
        ];
      default:
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3 space-x-reverse">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-lg"
          />
          <div className="text-right">
            <h1 className="text-lg font-bold font-cairo text-white">مدرسة الشمامسة</h1>
            <p className="text-xs text-gray-400 font-cairo">القديس أثناسيوس</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-105'
                }`}
              >
                <Icon className="ml-3 h-5 w-5" />
                <span className="font-cairo">{item.label}</span>
                {isActive && (
                  <div className="mr-auto w-2 h-2 bg-white rounded-full shadow-lg"></div>
                )}
              </button>
            );
          })}
        </nav>

      </div>

    </div>
  );
};

export default Sidebar;