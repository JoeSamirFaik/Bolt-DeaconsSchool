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
  PhoneIcon,
  BriefcaseIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User, LevelAssignment, AcademicYear, CreateLevelAssignmentRequest } from '../../types/user';
import { usersApi, levelAssignmentsApi, academicYearsApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';
import UserForm from './UserForm';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '40px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '8px',
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
    padding: '8px 12px',
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
  
  // Modal states
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<LevelAssignment | null>(null);

  // Assignment form state
  const [assignmentForm, setAssignmentForm] = useState<CreateLevelAssignmentRequest>({
    deaconId: '',
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

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAssignment) {
        await levelAssignmentsApi.update(editingAssignment.id, assignmentForm);
      } else {
        await levelAssignmentsApi.create(assignmentForm);
      }
      setAssignmentForm({
        deaconId: '',
        levelId: '',
        academicYear: '',
        startDate: '',
        expectedEndDate: '',
        notes: ''
      });
      setEditingAssignment(null);
      loadData();
    } catch (error) {
      console.error('Error saving assignment:', error);
    }
  };

  const handleEditAssignment = (assignment: LevelAssignment) => {
    setEditingAssignment(assignment);
    setAssignmentForm({
      deaconId: assignment.deaconId,
      levelId: assignment.levelId,
      academicYear: assignment.academicYear,
      startDate: assignment.startDate,
      expectedEndDate: assignment.expectedEndDate,
      notes: assignment.notes || ''
    });
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
              setEditingUser(null);
              setShowUserForm(true);
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
            <CalendarIcon className="w-4 h-4" />
            <span>تكليفات المستويات</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Deacons Tab */}
        {activeTab === 'deacons' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الإجراءات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      المستوى الحالي
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      تاريخ التسجيل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      البريد الإلكتروني
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
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
                              setEditingUser(deacon);
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
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                            <AcademicCapIcon className="w-4 h-4 text-amber-600" />
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الإجراءات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      عدد الأطفال
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      المهنة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      رقم الهاتف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      البريد الإلكتروني
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                      الاسم
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parents.map((parent, index) => (
                    <tr key={parent.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingUser(parent);
                              setShowUserForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="تعديل"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(parent.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium space-x-1 space-x-reverse ${
                          parent.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {parent.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{parent.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <UsersIcon className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-900 font-cairo">
                            {parent.parentInfo?.children.length || 0} طفل
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <BriefcaseIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900 font-cairo">
                            {parent.parentInfo?.occupation || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900 font-cairo">
                            {parent.parentInfo?.phone || '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-cairo">{parent.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900 font-cairo">
                              {parent.firstName} {parent.lastName}
                            </div>
                            <div className="text-xs text-gray-500 font-cairo">ولي أمر</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {parents.length === 0 && (
                <div className="text-center py-12">
                  <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد أولياء أمور</h3>
                  <p className="text-gray-500 font-cairo">لم يتم إضافة أي أولياء أمور بعد</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assignment Form */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 sticky top-6">
                  <h3 className="text-lg font-bold text-amber-900 mb-4 font-cairo">
                    {editingAssignment ? 'تعديل التكليف' : 'تكليف جديد'}
                  </h3>
                  
                  <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                        الشماس *
                      </label>
                      <Select
                        value={assignmentForm.deaconId ? 
                          { value: assignmentForm.deaconId, label: deacons.find(d => d.id === assignmentForm.deaconId)?.firstName + ' ' + deacons.find(d => d.id === assignmentForm.deaconId)?.lastName } : 
                          null
                        }
                        onChange={(option) => {
                          setAssignmentForm({ ...assignmentForm, deaconId: option ? option.value : '' });
                        }}
                        options={deacons.map(deacon => ({ 
                          value: deacon.id, 
                          label: `${deacon.firstName} ${deacon.lastName}` 
                        }))}
                        styles={customSelectStyles}
                        placeholder="اختر الشماس"
                        isSearchable={true}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                        المستوى *
                      </label>
                      <Select
                        value={assignmentForm.levelId ? 
                          { value: assignmentForm.levelId, label: levels.find(l => l.id === assignmentForm.levelId)?.name } : 
                          null
                        }
                        onChange={(option) => {
                          setAssignmentForm({ ...assignmentForm, levelId: option ? option.value : '' });
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
                      <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                        السنة الأكاديمية *
                      </label>
                      <Select
                        value={assignmentForm.academicYear ? 
                          { value: assignmentForm.academicYear, label: assignmentForm.academicYear } : 
                          null
                        }
                        onChange={(option) => {
                          setAssignmentForm({ ...assignmentForm, academicYear: option ? option.value : '' });
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

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                          تاريخ البداية *
                        </label>
                        <input
                          type="date"
                          value={assignmentForm.startDate}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, startDate: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                          تاريخ الانتهاء *
                        </label>
                        <input
                          type="date"
                          value={assignmentForm.expectedEndDate}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, expectedEndDate: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-700 mb-2 text-right font-cairo">
                        ملاحظات
                      </label>
                      <textarea
                        value={assignmentForm.notes}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo resize-none bg-white"
                        placeholder="ملاحظات إضافية..."
                      />
                    </div>

                    <div className="flex space-x-3 space-x-reverse">
                      {editingAssignment && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAssignment(null);
                            setAssignmentForm({
                              deaconId: '',
                              levelId: '',
                              academicYear: '',
                              startDate: '',
                              expectedEndDate: '',
                              notes: ''
                            });
                          }}
                          className="flex-1 px-4 py-2 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors font-medium"
                        >
                          إلغاء
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors font-medium"
                      >
                        {editingAssignment ? 'تحديث' : 'إضافة'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Assignments List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {assignments.map((assignment) => {
                    const deacon = users.find(u => u.id === assignment.deaconId);
                    const level = levels.find(l => l.id === assignment.levelId);
                    
                    return (
                      <div key={assignment.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="flex space-x-2 space-x-reverse">
                              <button
                                onClick={() => handleEditAssignment(assignment)}
                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="تعديل"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAssignment(assignment.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="حذف"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                                  {getStatusLabel(assignment.status)}
                                </span>
                                <span className="text-sm text-gray-500 font-cairo">{assignment.academicYear}</span>
                              </div>
                              <h4 className="text-lg font-semibold text-gray-900 font-cairo mb-1">
                                {deacon?.firstName} {deacon?.lastName}
                              </h4>
                              <p className="text-gray-600 font-cairo text-sm">
                                {level?.name}
                              </p>
                              <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500 mt-2">
                                <span>{new Date(assignment.startDate).toLocaleDateString('ar-EG')}</span>
                                <span>-</span>
                                <span>{new Date(assignment.expectedEndDate).toLocaleDateString('ar-EG')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-2">
                              <span className="text-sm font-bold text-amber-600">{assignment.progress}%</span>
                            </div>
                            <div className="w-16 bg-gray-200 rounded-full h-1">
                              <div
                                className="h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                                style={{ width: `${assignment.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {assignments.length === 0 && (
                    <div className="text-center py-12">
                      <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد تكليفات</h3>
                      <p className="text-gray-500 font-cairo">لم يتم إنشاء أي تكليفات بعد</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          users={users}
          allowedRoles={['deacon', 'parent']}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
          }}
          onSave={() => {
            setShowUserForm(false);
            setEditingUser(null);
            loadData();
          }}
        />
      )}
    </div>
  );
};

export default DeaconParentManagement;