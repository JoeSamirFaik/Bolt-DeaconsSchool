import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import ReportsManagement from './admin/ReportsManagement';
import SystemSettings from './admin/SystemSettings';
import CallRequestManagement from './parent/CallRequestManagement';
import ChildNotesManagement from './admin/ChildNotesManagement';
import PWAInstallPrompt from './common/PWAInstallPrompt';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get current page from URL - handle both root and dashboard paths
  const getCurrentPage = () => {
    const path = location.pathname.slice(1);
    if (path === '') {
      return 'dashboard';
    }
    return path;
  };
  
  const currentPage = getCurrentPage();

  // Listen for notification navigation events
  useEffect(() => {
    const handleNavigateToNotifications = () => {
      navigate('/notifications');
    };

    window.addEventListener('navigate-to-notifications', handleNavigateToNotifications);
    return () => {
      window.removeEventListener('navigate-to-notifications', handleNavigateToNotifications);
    };
  }, [navigate]);

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

  const NotAllowedPage = ({ title }: { title: string }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚫</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">غير مسموح</h3>
        <p className="text-gray-500 font-cairo">{title}</p>
      </div>
    </div>
  );

  const ComingSoonPage = ({ title, icon }: { title: string; icon: string }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 font-cairo">{title}</h3>
        <p className="text-gray-500 font-cairo">قريباً...</p>
      </div>
    </div>
  );

  const handlePageChange = (page: string) => {
    if (page === 'dashboard') {
      navigate('/');
    } else {
      navigate(`/${page}`);
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
          onPageChange={handlePageChange}
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
          <Routes>
            {/* Dashboard Routes */}
            <Route path="/" element={renderDashboard()} />
            <Route path="/dashboard" element={renderDashboard()} />
            
            {/* Deacon Routes */}
            <Route path="/lessons" element={
              user?.role === 'deacon' ? <LearningJourney /> : <ComingSoonPage title="الدروس" icon="📚" />
            } />
            <Route path="/calendar" element={
              user?.role === 'deacon' ? <DeaconCalendar /> : <ComingSoonPage title="التقويم" icon="📅" />
            } />
            <Route path="/attendance-board" element={<AttendanceBoard />} />
            
            {/* Admin/Servant Routes */}
            <Route path="/content-mgmt" element={<LMSManagement />} />
            <Route path="/lessons-mgmt" element={<LMSManagement />} />
            <Route path="/attendance" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <AttendanceManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/reports" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <ReportsManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/deacon-reports" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <ReportsManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/servant-mgmt" element={
              user?.role === 'admin' ? 
                <ServantManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين فقط" />
            } />
            <Route path="/users-mgmt" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <DeaconParentManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/deacon-parent-mgmt" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <DeaconParentManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/child-notes" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <ChildNotesManagement /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            <Route path="/records-approval" element={
              user?.role === 'admin' || user?.role === 'servant' ? 
                <RecordsApproval /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين والخدام فقط" />
            } />
            
            {/* Parent Routes */}
            <Route path="/call-requests" element={<CallRequestManagement />} />
            <Route path="/call-request" element={<CallRequestManagement />} />
            
            {/* Common Routes */}
            <Route path="/notifications" element={<NotificationLogs />} />
            <Route path="/profile" element={<ComingSoonPage title="الملف الشخصي" icon="👤" />} />
            <Route path="/quizzes" element={<ComingSoonPage title="الاختبارات" icon="🎯" />} />
            <Route path="/help" element={<ComingSoonPage title="المساعدة والدعم" icon="❓" />} />
            
            {/* Admin Only Routes */}
            <Route path="/settings" element={
              user?.role === 'admin' ? 
                <SystemSettings /> : 
                <NotAllowedPage title="هذه الصفحة متاحة للمديرين فقط" />
            } />
          </Routes>
        </main>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Layout;