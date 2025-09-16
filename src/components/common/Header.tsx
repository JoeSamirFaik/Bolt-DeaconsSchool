import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bars3Icon, 
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
  const [unreadNotifications, setUnreadNotifications] = React.useState(3);

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Action icons (always visible) except hamburger */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Dark Mode Toggle */}
          <button className="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-110 group">
            <SunIcon className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          
          {/* Notifications */}
          <button 
            onClick={() => {
              // In a real app, this would navigate to notifications page
              window.dispatchEvent(new CustomEvent('navigate-to-notifications'));
            }}
            className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 relative"
          >
            <BellIcon className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>

        {/* Center - Mobile menu button (separate from other icons) */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Right side - Profile */}
        <div className="flex items-center">
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-all duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 font-cairo">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 font-cairo">
                  {user?.role === 'deacon' ? 'شماس' : 
                   user?.role === 'servant' ? 'خادم' : 
                   user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
                </p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                
                {/* Menu */}
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {/* Header Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="text-right">
                      <h3 className="text-sm font-medium text-gray-900 font-cairo">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-xs text-gray-500 font-cairo">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-100 transition-colors text-sm text-gray-700 font-cairo">
                      الملف الشخصي
                    </button>
                    
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-100 transition-colors text-sm text-gray-700 font-cairo">
                      الإعدادات
                    </button>
                    
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-100 transition-colors text-sm text-gray-700 font-cairo">
                      المساعدة والدعم
                    </button>
                    
                    {/* Divider */}
                    <div className="mx-4 my-1 border-t border-gray-200"></div>
                    
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2 text-right hover:bg-red-50 transition-colors text-sm text-red-600 font-cairo"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;