import React, { useState } from 'react';
import Select from 'react-select';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'deacon' as User['role'],
    stage: '',
    level: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
    } catch (err) {
      setError('فشل في إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const roleOptions = [
    { value: 'deacon', label: 'شماس', icon: '🎓' },
    { value: 'servant', label: 'خادم', icon: '👨‍🏫' },
    { value: 'parent', label: 'ولي أمر', icon: '👨‍👩‍👧' },
  ];

  const stageOptions = [
    { value: 'ابتدائي', label: 'ابتدائي' },
    { value: 'إعدادي', label: 'إعدادي' },
    { value: 'ثانوي', label: 'ثانوي' },
  ];

  const levelOptions = [
    { value: '1', label: 'المستوى 1' },
    { value: '2', label: 'المستوى 2' },
    { value: '3', label: 'المستوى 3' },
    { value: '4', label: 'المستوى 4' },
  ];

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '60px',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      fontSize: '18px',
      fontFamily: 'Cairo, sans-serif',
      backgroundColor: '#f9fafb',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      '&:hover': {
        borderColor: '#d1d5db',
        backgroundColor: 'white'
      },
      '&:focus-within': {
        borderColor: '#f59e0b',
        boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.1)',
        backgroundColor: 'white'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      fontSize: '16px',
      padding: '12px 16px',
      backgroundColor: state.isSelected ? '#f59e0b' : state.isFocused ? '#fef3c7' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      fontSize: '18px'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      color: '#9ca3af',
      fontSize: '18px'
    })
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <span className="text-4xl text-white">⛪</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-cairo">إنشاء حساب جديد</h2>
        <p className="text-gray-600 font-cairo text-xl">انضم إلى مجتمع مدرسة الشمامسة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
              الاسم الأول
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo text-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm"
              placeholder="الاسم الأول"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
              اسم العائلة
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo text-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm"
              placeholder="اسم العائلة"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo text-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
            الدور
          </label>
          <Select
            value={roleOptions.find(option => option.value === formData.role)}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setFormData({ ...formData, role: selectedOption.value as User['role'] });
              }
            }}
            options={roleOptions}
            styles={customSelectStyles}
            placeholder="اختر الدور"
            isSearchable={false}
            formatOptionLabel={(option) => (
              <div className="flex items-center space-x-3 space-x-reverse justify-end">
                <span>{option.label}</span>
                <span className="text-2xl">{option.icon}</span>
              </div>
            )}
          />
        </div>

        {formData.role === 'deacon' && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
                المرحلة
              </label>
              <Select
                value={stageOptions.find(option => option.value === formData.stage)}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setFormData({ ...formData, stage: selectedOption.value });
                  }
                }}
                options={stageOptions}
                styles={customSelectStyles}
                placeholder="اختر المرحلة"
                isSearchable={false}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
                المستوى
              </label>
              <Select
                value={levelOptions.find(option => option.value === formData.level)}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setFormData({ ...formData, level: selectedOption.value });
                  }
                }}
                options={levelOptions}
                styles={customSelectStyles}
                placeholder="اختر المستوى"
                isSearchable={false}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 text-sm text-red-600 bg-red-50 rounded-2xl border border-red-200 text-right font-cairo shadow-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold font-cairo text-lg shadow-lg hover:scale-105"
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 font-cairo">
          لديك حساب بالفعل؟{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;