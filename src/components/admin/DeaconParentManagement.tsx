import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UsersIcon,
  UserIcon,
  AcademicCapIcon,
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

const DeaconParentManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [assignments, setAssignments] = useState<LevelAssignment[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'deacons' | 'parents' | 'assignments'>('deacons');
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

  const deacons = users.filter(user => user.role === 'deacon');
  const parents = users.filter(user => user.role === 'parent');
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setEditingItem(null);
              if (activeTab === 'assignments') {
                setShowAssignmentForm(true);
              } else {
                setShowUserForm(true);
              }
            }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>
              {activeTab === 'deacons' ? 'إضافة شماس' : 
               activeTab === 'parents' ? 'إضافة ولي أمر' : 'تكليف مستوى'}
            </span>
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة الشمامسة وأولياء الأمور</h1>
            <p className="text-gray-600 font-cairo">إدارة الشمامسة وأولياء الأمور وتكليفات المستويات</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('deacons')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'deacons'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4" />
            <span>الشمامسة</span>
          </button>
          <button
            onClick={() => setActiveTab('parents')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'parents'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UsersIcon className="w-4 h-4" />
            <span>أولياء الأمور</span>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'assignments'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4" />
            <span>تكليفات المستويات</span>
          </button>
        </div>
      </div>

      {/* Filters for Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 font-cairo">تصفية البيانات</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
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
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Deacons Tab */}
        {activeTab === 'deacons' && (
          <div className="p-6">
            <div className="overflow-x-auto">
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
                      المستوى الحالي
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      تاريخ التسجيل
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      البريد الإلكتروني
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الاسم
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deacons.map((deacon, index) => (
                    <tr key={deacon.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(deacon);
                              setShowUserForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(deacon.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse ${
                          deacon.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {deacon.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{deacon.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <AcademicCapIcon className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-gray-900 font-cairo">
                            {levels.find(l => l.id === deacon.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-cairo">
                          {deacon.deaconInfo?.enrollmentDate ? new Date(deacon.deaconInfo.enrollmentDate).toLocaleDateString('ar-EG') : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-cairo">{deacon.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                            <AcademicCapIcon className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 font-cairo">
                              {deacon.firstName} {deacon.lastName}
                            </div>
                            <div className="text-xs text-gray-500 font-cairo">شماس</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {deacons.length === 0 && (
                <div className="text-center py-12">
                  <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد شمامسة</h3>
                  <p className="text-gray-500 font-cairo">لم يتم إضافة أي شمامسة بعد</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Parents Tab */}
        {activeTab === 'parents' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parents.map((parent) => (
                <div key={parent.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(parent);
                          setShowUserForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(parent.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <UsersIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="text-right mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                      {parent.firstName} {parent.lastName}
                    </h3>
                    <p className="text-gray-600 font-cairo text-sm mb-2">
                      {parent.email}
                    </p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      ولي أمر
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {parent.parentInfo && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600 font-cairo mb-2">عدد الأطفال</p>
                        <p className="font-medium text-green-800 font-cairo">
                          {parent.parentInfo.children.length} طفل
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                        parent.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {parent.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                        <span>{parent.isActive ? 'نشط' : 'غير نشط'}</span>
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
          <div className="p-6">
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => {
                const deacon = users.find(u => u.id === assignment.deaconId);
                const level = levels.find(l => l.id === assignment.levelId);
                
                return (
                  <div key={assignment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(assignment);
                              setShowAssignmentForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAssignment(assignment.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-3 space-x-reverse mb-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                              {getStatusLabel(assignment.status)}
                            </span>
                            <span className="text-sm text-gray-500 font-cairo">{assignment.academicYear}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 font-cairo mb-1">
                            {deacon?.firstName} {deacon?.lastName}
                          </h3>
                          <p className="text-gray-600 font-cairo">
                            {level?.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-2">
                            <span className="text-lg font-bold text-amber-600">{assignment.progress}%</span>
                          </div>
                          <p className="text-sm text-gray-600 font-cairo">التقدم</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <AcademicCapIcon className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-300"
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
          allowedRoles={['deacon', 'parent']}
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

export default DeaconParentManagement;