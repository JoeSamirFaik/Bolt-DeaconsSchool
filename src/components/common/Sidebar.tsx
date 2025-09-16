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
      { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية', emoji: '🏠', color: 'from-purple-400 to-pink-400' },
      { id: 'calendar', icon: CalendarIcon, label: 'التقويم', emoji: '📅', color: 'from-blue-400 to-cyan-400' },
      { id: 'notifications', icon: BellIcon, label: 'الرسائل', emoji: '💌', color: 'from-yellow-400 to-orange-400' },
      { id: 'library', icon: BuildingLibraryIcon, label: 'المكتبة', emoji: '📚', color: 'from-green-400 to-emerald-400' },
    ];

    switch (user?.role) {
      case 'deacon':
        return [
          ...common,
          { id: 'lessons', icon: BookOpenIcon, label: 'الدروس', emoji: '📖', color: 'from-indigo-400 to-purple-400' },
          { id: 'quizzes', icon: ClipboardDocumentCheckIcon, label: 'الاختبارات', emoji: '🎯', color: 'from-red-400 to-pink-400' },
          { id: 'progress', icon: ChartBarIcon, label: 'التقدم', emoji: '📊', color: 'from-teal-400 to-blue-400' },
          { id: 'certificates', icon: AcademicCapIcon, label: 'الشهادات', emoji: '🏆', color: 'from-yellow-400 to-amber-400' },
          { id: 'achievements', icon: TrophyIcon, label: 'الإنجازات', emoji: '⭐', color: 'from-orange-400 to-red-400' },
        ];
      case 'servant':
        return [
          ...common,
          { id: 'attendance', icon: ClipboardDocumentCheckIcon, label: 'الحضور', emoji: '✅', color: 'from-blue-600 to-indigo-600' },
          { id: 'deacons', icon: UsersIcon, label: 'الشمامسة', emoji: '👥', color: 'from-slate-600 to-gray-600' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات', emoji: '💬', color: 'from-teal-600 to-cyan-600' },
          { id: 'reports', icon: ChartBarIcon, label: 'التقارير', emoji: '📈', color: 'from-indigo-600 to-purple-600' },
        ];
      case 'parent':
        return [
          ...common,
          { id: 'child-progress', icon: ChartBarIcon, label: 'تقدم الطفل', emoji: '🌟', color: 'from-blue-600 to-teal-600' },
          { id: 'messages', icon: ChatBubbleLeftRightIcon, label: 'المحادثات', emoji: '💬', color: 'from-slate-600 to-gray-600' },
          { id: 'reports', icon: ClipboardDocumentCheckIcon, label: 'التقارير', emoji: '📋', color: 'from-indigo-600 to-blue-600' },
        ];
      case 'admin':
        return [
          ...common,
          { id: 'users', icon: UsersIcon, label: 'المستخدمون', emoji: '👨‍👩‍👧‍👦', color: 'from-slate-600 to-gray-600' },
          { id: 'lessons-mgmt', icon: BookOpenIcon, label: 'إدارة الدروس', emoji: '📚', color: 'from-blue-600 to-indigo-600' },
          { id: 'quizzes-mgmt', icon: ClipboardDocumentCheckIcon, label: 'إدارة الاختبارات', emoji: '🎮', color: 'from-teal-600 to-cyan-600' },
          { id: 'reports', icon: ChartBarIcon, label: 'التحليلات', emoji: '📊', color: 'from-indigo-600 to-purple-600' },
          { id: 'settings', icon: Cog6ToothIcon, label: 'الإعدادات', emoji: '⚙️', color: 'from-gray-600 to-slate-600' },
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems();
  const isDeacon = user?.role === 'deacon';
  const isProfessionalRole = ['servant', 'parent', 'admin'].includes(user?.role || '');

  return (
    <div className={`h-full flex flex-col relative overflow-hidden ${
      isDeacon 
        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900' 
        : 'bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900'
    }`}>
      {/* Animated background elements - only for deacons */}
      {isDeacon && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 -left-8 w-32 h-32 bg-pink-400 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-1/4 -right-6 w-20 h-20 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
        </div>
      )}

      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${
            isDeacon 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 transform rotate-12 hover:rotate-0' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}>
            <span className="text-2xl">⛪</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">مدرسة الشمامسة</h1>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-purple-200">
                {user?.role === 'deacon' ? 'شماس' : 
                 user?.role === 'servant' ? 'خادم' : 
                 user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
              </span>
              {user?.role === 'deacon' && (
                <div className="flex items-center space-x-1 space-x-reverse">
                  <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-yellow-400">المستوى {user?.level}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 relative z-10">
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isDeacon ? 'transform hover:scale-105' : 'hover:scale-102'
                } ${
                  isActive
                    ? 'bg-white/20 shadow-lg scale-105'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className="relative flex items-center px-4 py-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ml-3 shadow-lg ${
                    isProfessionalRole 
                      ? `bg-gradient-to-r ${item.color.replace('400', '600').replace('500', '700')}` 
                      : `bg-gradient-to-r ${item.color}`
                  }`}>
                    <span className={isDeacon ? "text-lg" : "text-base"}>{item.emoji}</span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className={`font-medium font-cairo transition-colors ${
                      isActive ? 'text-white' : 'text-purple-100 group-hover:text-white'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      isDeacon ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 relative z-10">
        <div className={`flex items-center space-x-3 space-x-reverse mb-4 p-3 rounded-2xl backdrop-blur-sm ${
          isDeacon ? 'bg-white/10' : 'bg-white/5'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
            isDeacon 
              ? 'bg-gradient-to-r from-pink-400 to-purple-500' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}>
            <span className="text-lg font-bold text-white font-cairo">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-sm font-medium text-white truncate font-cairo">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-purple-200 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 text-sm font-medium text-purple-200 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 group"
        >
          <div className="flex-1 text-right">تسجيل الخروج</div>
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center ml-3 group-hover:bg-red-500/30 transition-colors">
            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;