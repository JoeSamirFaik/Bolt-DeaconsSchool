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
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">الدروس</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
      case 'quizzes':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">الاختبارات</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">التقويم</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">الإشعارات</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">المكتبة</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentPage}</h3>
              <p className="text-gray-600">قريباً...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900 font-cairo">
            مدرسة الشمامسة
          </h1>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;