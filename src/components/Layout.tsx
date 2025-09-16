import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import DeaconDashboard from './dashboards/DeaconDashboard';
import ServantDashboard from './dashboards/ServantDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import LMSManagement from './admin/LMSManagement';
import DeaconParentManagement from './admin/DeaconParentManagement';
import ServantManagement from './admin/ServantManagement';

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
      case 'deacon-parent-mgmt':
        return <DeaconParentManagement />;
      case 'servant-mgmt':
        return user?.role === 'admin' ? <ServantManagement /> : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">غير مسموح</h3>
              <p className="text-gray-500 font-cairo">هذه الصفحة متاحة للمديرين فقط</p>
            </div>
          </div>
        );
      case 'lessons':
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">الدروس</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      case 'quizzes':
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">الاختبارات</h3>
              <p className="text-gray-500 font-cairo">قريباً...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
      <div className={`fixed inset-y-0 right-0 z-50 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 lg:right-auto lg:left-0`}>
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Page content */}
        <main className="flex-1 p-6 lg:ml-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;