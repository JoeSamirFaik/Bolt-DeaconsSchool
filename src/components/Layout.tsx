import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from './common/Header';
import Sidebar from './common/Sidebar';
import AdminDashboard from './dashboards/AdminDashboard';
import DeaconDashboard from './dashboards/DeaconDashboard';
import ServantDashboard from './dashboards/ServantDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import LMSManagement from './admin/LMSManagement';
import UserManagement from './admin/UserManagement';
import ServantManagement from './admin/ServantManagement';
import DeaconParentManagement from './admin/DeaconParentManagement';
import AttendanceManagement from './admin/AttendanceManagement';
import LearningJourney from './deacon/LearningJourney';
import DeaconCalendar from './deacon/DeaconCalendar';
import AttendanceBoard from './deacon/AttendanceBoard';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (!user) return null;

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        switch (user.role) {
          case 'admin':
            return <AdminDashboard />;
          case 'deacon':
            return <DeaconDashboard />;
          case 'servant':
            return <ServantDashboard />;
          case 'parent':
            return <ParentDashboard />;
          default:
            return <div>Invalid role</div>;
        }
      case 'lms':
        return user.role === 'admin' ? <LMSManagement /> : <div>Access denied</div>;
      case 'users':
        return user.role === 'admin' ? <UserManagement /> : <div>Access denied</div>;
      case 'servants':
        return user.role === 'admin' ? <ServantManagement /> : <div>Access denied</div>;
      case 'deacon-parents':
        return user.role === 'admin' ? <DeaconParentManagement /> : <div>Access denied</div>;
      case 'attendance':
        return user.role === 'admin' ? <AttendanceManagement /> : <div>Access denied</div>;
      case 'learning':
        return user.role === 'deacon' ? <LearningJourney /> : <div>Access denied</div>;
      case 'calendar':
        return user.role === 'deacon' ? <DeaconCalendar /> : <div>Access denied</div>;
      case 'attendance-board':
        return user.role === 'deacon' ? <AttendanceBoard /> : <div>Access denied</div>;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;