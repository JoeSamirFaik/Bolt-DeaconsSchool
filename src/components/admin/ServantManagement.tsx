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
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setEditingUser(null);
              setShowUserForm(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl transition-all duration-200 flex items-center space-x-3 space-x-reverse font-semibold text-lg shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-6 h-6" />
            <span>إضافة خادم</span>
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">إدارة الخدام</h1>
            <p className="text-gray-600 font-cairo text-lg">إدارة الخدام والمعلمين</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servants.map((servant) => (
            <div key={servant.id} className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="flex space-x-3 space-x-reverse">
                  <button
                    onClick={() => {
                      setEditingUser(servant);
                      setShowUserForm(true);
                    }}
                    className="p-3 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(servant.id)}
                    className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <UserIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              
              <div className="text-right mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                  {servant.firstName} {servant.lastName}
                </h3>
                <p className="text-gray-600 font-cairo text-lg mb-2">
                  {servant.email}
                </p>
                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-sm font-semibold rounded-full">
                  خادم
                </span>
              </div>
              
              <div className="space-y-4">
                {servant.servantInfo && (
                  <>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 font-cairo mb-2">التخصص</p>
                      <p className="font-semibold text-purple-800 font-cairo">
                        {servant.servantInfo.specialization}
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 font-cairo mb-2">رقم الهاتف</p>
                      <p className="font-semibold text-indigo-800 font-cairo">
                        {servant.servantInfo.phone}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 space-x-reverse ${
                    servant.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {servant.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
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