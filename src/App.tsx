import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Layout from './components/Layout';
import PWAInstallPrompt from './components/common/PWAInstallPrompt';

const AuthWrapper: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Handle PWA shortcuts
    const urlParams = new URLSearchParams(window.location.search);
    const shortcut = urlParams.get('shortcut');
    
    if (shortcut && user) {
      // Handle shortcut navigation
      switch (shortcut) {
        case 'lessons':
          // Navigate to lessons page
          break;
        case 'attendance':
          // Navigate to attendance page
          break;
        case 'calendar':
          // Navigate to calendar page
          break;
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="Logo" 
                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 text-gray-900 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 font-cairo">جاري تحميل مغامرتك...</h2>
            <p className="text-gray-600 font-cairo text-xl">نحضر كل شيء من أجلك! 🎉</p>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Layout />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
      </div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/50">
          <LoginForm onSwitchToRegister={() => {}} />
        </div>
      </div>
      
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </>
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