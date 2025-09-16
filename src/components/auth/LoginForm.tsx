import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { EyeIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline';

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
    { role: 'شماس', email: 'deacon1@deacons.com', emoji: '🎓', color: 'from-blue-400 to-purple-500' },
    { role: 'خادم', email: 'servant@deacons.com', emoji: '👨‍🏫', color: 'from-green-400 to-teal-500' },
    { role: 'ولي أمر', email: 'parent@deacons.com', emoji: '👨‍👩‍👧', color: 'from-pink-400 to-rose-500' },
    { role: 'مدير', email: 'admin@deacons.com', emoji: '⚡', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="text-3xl">⛪</span>
            </div>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <SparklesIcon className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          أهلاً بعودتك! 🎉
        </h2>
        <p className="text-gray-600">مستعد لمتابعة رحلتك الرائعة؟</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              📧 البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 text-lg text-right font-cairo"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              🔐 كلمة المرور
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 text-lg pl-12 text-right font-cairo"
                placeholder="أدخل كلمة المرور السرية"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 px-4 flex items-center text-purple-500 hover:text-purple-700 transition-colors"
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
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-2xl border-2 border-red-200 flex items-center space-x-2 space-x-reverse text-right">
            <span>❌</span>
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري تسجيل الدخول...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <span>🚀 هيا بنا!</span>
            </div>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          جديد هنا؟{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-bold text-purple-600 hover:text-purple-500 transition-colors"
          >
            انضم للمتعة! 🎊
          </button>
        </p>
      </div>

      <div className="border-t-2 border-gray-100 pt-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4 text-center">🎮 جرب الحسابات التجريبية:</h3>
        <div className="grid grid-cols-2 gap-3">
          {demoCredentials.map((cred) => (
            <button
              key={cred.role}
              onClick={() => {
                setEmail(cred.email);
                setPassword('password');
              }}
              className={`relative overflow-hidden text-right p-4 rounded-2xl border-2 border-gray-200 hover:border-transparent transition-all duration-300 transform hover:scale-105 group bg-gradient-to-r ${cred.color} hover:shadow-lg`}
            >
              <div className="absolute inset-0 bg-white opacity-90 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 space-x-reverse mb-2 justify-end">
                  <span className="font-bold text-gray-800">{cred.role}</span>
                  <span className="text-lg">{cred.emoji}</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="truncate">{cred.email}</div>
                  <div className="text-gray-500">🔑 password</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;