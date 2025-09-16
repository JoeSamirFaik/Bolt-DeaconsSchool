import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { User, LevelAssignment, AcademicYear } from '../../types/user';
import { usersApi, levelAssignmentsApi, academicYearsApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';
import UserForm from './UserForm';
import LevelAssignmentForm from './LevelAssignmentForm';
import UserManagementHeader from './user-management/UserManagementHeader';
import UserManagementTabs from './user-management/UserManagementTabs';
import UserManagementFilters from './user-management/UserManagementFilters';
import UsersTab from './user-management/UsersTab';
import AssignmentsTab from './user-management/AssignmentsTab';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'assignments'>('users');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Modal states
  const [showUserForm, setShowUserForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, levelsData, assignmentsData, yearsData] = await Promise.all([
        usersApi.getAll(),
        levelsApi.getAll(),
        levelAssignmentsApi.getAll(),
        academicYearsApi.getAll()
      ]);
      setUsers(usersData);
      setLevels(levelsData);
      setAssignments(assignmentsData);
      setAcademicYears(yearsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        await usersApi.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التكليف؟')) {
      try {
        await levelAssignmentsApi.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting assignment:', error);
      }
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    if (activeTab === 'users') setShowUserForm(true);
    else setShowAssignmentForm(true);
  };

  const filteredUsers = users.filter(user => 
    (!selectedRole || user.role === selectedRole) &&
    (!searchTerm || 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredAssignments = assignments.filter(assignment => 
    !selectedYear || assignment.academicYear === selectedYear
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل إدارة المستخدمين...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <UserManagementHeader 
        activeTab={activeTab}
        onAddNew={handleAddNew}
      />

      {/* Tabs */}
      <UserManagementTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filters */}
      <UserManagementFilters
        activeTab={activeTab}
        selectedRole={selectedRole}
        selectedYear={selectedYear}
        searchTerm={searchTerm}
        academicYears={academicYears}
        onRoleChange={setSelectedRole}
        onYearChange={setSelectedYear}
        onSearchChange={setSearchTerm}
      />

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {activeTab === 'users' ? (
          <UsersTab
            users={filteredUsers}
            levels={levels}
            onEdit={(user) => {
              setEditingItem(user);
              setShowUserForm(true);
            }}
            onDelete={handleDeleteUser}
          />
        ) : (
          <AssignmentsTab
            assignments={filteredAssignments}
            users={users}
            levels={levels}
            onEdit={(assignment) => {
              setEditingItem(assignment);
              setShowAssignmentForm(true);
            }}
            onDelete={handleDeleteAssignment}
          />
        )}
      </div>

      {/* Modals */}
      {showUserForm && (
        <UserForm
          user={editingItem}
          users={users}
          onClose={() => {
            setShowUserForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowUserForm(false);
            setEditingItem(null);
            loadData();
          }}
        />
      )}

      {showAssignmentForm && (
        <LevelAssignmentForm
          assignment={editingItem}
          users={users.filter(u => u.role === 'deacon')}
          levels={levels}
          academicYears={academicYears}
          onClose={() => {
            setShowAssignmentForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowAssignmentForm(false);
            setEditingItem(null);
            loadData();
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;