import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-12 h-12 rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-gray-900 shadow-2xl">
          <h2 className="text-xl font-bold mb-2 font-cairo">جاري تحميل رحلتك التعليمية...</h2>
          <p className="text-gray-600 font-cairo">نحضر كل شيء من أجلك! 🎓</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;