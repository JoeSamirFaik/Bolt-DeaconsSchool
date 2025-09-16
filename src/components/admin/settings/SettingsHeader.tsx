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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={loading}
          className={`px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 ${
            saveStatus === 'saved' 
              ? 'bg-green-600 text-white' 
              : saveStatus === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الحفظ...</span>
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircleIcon className="w-5 h-5" />
              <span>تم الحفظ</span>
            </>
          ) : saveStatus === 'error' ? (
            <>
              <ExclamationTriangleIcon className="w-5 h-5" />
              <span>خطأ في الحفظ</span>
            </>
          ) : (
            <>
              <Cog6ToothIcon className="w-5 h-5" />
              <span>حفظ الإعدادات</span>
            </>
          )}
        </button>
        
        {/* Title */}
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900 font-cairo">إعدادات النظام</h1>
          <p className="text-gray-600 font-cairo">تخصيص وإدارة جميع جوانب النظام</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;