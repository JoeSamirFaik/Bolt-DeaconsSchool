import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  PlusIcon, 
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  BriefcaseIcon,
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
    minHeight: '44px',
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
    padding: '10px 14px',
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
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'deacons' | 'parents' | 'servants' | 'assignments'>('deacons');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  // Modal states
  const [showUserForm, setShowUserForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Bulk assignment state
  const [selectedDeacons, setSelectedDeacons] = useState<string[]>([]);
  const [bulkAssignmentForm, setBulkAssignmentForm] = useState({
    levelId: '',
    academicYear: '',
    startDate: '',
    expectedEndDate: '',
    notes: ''
  });

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

  const handleBulkAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const promises = selectedDeacons.map(deaconId => 
        levelAssignmentsApi.create({
          deaconId,
          levelId: bulkAssignmentForm.levelId,
          academicYear: bulkAssignmentForm.academicYear,
          startDate: bulkAssignmentForm.startDate,
          expectedEndDate: bulkAssignmentForm.expectedEndDate,
          notes: bulkAssignmentForm.notes
        })
      );
      
      await Promise.all(promises);
      
      setBulkAssignmentForm({
        levelId: '',
        academicYear: '',
        startDate: '',
        expectedEndDate: '',
        notes: ''
      });
      setSelectedDeacons([]);
      loadData();
    } catch (error) {
      console.error('Error creating bulk assignments:', error);
    }
  };

  const toggleCardExpansion = (userId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectDeacon = (deaconId: string) => {
    setSelectedDeacons(prev => 
      prev.includes(deaconId) 
        ? prev.filter(id => id !== deaconId)
        : [...prev, deaconId]
    );
  };

  const handleAddNew = () => {
    setEditingItem(null);
    if (activeTab === 'assignments') {
      setShowAssignmentForm(true);
    } else {
      setShowUserForm(true);
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'deacon': return <AcademicCapIcon className="w-5 h-5 text-blue-600" />;
      case 'servant': return <UserIcon className="w-5 h-5 text-green-600" />;
      case 'parent': return <UsersIcon className="w-5 h-5 text-purple-600" />;
      case 'admin': return <UserIcon className="w-5 h-5 text-red-600" />;
      default: return <UserIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'deacon': return 'from-blue-100 to-indigo-100';
      case 'servant': return 'from-green-100 to-emerald-100';
      case 'parent': return 'from-purple-100 to-indigo-100';
      case 'admin': return 'from-red-100 to-rose-100';
      default: return 'from-gray-100 to-gray-200';
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

  // Filter users based on active tab and search
  const getFilteredUsers = () => {
    let filtered = users;
    
    if (activeTab === 'deacons') {
      filtered = users.filter(u => u.role === 'deacon');
    } else if (activeTab === 'parents') {
      filtered = users.filter(u => u.role === 'parent');
    } else if (activeTab === 'servants') {
      filtered = users.filter(u => u.role === 'servant');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredUsers = getFilteredUsers();
  const deacons = users.filter(u => u.role === 'deacon');
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="space-y-4">
          {/* Title */}
          <div className="text-right">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">إدارة المستخدمين</h1>
            <p className="text-gray-600 font-cairo text-sm sm:text-base hidden sm:block">إدارة جميع المستخدمين في النظام</p>
          </div>
          
          {/* Action Button - Under title on mobile */}
          {activeTab !== 'assignments' && (
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={handleAddNew}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base"
              >
                <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>
                  {activeTab === 'deacons' ? 'إضافة شماس' : 
                   activeTab === 'parents' ? 'إضافة ولي أمر' : 
           'إضافة مستخدم'}
                </span>
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className={`grid gap-1 bg-gray-100 p-1 rounded-xl ${
            user?.role === 'servant' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
          }`}>
            <button
              onClick={() => setActiveTab('deacons')}
              className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
                activeTab === 'deacons'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AcademicCapIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>الشمامسة</span>
            </button>
            <button
              onClick={() => setActiveTab('parents')}
              className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
                activeTab === 'parents'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>أولياء الأمور</span>
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('servants')}
                className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
                  activeTab === 'servants'
                    ? 'bg-white text-amber-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>الخدام</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
                activeTab === 'assignments'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">التكليفات</span>
              <span className="sm:hidden">تكليف</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4">
          <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo">تصفية البيانات</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              البحث
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث بالاسم أو البريد الإلكتروني..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo text-sm sm:text-base"
            />
          </div>
          
          {activeTab === 'assignments' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
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

      {/* Bulk Assignment Form - Only for assignments tab */}
      {activeTab === 'assignments' && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-sm border border-purple-200 p-4 sm:p-6">
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <UsersIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h3 className="text-lg sm:text-xl font-bold text-purple-900 font-cairo">تكليف جماعي للشمامسة</h3>
          </div>
          
          <form onSubmit={handleBulkAssignment} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  المستوى *
                </label>
                <Select
                  value={bulkAssignmentForm.levelId ? 
                    { value: bulkAssignmentForm.levelId, label: levels.find(l => l.id === bulkAssignmentForm.levelId)?.name } : 
                    null
                  }
                  onChange={(option) => {
                    setBulkAssignmentForm({ ...bulkAssignmentForm, levelId: option ? option.value : '' });
                  }}
                  options={levels.map(level => ({ 
                    value: level.id, 
                    label: level.name 
                  }))}
                  styles={customSelectStyles}
                  placeholder="اختر المستوى"
                  isSearchable={true}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  السنة الأكاديمية *
                </label>
                <Select
                  value={bulkAssignmentForm.academicYear ? 
                    { value: bulkAssignmentForm.academicYear, label: bulkAssignmentForm.academicYear } : 
                    null
                  }
                  onChange={(option) => {
                    setBulkAssignmentForm({ ...bulkAssignmentForm, academicYear: option ? option.value : '' });
                  }}
                  options={academicYears.map(year => ({ 
                    value: year.year, 
                    label: year.year 
                  }))}
                  styles={customSelectStyles}
                  placeholder="اختر السنة"
                  isSearchable={false}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                    تاريخ البداية *
                  </label>
                  <input
                    type="date"
                    value={bulkAssignmentForm.startDate}
                    onChange={(e) => setBulkAssignmentForm({ ...bulkAssignmentForm, startDate: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                    تاريخ الانتهاء *
                  </label>
                  <input
                    type="date"
                    value={bulkAssignmentForm.expectedEndDate}
                    onChange={(e) => setBulkAssignmentForm({ ...bulkAssignmentForm, expectedEndDate: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  ملاحظات
                </label>
                <textarea
                  value={bulkAssignmentForm.notes}
                  onChange={(e) => setBulkAssignmentForm({ ...bulkAssignmentForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo resize-none bg-white text-sm"
                  placeholder="ملاحظات إضافية..."
                />
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-purple-600 font-cairo">
                    تم اختيار {selectedDeacons.length} من {deacons.length} شماس
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedDeacons.length === deacons.length) {
                        setSelectedDeacons([]);
                      } else {
                        setSelectedDeacons(deacons.map(d => d.id));
                      }
                    }}
                    className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-cairo underline"
                  >
                    {selectedDeacons.length === deacons.length ? 'إلغاء تحديد الكل' : 'تحديد الكل'}
                  </button>
                </div>
                
                <div className="max-h-24 sm:max-h-32 overflow-y-auto space-y-1 sm:space-y-2">
                  {deacons.slice(0, 8).map((deacon) => (
                    <label key={deacon.id} className="flex items-center space-x-2 sm:space-x-3 space-x-reverse cursor-pointer hover:bg-purple-50 p-1 sm:p-2 rounded">
                      <span className="text-xs sm:text-sm text-gray-700 font-cairo">{deacon.firstName} {deacon.lastName}</span>
                      <input
                        type="checkbox"
                        checked={selectedDeacons.includes(deacon.id)}
                        onChange={() => handleSelectDeacon(deacon.id)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                    </label>
                  ))}
                  {deacons.length > 8 && (
                    <p className="text-xs text-gray-500 font-cairo text-center py-1">
                      و {deacons.length - 8} شماس آخر...
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDeacons([]);
                    setBulkAssignmentForm({
                      levelId: '',
                      academicYear: '',
                      startDate: '',
                      expectedEndDate: '',
                      notes: ''
                    });
                  }}
                  className="w-full sm:flex-1 px-3 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={selectedDeacons.length === 0}
                  className="w-full sm:flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  تكليف {selectedDeacons.length} شماس
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Users Tabs (Deacons, Parents, Servants) */}
        {activeTab !== 'assignments' && (
          <div className="p-4 sm:p-6">
            {/* Mobile: Card View */}
            <div className="block lg:hidden space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
                  {/* Compact Header - Always Visible */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCardExpansion(user.id)}
                  >
                    <div className="flex items-center justify-between">
                      {/* User Basic Info */}
                      <div className="flex items-center space-x-3 space-x-reverse flex-1">
                        <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(user.role)} rounded-xl flex items-center justify-center shadow-sm`}>
                          {getRoleIcon(user.role)}
                        </div>
                        <div className="text-right flex-1 min-w-0">
                          <h3 className="text-base font-bold text-gray-900 font-cairo truncate">
                            {user.firstName} {user.lastName}
                          </h3>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'نشط' : 'غير نشط'}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800`}>
                              {getRoleLabel(user.role)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItem(user);
                            setShowUserForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expandable Details */}
                  {expandedCards.has(user.id) && (
                    <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                      <div className="space-y-3 pt-3">
                        {/* Email */}
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-500 font-cairo mb-1">البريد الإلكتروني</p>
                          <p className="text-sm text-gray-900 font-cairo">{user.email}</p>
                        </div>
                        
                        {/* Role-specific Info */}
                        {user.role === 'deacon' && user.deaconInfo && (
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-blue-600 font-cairo mb-1">المستوى الحالي</p>
                                <p className="text-sm font-medium text-blue-800 font-cairo">
                                  {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                                </p>
                              </div>
                              {user.deaconInfo.enrollmentDate && (
                                <div>
                                  <p className="text-xs text-blue-600 font-cairo mb-1">تاريخ التسجيل</p>
                                  <p className="text-sm text-blue-700 font-cairo">
                                    {new Date(user.deaconInfo.enrollmentDate).toLocaleDateString('ar-EG')}
                                  </p>
                                </div>
                              )}
                              {user.deaconInfo.notes && (
                                <div>
                                  <p className="text-xs text-blue-600 font-cairo mb-1">ملاحظات</p>
                                  <p className="text-sm text-blue-700 font-cairo">{user.deaconInfo.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {user.role === 'parent' && user.parentInfo && (
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs text-purple-600 font-cairo mb-1">رقم الهاتف</p>
                                  <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.phone}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-purple-600 font-cairo mb-1">عدد الأطفال</p>
                                  <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.children.length} طفل</p>
                                </div>
                              </div>
                              {user.parentInfo.occupation && (
                                <div>
                                  <p className="text-xs text-purple-600 font-cairo mb-1">المهنة</p>
                                  <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.occupation}</p>
                                </div>
                              )}
                              {user.parentInfo.address && (
                                <div>
                                  <p className="text-xs text-purple-600 font-cairo mb-1">العنوان</p>
                                  <p className="text-sm text-purple-700 font-cairo">{user.parentInfo.address}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {user.role === 'servant' && user.servantInfo && (
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs text-green-600 font-cairo mb-1">التخصص</p>
                                  <p className="text-sm text-green-700 font-cairo">{user.servantInfo.specialization}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-green-600 font-cairo mb-1">رقم الهاتف</p>
                                  <p className="text-sm text-green-700 font-cairo">{user.servantInfo.phone}</p>
                                </div>
                              </div>
                              {user.servantInfo.assignedLevels && user.servantInfo.assignedLevels.length > 0 && (
                                <div>
                                  <p className="text-xs text-green-600 font-cairo mb-1">المستويات المُكلف بها</p>
                                  <div className="flex flex-wrap gap-1">
                                    {user.servantInfo.assignedLevels.map(levelId => (
                                      <span key={levelId} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-cairo">
                                        {levels.find(l => l.id === levelId)?.name || levelId}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Join Date */}
                        <div className="bg-gray-100 rounded-lg p-3">
                          <p className="text-xs text-gray-500 font-cairo mb-1">تاريخ الانضمام</p>
                          <p className="text-sm text-gray-700 font-cairo">
                            {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Desktop: Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الإجراءات
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الحالة
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      معلومات إضافية
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      البريد الإلكتروني
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      النوع
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الاسم
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(user);
                              setShowUserForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{user.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.role === 'deacon' && user.deaconInfo && (
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <AcademicCapIcon className="w-4 h-4 text-blue-500" />
                              <span className="font-cairo">
                                {levels.find(l => l.id === user.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                              </span>
                            </div>
                          )}
                          {user.role === 'parent' && user.parentInfo && (
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <UsersIcon className="w-4 h-4 text-purple-500" />
                              <span className="font-cairo">{user.parentInfo.children.length} طفل</span>
                            </div>
                          )}
                          {user.role === 'servant' && user.servantInfo && (
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <AcademicCapIcon className="w-4 h-4 text-green-500" />
                              <span className="font-cairo">{user.servantInfo.specialization}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-cairo">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse bg-gradient-to-r ${getRoleColor(user.role)} text-gray-800`}>
                          {getRoleIcon(user.role)}
                          <span>{getRoleLabel(user.role)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(user.role)} rounded-full flex items-center justify-center`}>
                            <span className="text-sm font-bold text-gray-700">
                              {user.firstName.charAt(0)}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 font-cairo">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs text-gray-500 font-cairo">
                              انضم: {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد مستخدمون</h3>
                <p className="text-gray-500 font-cairo">
                  {searchTerm ? `لا يوجد مستخدمون تطابق البحث "${searchTerm}"` : 'لم يتم إضافة أي مستخدمين بعد'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="p-4 sm:p-6">
            <div className="space-y-6">
              {levels.map((level) => {
                const levelAssignments = filteredAssignments.filter(a => a.levelId === level.id);
                const averageProgress = levelAssignments.length > 0 
                  ? Math.round(levelAssignments.reduce((sum, a) => sum + a.progress, 0) / levelAssignments.length)
                  : 0;
                
                return (
                  <div key={level.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    {/* Level Header */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                          <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-2 mx-auto sm:mx-0">
                              <span className="text-lg sm:text-xl font-bold text-amber-600">{averageProgress}%</span>
                            </div>
                            <p className="text-xs text-gray-600 font-cairo">متوسط</p>
                          </div>
                          <div className="text-right">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-cairo mb-2">{level.name}</h3>
                            <p className="text-gray-600 font-cairo mb-3 text-sm sm:text-base hidden sm:block">{level.description}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 sm:space-x-reverse text-xs sm:text-sm">
                              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                                {levelAssignments.length} شماس مُكلف
                              </span>
                              <span className="text-gray-500">نسبة النجاح: {level.passPercentage}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
                          <AcademicCapIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                          <div
                            className="h-2 sm:h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-700 shadow-sm"
                            style={{ width: `${averageProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Deacons */}
                    {levelAssignments.length > 0 ? (
                      <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {levelAssignments.map((assignment) => {
                            const deacon = users.find(u => u.id === assignment.deaconId);
                            
                            return (
                              <div key={assignment.id} className="bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex space-x-2 space-x-reverse">
                                    <button
                                      onClick={() => {
                                        setEditingItem(assignment);
                                        setShowAssignmentForm(true);
                                      }}
                                      className="p-1 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                      title="تعديل التكليف"
                                    >
                                      <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteAssignment(assignment.id)}
                                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="حذف التكليف"
                                    >
                                      <TrashIcon className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="text-right">
                                    <h4 className="font-semibold text-gray-900 font-cairo text-sm sm:text-base">
                                      {deacon?.firstName} {deacon?.lastName}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-cairo">{assignment.academicYear}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-bold text-amber-600">{assignment.progress}%</span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                                    {getStatusLabel(assignment.status)}
                                  </span>
                                </div>
                                
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-2 sm:mb-3">
                                  <div
                                    className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                                    style={{ width: `${assignment.progress}%` }}
                                  ></div>
                                </div>
                                
                                <div className="text-xs text-gray-500 font-cairo">
                                  {new Date(assignment.startDate).toLocaleDateString('ar-EG')} - {new Date(assignment.expectedEndDate).toLocaleDateString('ar-EG')}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 sm:p-6 text-center">
                        <UsersIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-cairo text-sm sm:text-base">لا يوجد شمامسة مُكلفون في هذا المستوى</p>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {levels.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <AcademicCapIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد مستويات</h3>
                  <p className="text-gray-500 font-cairo text-sm sm:text-base">يرجى إضافة مستويات أكاديمية أولاً</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showUserForm && (
        <UserForm
          user={editingItem}
          users={users}
          allowedRoles={activeTab === 'servants' ? ['servant'] : 
                       user?.role === 'servant' ? ['deacon', 'parent'] : 
                       ['deacon', 'parent']}
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