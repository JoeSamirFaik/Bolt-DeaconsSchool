import React from 'react';
import { 
  Cog6ToothIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface SettingsHeaderProps {
  onSave: () => void;
  loading: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onSave, loading, saveStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={loading}
          className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base ${
            saveStatus === 'saved' 
              ? 'bg-green-600 text-white' 
              : saveStatus === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white'
          }`}
        >
          {loading ? (
            <>
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">جاري الحفظ...</span>
              <span className="sm:hidden">حفظ...</span>
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">تم الحفظ</span>
              <span className="sm:hidden">تم</span>
            </>
          ) : saveStatus === 'error' ? (
            <>
              <ExclamationTriangleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">خطأ في الحفظ</span>
              <span className="sm:hidden">خطأ</span>
            </>
          ) : (
            <>
              <Cog6ToothIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">حفظ الإعدادات</span>
              <span className="sm:hidden">حفظ</span>
            </>
          )}
        </button>
        
        {/* Title */}
        <div className="text-right">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">إعدادات النظام</h1>
          <p className="text-gray-600 font-cairo text-sm sm:text-base hidden sm:block">تخصيص وإدارة جميع جوانب النظام</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;