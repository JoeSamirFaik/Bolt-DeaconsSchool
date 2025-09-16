import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User, CreateUserRequest } from '../../types/user';
import { usersApi } from '../../services/userApi';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '48px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f59e0b' 
      : state.isFocused 
        ? '#fef3c7' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  })
};

interface UserFormProps {
  user?: User | null;
  users: User[];
  allowedRoles?: ('deacon' | 'servant' | 'parent')[];
  onClose: () => void;
  onSave: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, users, allowedRoles = ['deacon', 'servant', 'parent'], onClose, onSave }) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'deacon'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parentUsers = users.filter(u => u.role === 'parent');

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        deaconInfo: user.deaconInfo,
        parentInfo: user.parentInfo,
        servantInfo: user.servantInfo
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (user) {
        // Update existing user
        await usersApi.update(user.id, formData);
      } else {
        // Create new user
        await usersApi.create(formData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof CreateUserRequest],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const allRoleOptions = [
    { value: 'deacon', label: 'شماس' },
    { value: 'servant', label: 'خادم' },
    { value: 'parent', label: 'ولي أمر' }
  ];

  const roleOptions = allRoleOptions.filter(option => 
    allowedRoles.includes(option.value as any)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">
                {user ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
              </h2>
              <p className="text-gray-600 font-cairo">
                {user ? 'قم بتعديل بيانات المستخدم' : 'أدخل بيانات المستخدم الجديد'}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  الاسم الأول *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  placeholder="الاسم الأول"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  اسم العائلة *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  placeholder="اسم العائلة"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  نوع المستخدم *
                </label>
                <Select
                  value={roleOptions.find(option => option.value === formData.role)}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setFormData({ ...formData, role: selectedOption.value as any });
                    }
                  }}
                  options={roleOptions}
                  styles={customSelectStyles}
                  placeholder="اختر نوع المستخدم"
                  isSearchable={false}
                />
              </div>
            </div>
          </div>

          {/* Role-specific fields */}
          {formData.role === 'deacon' && (
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">معلومات الشماس</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="deaconInfo.dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    تاريخ الميلاد *
                  </label>
                  <input
                    type="date"
                    id="deaconInfo.dateOfBirth"
                    name="deaconInfo.dateOfBirth"
                    value={formData.deaconInfo?.dateOfBirth || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    ولي الأمر
                  </label>
                  <Select
                    value={formData.deaconInfo?.parentId ? 
                      { value: formData.deaconInfo.parentId, label: parentUsers.find(p => p.id === formData.deaconInfo?.parentId)?.firstName + ' ' + parentUsers.find(p => p.id === formData.deaconInfo?.parentId)?.lastName } : 
                      null
                    }
                    onChange={(selectedOption) => {
                      setFormData(prev => ({
                        ...prev,
                        deaconInfo: {
                          ...prev.deaconInfo!,
                          parentId: selectedOption ? selectedOption.value : undefined
                        }
                      }));
                    }}
                    options={parentUsers.map(parent => ({ 
                      value: parent.id, 
                      label: `${parent.firstName} ${parent.lastName}` 
                    }))}
                    styles={customSelectStyles}
                    placeholder="اختر ولي الأمر"
                    isSearchable={true}
                    isClearable
                  />
                </div>

                <div>
                  <label htmlFor="deaconInfo.enrollmentDate" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    تاريخ التسجيل *
                  </label>
                  <input
                    type="date"
                    id="deaconInfo.enrollmentDate"
                    name="deaconInfo.enrollmentDate"
                    value={formData.deaconInfo?.enrollmentDate || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>

                <div>
                  <label htmlFor="deaconInfo.notes" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    ملاحظات
                  </label>
                  <textarea
                    id="deaconInfo.notes"
                    name="deaconInfo.notes"
                    value={formData.deaconInfo?.notes || ''}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo resize-none"
                    placeholder="ملاحظات إضافية..."
                  />
                </div>
              </div>
            </div>
          )}

          {formData.role === 'parent' && (
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">معلومات ولي الأمر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="parentInfo.phone" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    id="parentInfo.phone"
                    name="parentInfo.phone"
                    value={formData.parentInfo?.phone || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                    placeholder="01234567890"
                  />
                </div>

                <div>
                  <label htmlFor="parentInfo.occupation" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    المهنة
                  </label>
                  <input
                    type="text"
                    id="parentInfo.occupation"
                    name="parentInfo.occupation"
                    value={formData.parentInfo?.occupation || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                    placeholder="المهنة"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="parentInfo.address" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    العنوان *
                  </label>
                  <textarea
                    id="parentInfo.address"
                    name="parentInfo.address"
                    value={formData.parentInfo?.address || ''}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo resize-none"
                    placeholder="العنوان الكامل..."
                  />
                </div>
              </div>
            </div>
          )}

          {formData.role === 'servant' && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-4 text-right font-cairo">معلومات الخادم</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="servantInfo.specialization" className="block text-sm font-medium text-orange-700 mb-2 text-right font-cairo">
                    التخصص *
                  </label>
                  <input
                    type="text"
                    id="servantInfo.specialization"
                    name="servantInfo.specialization"
                    value={formData.servantInfo?.specialization || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right font-cairo bg-white"
                    placeholder="مثال: تاريخ الكنيسة"
                  />
                </div>

                <div>
                  <label htmlFor="servantInfo.phone" className="block text-sm font-medium text-orange-700 mb-2 text-right font-cairo">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    id="servantInfo.phone"
                    name="servantInfo.phone"
                    value={formData.servantInfo?.phone || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-right font-cairo bg-white"
                    placeholder="01234567890"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                user ? 'تحديث المستخدم' : 'إضافة المستخدم'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;