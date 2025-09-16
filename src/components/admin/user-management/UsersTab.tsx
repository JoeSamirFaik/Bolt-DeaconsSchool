import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  UserIcon,
  AcademicCapIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  BriefcaseIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { User } from '../../../types/user';
import { Level } from '../../../types/lms';

interface UsersTabProps {
  users: User[];
  levels: Level[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({ users, levels, onEdit, onDelete }) => {
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'deacon': return 'شماس';
      case 'servant': return 'خادم';
      case 'parent': return 'ولي أمر';
      case 'admin': return 'مدير';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'deacon': return <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
      case 'servant': return <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
      case 'parent': return <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case 'admin': return <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />;
      default: return <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'deacon': return 'from-blue-100 to-indigo-100';
      case 'servant': return 'from-green-100 to-emerald-100';
      case 'parent': return 'from-purple-100 to-indigo-100';
      case 'admin': return 'from-red-100 to-rose-100';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Mobile: Card View */}
      <div className="block sm:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => onEdit(user)}
                  className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="تعديل"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${getRoleColor(user.role)} rounded-xl flex items-center justify-center shadow-lg`}>
                {getRoleIcon(user.role)}
              </div>
            </div>
            
            {/* User Info */}
            <div className="text-right mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1 font-cairo">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600 font-cairo text-sm mb-2">
                {user.email}
              </p>
              <span className={`px-3 py-1 bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800 text-sm font-medium rounded-full`}>
                {getRoleLabel(user.role)}
              </span>
            </div>
            
            {/* Role-specific Info */}
            <div className="space-y-3">
              {user.role === 'deacon' && user.deaconInfo && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    <AcademicCapIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 font-cairo">المستوى الحالي</span>
                  </div>
                  <p className="text-blue-700 font-cairo text-sm">
                    {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                  </p>
                  {user.deaconInfo.enrollmentDate && (
                    <p className="text-xs text-blue-600 font-cairo mt-1">
                      مسجل منذ: {new Date(user.deaconInfo.enrollmentDate).toLocaleDateString('ar-EG')}
                    </p>
                  )}
                </div>
              )}
              
              {user.role === 'parent' && user.parentInfo && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <PhoneIcon className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-700 font-cairo">{user.parentInfo.phone}</span>
                    </div>
                    {user.parentInfo.occupation && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <BriefcaseIcon className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-700 font-cairo">{user.parentInfo.occupation}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <UsersIcon className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-700 font-cairo">
                        {user.parentInfo.children.length} طفل
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {user.role === 'servant' && user.servantInfo && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <AcademicCapIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-cairo">{user.servantInfo.specialization}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <PhoneIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-cairo">{user.servantInfo.phone}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Status */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                  user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                  <span>{user.isActive ? 'نشط' : 'غير نشط'}</span>
                </span>
                <span className="text-xs text-gray-500 font-cairo">
                  انضم: {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop: Grid View */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-start justify-between mb-6">
              <div className="flex space-x-3 space-x-reverse">
                <button
                  onClick={() => onEdit(user)}
                  className="p-3 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110"
                  title="تعديل"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                  title="حذف"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <div className={`w-16 h-16 bg-gradient-to-br ${getRoleColor(user.role)} rounded-2xl flex items-center justify-center shadow-lg`}>
                {getRoleIcon(user.role)}
              </div>
            </div>
            
            <div className="text-right mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600 font-cairo text-lg mb-3">
                {user.email}
              </p>
              <span className={`px-4 py-2 bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800 text-sm font-semibold rounded-full`}>
                {getRoleLabel(user.role)}
              </span>
            </div>
            
            <div className="space-y-4">
              {user.role === 'deacon' && user.deaconInfo && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-cairo mb-2">المستوى الحالي</p>
                  <p className="font-semibold text-blue-800 font-cairo">
                    {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                  </p>
                </div>
              )}
              
              {user.role === 'parent' && user.parentInfo && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 font-cairo mb-2">عدد الأطفال</p>
                  <p className="font-semibold text-purple-800 font-cairo">
                    {user.parentInfo.children.length} طفل
                  </p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 space-x-reverse ${
                  user.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                  <span>{user.isActive ? 'نشط' : 'غير نشط'}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد مستخدمون</h3>
          <p className="text-gray-500 font-cairo">لم يتم إضافة أي مستخدمين بعد</p>
        </div>
      )}
    </div>
  );
};

export default UsersTab;