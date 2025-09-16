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
import AttendanceManagement from './admin/AttendanceManagement';
import LearningJourney from './deacon/LearningJourney';
import DeaconCalendar from './deacon/DeaconCalendar';
import AttendanceBoard from './deacon/AttendanceBoard';
import NotificationLogs from './notifications/NotificationLogs';
import RecordsApproval from './admin/RecordsApproval';
import { useEffect } from 'react';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for notification navigation events
  useEffect(() => {
    const handleNavigateToNotifications = () => {
      setCurrentPage('notifications');
    };

    window.addEventListener('navigate-to-notifications', handleNavigateToNotifications);
    return () => {
      window.removeEventListener('navigate-to-notifications', handleNavigateToNotifications);
    };
  }, []);

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
      case 'lessons':
        return user?.role === 'deacon' ? <LearningJourney /> : (
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
      case 'calendar':
        return user?.role === 'deacon' ? <DeaconCalendar /> : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">التقويم</h3>
              <p className="text-gray-500 font-cairo">عرض جميع الجلسات والفعاليات</p>
            </div>
          </div>
        );
      case 'attendance-board':
        return <AttendanceBoard />;
      case 'lessons-mgmt':
        return <LMSManagement />;
      case 'attendance':
        return <AttendanceManagement />;
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
      case 'deacon-parent-mgmt':
        return user?.role === 'admin' || user?.role === 'servant' ? <DeaconParentManagement /> : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚫</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">غير مسموح</h3>
              <p className="text-gray-500 font-cairo">هذه الصفحة متاحة للمديرين والخدام فقط</p>
            </div>
          </div>
        );
      case 'notifications':
        return <NotificationLogs />;
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
      <div className={`fixed inset-y-0 right-0 z-50 w-64 h-screen transform ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:sticky lg:top-0 lg:flex-shrink-0 lg:right-auto lg:left-0`}>
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onMobileClose={() => setSidebarOpen(false)}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-30">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        
        {/* Page content */}
        <main className="flex-1 p-6 lg:ml-0 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;