import React, { useState } from 'react';
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
      setError('Registration failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 font-cairo">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">انضم إلينا</h2>
        <p className="text-gray-600">أنشئ حسابك في مدرسة الشمامسة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              الاسم الأول
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1 text-right">
              اسم العائلة
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-right">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1 text-right">
            الدور
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="deacon">شماس</option>
            <option value="servant">خادم</option>
            <option value="parent">ولي أمر</option>
          </select>
        </div>

        {formData.role === 'deacon' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                المرحلة
              </label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر المرحلة</option>
                <option value="ابتدائي">ابتدائي</option>
                <option value="إعدادي">إعدادي</option>
                <option value="ثانوي">ثانوي</option>
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                المستوى
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">اختر المستوى</option>
                <option value="1">المستوى 1</option>
                <option value="2">المستوى 2</option>
                <option value="3">المستوى 3</option>
                <option value="4">المستوى 4</option>
              </select>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            سجل دخولك هنا
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;