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
      { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
      { id: 'calendar', icon: CalendarIcon, label: 'التقويم' },
      { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
      { id: 'library', icon: BuildingLibraryIcon, label: 'المكتبة' },
    ];

    switch (user?.role) {
      case 'deacon':
        return [
          ...common,
          { id: 'lessons', icon: BookOpenIcon, label: 'الدروس' },
          { id: 'quizzes', icon: ClipboardDocumentCheckIcon, label: 'الاختبارات' },
          { id: 'progress', icon: ChartBarIcon, label: 'التقدم' },
          { id: 'certificates', icon: AcademicCapIcon, label: 'الشهادات' },
          { id: 'achievements', icon: TrophyIcon, label: 'الإنجازات' },
        ];
      case 'servant':
        return [
          ...common,
          { id: 'attendance', icon: ClipboardDocumentCheckIcon, label: 'الحضور' },
          { id: 'deacons', icon: UsersIcon, label: 'الشمامسة' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات' },
          { id: 'reports', icon: ChartBarIcon, label: 'التقارير' },
        ];
      case 'parent':
        return [
          ...common,
          { id: 'child-progress', icon: ChartBarIcon, label: 'تقدم الطفل' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات' },
          { id: 'reports', icon: ClipboardDocumentCheckIcon, label: 'التقارير' },
        ];
      case 'admin':
        return [
          ...common,
          { id: 'users', icon: UsersIcon, label: 'المستخدمون' },
          { id: 'lessons-mgmt', icon: BookOpenIcon, label: 'إدارة المحتوى' },
          { id: 'quizzes-mgmt', icon: ClipboardDocumentCheckIcon, label: 'إدارة الاختبارات' },
          { id: 'reports', icon: ChartBarIcon, label: 'التحليلات' },
          { id: 'settings', icon: Cog6ToothIcon, label: 'الإعدادات' },
        ];
      default:
        return common;
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

        {/* Pages Section */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider font-cairo mb-3">
            الصفحات
          </h3>
          <nav className="space-y-2">
            <button className="w-full group flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-200 hover:scale-105">
              <span className="font-cairo">قائمة الصفحات</span>
            </button>
            <button className="w-full group flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-200 hover:scale-105">
              <span className="font-cairo">صفحات الشبكة</span>
            </button>
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg font-cairo">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-sm font-medium text-white truncate font-cairo">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate font-cairo">
              {user?.role === 'deacon' ? 'شماس' : 
               user?.role === 'servant' ? 'خادم' : 
               user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-xl transition-all duration-200 group hover:scale-105"
        >
          <ArrowLeftOnRectangleIcon className="ml-3 h-4 w-4" />
          <span className="font-cairo">تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;