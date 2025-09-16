import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Layout from './components/Layout';

const AuthWrapper: React.FC = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">⛪</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2 font-cairo">جاري تحميل مغامرتك...</h2>
            <p className="text-purple-100 font-cairo">نحضر كل شيء من أجلك! 🎉</p>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Layout />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/50">
          <div className="text-center mb-8 font-cairo">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <span className="text-3xl">⛪</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg">✨</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 font-cairo">
              مدرسة الشمامسة
            </h1>
            <p className="text-gray-600 font-medium font-cairo">مغامرة التعلم الرائعة تبدأ هنا! 🚀</p>
          </div>
          
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

export default App;