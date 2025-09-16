import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { Session, AttendanceSession, Attendance } from '../../types/attendance';
import { User } from '../../types/user';
import { Level } from '../../types/lms';
import { sessionsApi, attendanceSessionsApi, attendanceApi } from '../../services/attendanceApi';
import { usersApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import SessionForm from './SessionForm';
import AttendanceForm from './AttendanceForm';
import CalendarView from './CalendarView';

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

const AttendanceManagement: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'calendar' | 'sessions' | 'attendance'>('calendar');
  
  // Filters
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
  // Modal states
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [selectedSessionForAttendance, setSelectedSessionForAttendance] = useState<Session | null>(null);
  const [showingAttendanceView, setShowingAttendanceView] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsData, attendanceSessionsData, usersData, levelsData] = await Promise.all([
        sessionsApi.getAll(),
        attendanceSessionsApi.getAll(),
        usersApi.getAll(),
        levelsApi.getAll()
      ]);
      setSessions(sessionsData);
      setAttendanceSessions(attendanceSessionsData);
      setUsers(usersData);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الجلسة؟')) {
      try {
        await sessionsApi.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleTakeAttendance = (session: Session) => {
    setSelectedSessionForAttendance(session);
    setShowingAttendanceView(true);
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'درس';
      case 'event': return 'فعالية';
      case 'trip': return 'رحلة';
      case 'meeting': return 'اجتماع';
      case 'other': return 'أخرى';
      default: return type;
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'trip': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (selectedDate && session.date !== selectedDate) return false;
    if (selectedType && session.type !== selectedType) return false;
    if (selectedLevel && !session.levelIds.includes(selectedLevel)) return false;
    return true;
  });

  const filteredAttendanceSessions = attendanceSessions.filter(session => {
    if (selectedDate && session.date !== selectedDate) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل إدارة الحضور...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Show Attendance View if active */}
      {showingAttendanceView && selectedSessionForAttendance ? (
        <AttendanceForm
          session={selectedSessionForAttendance}
          deacons={users.filter(u => u.role === 'deacon')}
          levels={levels}
          onClose={() => {
            setShowingAttendanceView(false);
            setSelectedSessionForAttendance(null);
          }}
          onSave={() => {
            setShowingAttendanceView(false);
            setSelectedSessionForAttendance(null);
            loadData();
          }}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            {/* Left side - Action Button (only for sessions tab) */}
            {activeTab === 'sessions' && (
              <button
                onClick={() => {
                  setEditingSession(null);
                  setShowSessionForm(true);
                }}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
              >
                <PlusIcon className="w-5 h-5" />
                <span>إضافة جلسة</span>
              </button>
            )}
            
            {/* Right side - Title & Description */}
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة الحضور</h1>
              <p className="text-gray-600 font-cairo">إدارة الجلسات والفعاليات وتسجيل الحضور</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
                activeTab === 'calendar'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>التقويم</span>
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
                activeTab === 'sessions'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>الجلسات والفعاليات</span>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
                activeTab === 'attendance'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              <span>سجلات الحضور</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 font-cairo">تصفية البيانات</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  التاريخ
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                />
              </div>
              
              {activeTab === 'sessions' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      نوع الجلسة
                    </label>
                    <Select
                      value={selectedType ? { value: selectedType, label: getSessionTypeLabel(selectedType) } : null}
                      onChange={(option) => setSelectedType(option ? option.value : '')}
                      options={[
                        { value: '', label: '-- جميع الأنواع --' },
                        { value: 'lesson', label: 'درس' },
                        { value: 'event', label: 'فعالية' },
                        { value: 'trip', label: 'رحلة' },
                        { value: 'meeting', label: 'اجتماع' },
                        { value: 'other', label: 'أخرى' }
                      ]}
                      styles={customSelectStyles}
                      placeholder="-- اختر النوع --"
                      isSearchable={false}
                      isClearable
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      المستوى
                    </label>
                    <Select
                      value={selectedLevel ? { value: selectedLevel, label: levels.find(l => l.id === selectedLevel)?.name } : null}
                      onChange={(option) => setSelectedLevel(option ? option.value : '')}
                      options={[
                        { value: '', label: '-- جميع المستويات --' },
                        ...levels.map(level => ({ value: level.id, label: level.name }))
                      ]}
                      styles={customSelectStyles}
                      placeholder="-- اختر المستوى --"
                      isSearchable={false}
                      isClearable
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="p-6">
                <CalendarView />
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSessions.map((session) => {
                    const instructor = users.find(u => u.id === session.instructorId);
                    const sessionLevels = levels.filter(l => session.levelIds.includes(l.id));
                    
                    return (
                      <div key={session.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-amber-600" />
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingSession(session);
                                setShowSessionForm(true);
                              }}
                              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSession(session.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 font-cairo">
                              {session.name}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getSessionTypeColor(session.type)}`}>
                              {getSessionTypeLabel(session.type)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm font-cairo mb-3">
                            {session.description}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 font-cairo">{session.date}</span>
                            <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                              <span className="font-cairo">{session.startTime} - {session.endTime}</span>
                              <ClockIcon className="w-4 h-4" />
                            </div>
                          </div>
                          
                          {session.location && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 font-cairo">{session.location}</span>
                              <MapPinIcon className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                          
                          {instructor && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500 font-cairo">{instructor.firstName} {instructor.lastName}</span>
                              <span className="text-gray-400 font-cairo">المدرس</span>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {sessionLevels.map(level => (
                                <span key={level.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-cairo">
                                  {level.name}
                                </span>
                              ))}
                            </div>
                            {session.isRecurring && (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-cairo">
                                متكرر
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {filteredSessions.length === 0 && (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد جلسات</h3>
                    <p className="text-gray-500 font-cairo">لم يتم إضافة أي جلسات بعد</p>
                  </div>
                )}
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="p-6">
                <div className="space-y-4">
                  {filteredAttendanceSessions.map((attendanceSession) => {
                    const session = sessions.find(s => s.id === attendanceSession.sessionId);
                    const attendanceRate = attendanceSession.totalExpected > 0 
                      ? Math.round((attendanceSession.attendanceCount / attendanceSession.totalExpected) * 100)
                      : 0;
                    
                    return (
                      <div key={attendanceSession.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="text-right">
                              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAttendanceStatusColor(attendanceSession.status)}`}>
                                  {attendanceSession.status === 'completed' ? 'مكتمل' :
                                   attendanceSession.status === 'in_progress' ? 'جاري' :
                                   attendanceSession.status === 'scheduled' ? 'مجدول' : 'ملغي'}
                                </span>
                                <span className="text-sm text-gray-500 font-cairo">{attendanceSession.date}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 font-cairo mb-1">
                                {session?.name}
                              </h3>
                              <p className="text-gray-600 text-sm font-cairo">
                                {attendanceSession.startTime} - {attendanceSession.endTime}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 space-x-reverse">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-2">
                                <span className="text-lg font-bold text-green-600">{attendanceRate}%</span>
                              </div>
                              <p className="text-xs text-gray-600 font-cairo">نسبة الحضور</p>
                            </div>
                            
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-2">
                                <span className="text-lg font-bold text-blue-600">
                                  {attendanceSession.attendanceCount}/{attendanceSession.totalExpected}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 font-cairo">الحضور</p>
                            </div>
                            
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                              <UsersIcon className="w-6 h-6 text-amber-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {filteredAttendanceSessions.length === 0 && (
                  <div className="text-center py-12">
                    <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد سجلات حضور</h3>
                    <p className="text-gray-500 font-cairo">لم يتم تسجيل أي حضور بعد</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Session Form Modal */}
          {showSessionForm && (
            <SessionForm
              session={editingSession}
              users={users.filter(u => u.role === 'servant' || u.role === 'admin')}
              levels={levels}
              onClose={() => {
                setShowSessionForm(false);
                setEditingSession(null);
              }}
              onSave={() => {
                setShowSessionForm(false);
                setEditingSession(null);
                loadData();
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceManagement;