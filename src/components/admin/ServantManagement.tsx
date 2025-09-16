import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types/user';
import { usersApi } from '../../services/userApi';
import UserForm from './UserForm';

const ServantManagement: React.FC = () => {
  const [servants, setServants] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadServants();
  }, []);

  const loadServants = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getByRole('servant');
      setServants(data);
    } catch (error) {
      console.error('Error loading servants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخادم؟')) {
      try {
        await usersApi.delete(id);
        loadServants();
      } catch (error) {
        console.error('Error deleting servant:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Title & Description */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة الخدام</h1>
            <p className="text-gray-600 font-cairo">إدارة الخدام والمعلمين في المدرسة</p>
          </div>
          
          {/* Right side - Action Button */}
          <button
            onClick={() => {
              setEditingUser(null);
              setShowUserForm(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>إضافة خادم جديد</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
                  رقم الهاتف
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  التخصص
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  الاسم
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servants.map((servant, index) => (
                <tr key={servant.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingUser(servant);
                          setShowUserForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="تعديل"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(servant.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse ${
                      servant.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {servant.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                      <span>{servant.isActive ? 'نشط' : 'غير نشط'}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-900">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="font-cairo">{servant.servantInfo?.phone || '-'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <AcademicCapIcon className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900 font-cairo">
                        {servant.servantInfo?.specialization || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-cairo">{servant.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 font-cairo">
                          {servant.firstName} {servant.lastName}
                        </div>
                        <div className="text-xs text-gray-500 font-cairo">خادم</div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {servants.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد خدام</h3>
              <p className="text-gray-500 font-cairo">لم يتم إضافة أي خدام بعد</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          users={[]}
          allowedRoles={['servant']}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
          onSave={() => {
            setShowUserForm(false);
            setEditingUser(null);
            loadServants();
          }}
        />
      )}
    </div>
  );
};

export default ServantManagement;