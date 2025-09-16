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
    { role: 'شماس', email: 'deacon@example.com', icon: '🎓', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
    { role: 'خادم', email: 'servant@example.com', icon: '👨‍🏫', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
    { role: 'ولي أمر', email: 'parent@example.com', icon: '👨‍👩‍👧', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
    { role: 'مدير', email: 'admin@example.com', icon: '⚡', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-2xl text-white">⛪</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-cairo">
          تسجيل الدخول
        </h2>
        <p className="text-gray-600 font-cairo">مرحباً بعودتك إلى مدرسة الشمامسة</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo pl-12"
                placeholder="أدخل كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 px-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

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
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4 font-cairo">
          جديد هنا؟{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            إنشاء حساب جديد
          </button>
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4 text-center font-cairo">حسابات تجريبية:</h3>
        <div className="grid grid-cols-2 gap-3">
          {demoCredentials.map((cred) => (
            <button
              key={cred.role}
              onClick={() => {
                setEmail(cred.email);
                setPassword('password');
              }}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${cred.color}`}
            >
              <div className="flex items-center space-x-2 space-x-reverse justify-center mb-2">
                <span className="font-medium text-gray-800 font-cairo">{cred.role}</span>
                <span className="text-lg">{cred.icon}</span>
              </div>
              <div className="text-xs text-gray-600 font-cairo">
                <div className="truncate">{cred.email}</div>
                <div className="text-gray-500">password</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;