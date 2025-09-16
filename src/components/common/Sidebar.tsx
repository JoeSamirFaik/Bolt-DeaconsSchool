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
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  AcademicCapIcon,
  StarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const common = [
      { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية', color: 'text-blue-600' },
      { id: 'calendar', icon: CalendarIcon, label: 'التقويم', color: 'text-purple-600' },
      { id: 'notifications', icon: BellIcon, label: 'الإشعارات', color: 'text-yellow-600' },
      { id: 'library', icon: BuildingLibraryIcon, label: 'المكتبة', color: 'text-green-600' },
    ];

    switch (user?.role) {
      case 'deacon':
        return [
          ...common,
          { id: 'lessons', icon: BookOpenIcon, label: 'الدروس', color: 'text-indigo-600' },
          { id: 'quizzes', icon: ClipboardDocumentCheckIcon, label: 'الاختبارات', color: 'text-red-600' },
          { id: 'progress', icon: ChartBarIcon, label: 'التقدم', color: 'text-teal-600' },
          { id: 'certificates', icon: AcademicCapIcon, label: 'الشهادات', color: 'text-amber-600' },
          { id: 'achievements', icon: TrophyIcon, label: 'الإنجازات', color: 'text-orange-600' },
        ];
      case 'servant':
        return [
          ...common,
          { id: 'attendance', icon: ClipboardDocumentCheckIcon, label: 'الحضور', color: 'text-blue-600' },
          { id: 'deacons', icon: UsersIcon, label: 'الشمامسة', color: 'text-gray-600' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات', color: 'text-teal-600' },
          { id: 'reports', icon: ChartBarIcon, label: 'التقارير', color: 'text-indigo-600' },
        ];
      case 'parent':
        return [
          ...common,
          { id: 'child-progress', icon: ChartBarIcon, label: 'تقدم الطفل', color: 'text-blue-600' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات', color: 'text-gray-600' },
          { id: 'reports', icon: ClipboardDocumentCheckIcon, label: 'التقارير', color: 'text-indigo-600' },
        ];
      case 'admin':
        return [
          ...common,
          { id: 'users', icon: UsersIcon, label: 'المستخدمون', color: 'text-gray-600' },
          { id: 'lessons-mgmt', icon: BookOpenIcon, label: 'إدارة المحتوى', color: 'text-blue-600' },
          { id: 'quizzes-mgmt', icon: ClipboardDocumentCheckIcon, label: 'إدارة الاختبارات', color: 'text-teal-600' },
          { id: 'reports', icon: ChartBarIcon, label: 'التحليلات', color: 'text-indigo-600' },
          { id: 'settings', icon: Cog6ToothIcon, label: 'الإعدادات', color: 'text-gray-600' },
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm">
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">⛪</span>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-gray-900 font-cairo">مدرسة الشمامسة</h1>
            <p className="text-sm text-gray-500 font-cairo">
              {user?.role === 'deacon' ? 'شماس' : 
               user?.role === 'servant' ? 'خادم' : 
               user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-6 py-8">
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
                    ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`ml-3 h-5 w-5 ${isActive ? 'text-blue-600' : item.color}`} />
                <span className="font-cairo">{item.label}</span>
                {isActive && (
                  <div className="mr-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center space-x-3 space-x-reverse mb-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm font-cairo">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-sm font-medium text-gray-900 truncate font-cairo">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
        >
          <ArrowLeftOnRectangleIcon className="ml-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
          <span className="font-cairo">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;