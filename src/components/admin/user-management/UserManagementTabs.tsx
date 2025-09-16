import React from 'react';
import { UsersIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface UserManagementTabsProps {
  activeTab: 'users' | 'assignments';
  onTabChange: (tab: 'users' | 'assignments') => void;
}

const UserManagementTabs: React.FC<UserManagementTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => onTabChange('users')}
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base ${
            activeTab === 'users'
              ? 'bg-white text-amber-600 shadow-lg scale-105'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>المستخدمون</span>
        </button>
        <button
          onClick={() => onTabChange('assignments')}
          className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base ${
            activeTab === 'assignments'
              ? 'bg-white text-amber-600 shadow-lg scale-105'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">تكليفات المستويات</span>
          <span className="sm:hidden">التكليفات</span>
        </button>
      </div>
    </div>
  );
};

export default UserManagementTabs;