import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface UserManagementHeaderProps {
  activeTab: 'users' | 'assignments';
  onAddNew: () => void;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({ activeTab, onAddNew }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        {/* Title & Description */}
        <div className="text-right order-2 sm:order-1">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">إدارة المستخدمين</h1>
          <p className="text-gray-600 font-cairo text-sm sm:text-base hidden sm:block">
            إدارة الشمامسة وأولياء الأمور والخدام
          </p>
        </div>
        
        {/* Action Button */}
        <button
          onClick={onAddNew}
          className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base order-1 sm:order-2"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>
            {activeTab === 'users' ? 'إضافة مستخدم' : 'تكليف مستوى'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default UserManagementHeader;