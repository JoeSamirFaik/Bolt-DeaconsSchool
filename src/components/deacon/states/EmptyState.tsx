import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const EmptyState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-6">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-xl">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <AcademicCapIcon className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">مرحباً بك في رحلتك التعليمية!</h3>
        <p className="text-gray-600 font-cairo text-lg mb-6">لم يتم تكليفك بأي مستوى دراسي بعد. يرجى التواصل مع المدير أو الخادم لبدء رحلتك التعليمية.</p>
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4">
          <p className="text-amber-800 font-cairo font-medium">💡 نصيحة: بمجرد تكليفك بمستوى، ستتمكن من الوصول إلى جميع الدروس والاختبارات!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;