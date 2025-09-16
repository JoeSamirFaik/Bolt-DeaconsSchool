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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">الدروس</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      case 'quizzes':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">الاختبارات</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">التقويم</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔔</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">الإشعارات</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      case 'library':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">المكتبة</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">{currentPage}</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
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
      <div className={`fixed inset-y-0 left-0 z-50 w-80 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0`}>
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-100 p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-900 font-cairo">
            مدرسة الشمامسة
          </h1>
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;