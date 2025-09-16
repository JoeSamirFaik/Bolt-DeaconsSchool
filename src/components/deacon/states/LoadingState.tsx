import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-cairo">جاري تحميل رحلتك التعليمية...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;