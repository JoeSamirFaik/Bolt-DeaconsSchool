import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UserIcon,
  EyeIcon,
  EyeSlashIcon
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
          <button
            onClick={() => {
              setEditingUser(null);
              setShowUserForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 space-x-reverse font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            <span>إضافة خادم</span>
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة الخدام</h1>
            <p className="text-gray-600 font-cairo">إدارة الخدام والمعلمين</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servants.map((servant) => (
            <div key={servant.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => {
                      setEditingUser(servant);
                      setShowUserForm(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(servant.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              
              <div className="text-right mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                  {servant.firstName} {servant.lastName}
                </h3>
                <p className="text-gray-600 font-cairo text-sm mb-2">
                  {servant.email}
                </p>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  خادم
                </span>
              </div>
              
              <div className="space-y-3">
                {servant.servantInfo && (
                  <>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 font-cairo mb-2">التخصص</p>
                      <p className="font-medium text-purple-800 font-cairo">
                        {servant.servantInfo.specialization}
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 font-cairo mb-2">رقم الهاتف</p>
                      <p className="font-medium text-indigo-800 font-cairo">
                        {servant.servantInfo.phone}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                    servant.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {servant.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                    <span>{servant.isActive ? 'نشط' : 'غير نشط'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
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