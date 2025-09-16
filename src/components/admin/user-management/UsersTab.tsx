import React from 'react';
import React, { useState } from 'react';
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
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (userId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

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
      <div className="block lg:hidden space-y-3">
        {users.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            {/* Compact Header - Always Visible */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleCardExpansion(user.id)}
            >
              <div className="flex items-center justify-between">
                {/* User Basic Info */}
                <div className="flex items-center space-x-3 space-x-reverse flex-1">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(user.role)} rounded-xl flex items-center justify-center shadow-sm`}>
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="text-right flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 font-cairo truncate">
                      {user.firstName} {user.lastName}
                    </h3>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(user);
                    }}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    title="تعديل"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(user.id);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Expandable Details */}
            {expandedCards.has(user.id) && (
              <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3 pt-3">
                  {/* Email */}
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-cairo mb-1">البريد الإلكتروني</p>
                    <p className="text-sm text-gray-900 font-cairo">{user.email}</p>
                  </div>
                  
                  {/* Role-specific Info */}
                  {user.role === 'deacon' && user.deaconInfo && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-blue-600 font-cairo mb-1">المستوى الحالي</p>
                          <p className="text-sm font-medium text-blue-800 font-cairo">
                            {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                          </p>
                        </div>
                        {user.deaconInfo.enrollmentDate && (
                          <div>
                            <p className="text-xs text-blue-600 font-cairo mb-1">تاريخ التسجيل</p>
                            <p className="text-sm text-blue-700 font-cairo">
                              {new Date(user.deaconInfo.enrollmentDate).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                        )}
                        {user.deaconInfo.notes && (
                          <div>
                            <p className="text-xs text-blue-600 font-cairo mb-1">ملاحظات</p>
                            <p className="text-sm text-blue-700 font-cairo">{user.deaconInfo.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {user.role === 'parent' && user.parentInfo && (
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-purple-600 font-cairo mb-1">رقم الهاتف</p>
                            <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600 font-cairo mb-1">عدد الأطفال</p>
                            <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.children.length} طفل</p>
                          </div>
                        </div>
                        {user.parentInfo.occupation && (
                          <div>
                            <p className="text-xs text-purple-600 font-cairo mb-1">المهنة</p>
                            <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.occupation}</p>
                          </div>
                        )}
                        {user.parentInfo.address && (
                          <div>
                            <p className="text-xs text-purple-600 font-cairo mb-1">العنوان</p>
                            <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.address}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {user.role === 'servant' && user.servantInfo && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-green-600 font-cairo mb-1">التخصص</p>
                            <p className="text-sm text-green-700 font-cairo">{user.servantInfo.specialization}</p>
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-cairo mb-1">رقم الهاتف</p>
                            <p className="text-sm text-green-700 font-cairo">{user.servantInfo.phone}</p>
                          </div>
                        </div>
                        {user.servantInfo.assignedLevels && user.servantInfo.assignedLevels.length > 0 && (
                          <div>
                            <p className="text-xs text-green-600 font-cairo mb-1">المستويات المُكلف بها</p>
                            <div className="flex flex-wrap gap-1">
                              {user.servantInfo.assignedLevels.map(levelId => (
                                <span key={levelId} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-cairo">
                                  {levels.find(l => l.id === levelId)?.name || levelId}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Join Date */}
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-cairo mb-1">تاريخ الانضمام</p>
                    <p className="text-sm text-gray-700 font-cairo">
                      {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Desktop: Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                الإجراءات
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                الحالة
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                معلومات إضافية
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                النوع
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                الاسم
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse ${
                    user.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                    <span>{user.isActive ? 'نشط' : 'غير نشط'}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.role === 'deacon' && user.deaconInfo && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                        <span className="font-cairo">
                          {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                        </span>
                      </div>
                    )}
                    {user.role === 'parent' && user.parentInfo && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <UsersIcon className="w-4 h-4 text-purple-500" />
                        <span className="font-cairo">{user.parentInfo.children.length} طفل</span>
                      </div>
                    )}
                    {user.role === 'servant' && user.servantInfo && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AcademicCapIcon className="w-4 h-4 text-green-500" />
                        <span className="font-cairo">{user.servantInfo.specialization}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-cairo">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800`}>
                    {getRoleIcon(user.role)}
                    <span>{getRoleLabel(user.role)}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(user.role)} rounded-full flex items-center justify-center`}>
                      <span className="text-sm font-bold text-gray-700">
                        {user.firstName.charAt(0)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 font-cairo">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 font-cairo">
                        انضم: {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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