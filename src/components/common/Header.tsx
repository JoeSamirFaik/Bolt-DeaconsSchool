import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon,
  SunIcon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث..."
              className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo transition-all duration-200 hover:bg-white"
            />
          </div>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Action buttons */}
          <button className="p-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110">
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          <button className="p-3 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 hover:scale-110">
            <SunIcon className="h-6 w-6" />
          </button>
          <button className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
              3
            </span>
          </button>
          <button className="p-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-110">
            <Cog6ToothIcon className="h-6 w-6" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 font-cairo">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 font-cairo">
                  {user?.role === 'deacon' ? 'شماس' : 
                   user?.role === 'servant' ? 'خادم' : 
                   user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-sm font-cairo">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 font-cairo">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 font-cairo">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-medium rounded-full">
                        {user?.role === 'deacon' ? 'شماس' : 
                         user?.role === 'servant' ? 'خادم' : 
                         user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm font-cairo">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center space-x-3 space-x-reverse">
                    <span className="text-sm text-gray-700 font-cairo">الملف الشخصي</span>
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">👤</span>
                    </div>
                  </button>
                  
                  <button className="w-full px-4 py-3 text-right hover:bg-gray-50 transition-colors flex items-center space-x-3 space-x-reverse">
                    <span className="text-sm text-gray-700 font-cairo">الإعدادات</span>
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Cog6ToothIcon className="w-4 h-4 text-purple-600" />
                    </div>
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-3 text-right hover:bg-red-50 transition-colors flex items-center space-x-3 space-x-reverse group"
                    >
                      <span className="text-sm text-gray-700 group-hover:text-red-600 font-cairo">تسجيل الخروج</span>
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <ArrowLeftOnRectangleIcon className="w-4 h-4 text-red-600" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;