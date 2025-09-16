import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  const demoCredentials = [
    { role: 'شماس', email: 'deacon@example.com', icon: '🎓', color: 'from-blue-400 via-indigo-500 to-purple-500' },
    { role: 'خادم', email: 'servant@example.com', icon: '👨‍🏫', color: 'from-green-400 via-emerald-500 to-teal-500' },
    { role: 'ولي أمر', email: 'parent@example.com', icon: '👨‍👩‍👧', color: 'from-purple-400 via-pink-500 to-rose-500' },
    { role: 'مدير', email: 'admin@example.com', icon: '👑', color: 'from-amber-400 via-orange-500 to-red-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="w-20 h-20 rounded-2xl object-cover"
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-cairo">
          تسجيل الدخول
        </h2>
        <p className="text-gray-600 font-cairo text-xl">مرحباً بعودتك إلى مدرسة الشمامسة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo text-lg bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo text-lg bg-gray-50 hover:bg-white transition-all duration-200 pl-16 shadow-sm"
                placeholder="أدخل كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 px-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-6 text-sm text-red-600 bg-red-50 rounded-2xl border border-red-200 text-right font-cairo shadow-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-4 px-6 rounded-2xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold font-cairo text-lg shadow-lg hover:scale-105"
        >
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-8 font-cairo">
          جديد هنا؟{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            إنشاء حساب جديد
          </button>
        </p>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-8 text-center font-cairo">حسابات تجريبية:</h3>
        <div className="grid grid-cols-2 gap-6">
          {demoCredentials.map((cred) => (
            <button
              key={cred.role}
              onClick={() => {
                setEmail(cred.email);
                setPassword('password');
              }}
              className={`p-6 rounded-3xl border-2 border-gray-200 hover:border-gray-300 bg-gradient-to-br ${cred.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 hover:scale-105 shadow-lg`}
            >
              <div className="flex items-center space-x-3 space-x-reverse justify-center mb-4">
                <span className="font-semibold text-gray-800 font-cairo text-xl">{cred.role}</span>
                <span className="text-3xl">{cred.icon}</span>
              </div>
              <div className="text-xs text-gray-600 font-cairo">
                <div className="truncate mb-2 bg-white bg-opacity-50 px-3 py-1 rounded-full">{cred.email}</div>
                <div className="text-gray-500 bg-white bg-opacity-30 px-3 py-1 rounded-full">password</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;