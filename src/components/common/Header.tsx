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
          {/* Dark Mode Toggle */}
          <button className="p-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 hover:scale-110 group">
            <SunIcon className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          
          {/* Notifications */}
          <button className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
              3
            </span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 space-x-reverse p-3 rounded-2xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 border border-transparent hover:border-amber-200 hover:shadow-lg group"
            >
              <ChevronDownIcon className={`w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-all duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900 group-hover:text-amber-900 font-cairo transition-colors duration-200">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-amber-700 font-cairo transition-colors duration-200">
                  {user?.role === 'deacon' ? 'شماس' : 
                   user?.role === 'servant' ? 'خادم' : 
                   user?.role === 'parent' ? 'ولي أمر' : 'مدير'}
                </p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ring-2 ring-white group-hover:ring-amber-200">
                  <span className="text-white font-bold text-sm font-cairo">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
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
                <div className="absolute left-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right flex-1">
                          <h3 className="text-lg font-bold font-cairo mb-1">
                            {user?.firstName} {user?.lastName}
                          </h3>
                          <p className="text-amber-100 text-sm font-cairo mb-2">
                            {user?.email}
                          </p>
                          <div className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 rounded-full">
                            <span className="text-xs font-semibold font-cairo">
                              {user?.role === 'deacon' ? '🎓 شماس' : 
                               user?.role === 'servant' ? '👨‍🏫 خادم' : 
                               user?.role === 'parent' ? '👨‍👩‍👧 ولي أمر' : '👑 مدير'}
                            </span>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                          <span className="text-white font-bold text-lg font-cairo">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-3">
                    <button className="w-full px-6 py-4 text-right hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 flex items-center space-x-4 space-x-reverse group">
                      <span className="text-gray-700 group-hover:text-blue-700 font-cairo font-medium flex-1 text-base">الملف الشخصي</span>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </button>
                    
                    <button className="w-full px-6 py-4 text-right hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300 flex items-center space-x-4 space-x-reverse group">
                      <span className="text-gray-700 group-hover:text-purple-700 font-cairo font-medium flex-1 text-base">الإعدادات</span>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Cog6ToothIcon className="w-5 h-5 text-purple-600" />
                      </div>
                    </button>
                    
                    <button className="w-full px-6 py-4 text-right hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 flex items-center space-x-4 space-x-reverse group">
                      <span className="text-gray-700 group-hover:text-green-700 font-cairo font-medium flex-1 text-base">المساعدة والدعم</span>
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </button>
                    
                    {/* Divider */}
                    <div className="mx-6 my-3 border-t border-gray-200"></div>
                    
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-6 py-4 text-right hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 flex items-center space-x-4 space-x-reverse group"
                    >
                      <span className="text-gray-700 group-hover:text-red-700 font-cairo font-medium flex-1 text-base">تسجيل الخروج</span>
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 group-hover:from-red-200 group-hover:to-rose-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  
                  {/* Footer */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center font-cairo">
                      مدرسة الشمامسة - القديس أثناسيوس
                    </p>
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