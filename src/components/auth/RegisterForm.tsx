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
      minHeight: '48px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Cairo, sans-serif',
      '&:hover': {
        borderColor: '#9ca3af'
      },
      '&:focus-within': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      color: '#9ca3af'
    })
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-2xl text-white">⛪</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-cairo">إنشاء حساب جديد</h2>
        <p className="text-gray-600 font-cairo">انضم إلى مجتمع مدرسة الشمامسة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الاسم الأول
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
              placeholder="الاسم الأول"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              اسم العائلة
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
              placeholder="اسم العائلة"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
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
              <div className="flex items-center space-x-2 space-x-reverse justify-end">
                <span>{option.label}</span>
                <span>{option.icon}</span>
              </div>
            )}
          />
        </div>

        {formData.role === 'deacon' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
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
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
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
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 text-right font-cairo">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium font-cairo"
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 font-cairo">
          لديك حساب بالفعل؟{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;