import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UsersIcon,
  UserIcon,
  AcademicCapIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User, LevelAssignment, AcademicYear } from '../../types/user';
import { usersApi, levelAssignmentsApi, academicYearsApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';
import UserForm from './UserForm';
import LevelAssignmentForm from './LevelAssignmentForm';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '48px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f59e0b' 
      : state.isFocused 
        ? '#fef3c7' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const,
    '&:hover': {
      backgroundColor: state.isSelected ? '#f59e0b' : '#fef3c7'
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  })
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'assignments'>('users');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'deacon': return 'شماس';
      case 'servant': return 'خادم';
      case 'parent': return 'ولي أمر';
      case 'admin': return 'مدير';
      default: return role;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'assigned': return 'مُكلف';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'failed': return 'فاشل';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => 
    !selectedRole || user.role === selectedRole
  );

  const filteredAssignments = assignments.filter(assignment => 
    !selectedYear || assignment.academicYear === selectedYear
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              setEditingItem(null);
              if (activeTab === 'users') setShowUserForm(true);
              else setShowAssignmentForm(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl transition-all duration-200 flex items-center space-x-3 space-x-reverse font-semibold text-lg shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-6 h-6" />
            <span>
              {activeTab === 'users' ? 'إضافة مستخدم' : 'تكليف مستوى'}
            </span>
          </button>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 font-cairo mb-2">إدارة المستخدمين</h1>
            <p className="text-gray-600 font-cairo text-lg">إدارة الشمامسة وأولياء الأمور والخدام</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 space-x-reverse bg-gray-100 p-2 rounded-2xl">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 space-x-reverse text-lg ${
              activeTab === 'users'
                ? 'bg-white text-amber-600 shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <UsersIcon className="w-6 h-6" />
            <span>المستخدمون</span>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-3 space-x-reverse text-lg ${
              activeTab === 'assignments'
                ? 'bg-white text-amber-600 shadow-lg scale-105'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <AcademicCapIcon className="w-6 h-6" />
            <span>تكليفات المستويات</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center space-x-4 space-x-reverse mb-6">
          <FunnelIcon className="w-6 h-6 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 font-cairo">تصفية البيانات</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === 'users' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
                نوع المستخدم
              </label>
              <Select
                value={selectedRole ? { value: selectedRole, label: getRoleLabel(selectedRole) } : null}
                onChange={(option) => setSelectedRole(option ? option.value : '')}
                options={[
                  { value: '', label: '-- جميع المستخدمين --' },
                  { value: 'deacon', label: 'شماس' },
                  { value: 'servant', label: 'خادم' },
                  { value: 'parent', label: 'ولي أمر' }
                ]}
                styles={customSelectStyles}
                placeholder="-- اختر نوع المستخدم --"
                isSearchable={false}
                isClearable
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-right font-cairo">
                السنة الأكاديمية
              </label>
              <Select
                value={selectedYear ? { value: selectedYear, label: selectedYear } : null}
                onChange={(option) => setSelectedYear(option ? option.value : '')}
                options={[
                  { value: '', label: '-- جميع السنوات --' },
                  ...academicYears.map(year => ({ value: year.year, label: year.year }))
                ]}
                styles={customSelectStyles}
                placeholder="-- اختر السنة الأكاديمية --"
                isSearchable={false}
                isClearable
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex space-x-3 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(user);
                          setShowUserForm(true);
                        }}
                        className="p-3 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <UserIcon className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                  
                  <div className="text-right mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600 font-cairo text-lg mb-2">
                      {user.email}
                    </p>
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-semibold rounded-full">
                      {getRoleLabel(user.role)}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {user.role === 'deacon' && user.deaconInfo && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 font-cairo mb-2">المستوى الحالي</p>
                        <p className="font-semibold text-blue-800 font-cairo">
                          {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                        </p>
                      </div>
                    )}
                    
                    {user.role === 'parent' && user.parentInfo && (
                      <div className="bg-green-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600 font-cairo mb-2">عدد الأطفال</p>
                        <p className="font-semibold text-green-800 font-cairo">
                          {user.parentInfo.children.length} طفل
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 space-x-reverse ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        <span>{user.isActive ? 'نشط' : 'غير نشط'}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="p-8">
            <div className="space-y-6">
              {filteredAssignments.map((assignment) => {
                const deacon = users.find(u => u.id === assignment.deaconId);
                const level = levels.find(l => l.id === assignment.levelId);
                
                return (
                  <div key={assignment.id} className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 space-x-reverse">
                        <div className="flex space-x-3 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(assignment);
                              setShowAssignmentForm(true);
                            }}
                            className="p-3 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:scale-110"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteAssignment(assignment.id)}
                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-4 space-x-reverse mb-3">
                            <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                              {getStatusLabel(assignment.status)}
                            </span>
                            <span className="text-sm text-gray-500 font-cairo">{assignment.academicYear}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 font-cairo mb-2">
                            {deacon?.firstName} {deacon?.lastName}
                          </h3>
                          <p className="text-gray-600 font-cairo text-lg">
                            {level?.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 space-x-reverse">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                            <span className="text-2xl font-bold text-amber-600">{assignment.progress}%</span>
                          </div>
                          <p className="text-sm text-gray-600 font-cairo">التقدم</p>
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg">
                          <AcademicCapIcon className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-700 shadow-sm"
                          style={{ width: `${assignment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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