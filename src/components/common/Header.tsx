import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon,
  SunIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user } = useAuth();

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

          {/* User Profile */}
          <div className="flex items-center space-x-3 space-x-reverse">
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
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
              <span className="text-white font-bold text-sm font-cairo">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;