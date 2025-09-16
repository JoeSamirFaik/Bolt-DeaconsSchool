import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './common/Sidebar';
import DeaconDashboard from './dashboards/DeaconDashboard';
import ServantDashboard from './dashboards/ServantDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import LMSManagement from './admin/LMSManagement';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderDashboard = () => {
    switch (user?.role) {
      case 'deacon':
        return <DeaconDashboard />;
      case 'servant':
        return <ServantDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'lessons-mgmt':
        return <LMSManagement />;
      case 'lessons':
        return <div className="p-6 bg-white rounded-xl">Lessons content coming soon...</div>;
      case 'quizzes':
        return <div className="p-6 bg-white rounded-xl">Quizzes content coming soon...</div>;
      case 'calendar':
        return <div className="p-6 bg-white rounded-xl">Calendar content coming soon...</div>;
      case 'notifications':
        return <div className="p-6 bg-white rounded-xl">Notifications content coming soon...</div>;
      case 'library':
        return <div className="p-6 bg-white rounded-xl">Spiritual Library content coming soon...</div>;
      default:
        return <div className="p-6 bg-white rounded-xl">{currentPage} content coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900">
            Deacons' School
          </h1>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;