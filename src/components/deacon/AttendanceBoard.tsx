import React, { useState, useEffect } from 'react';
import { 
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FireIcon,
  TrophyIcon,
  ChartBarIcon,
  MapPinIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Session, Attendance, AttendanceStats } from '../../types/attendance';
import { sessionsApi, attendanceApi } from '../../services/attendanceApi';

interface AttendanceRecord {
  session: Session;
  attendance?: Attendance;
  date: string;
}

interface LiturgyEntry {
  id: string;
  date: string;
  liturgyType: string;
  location: string;
  notes?: string;
  createdAt: string;
}

const AttendanceBoard: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [liturgyEntries, setLiturgyEntries] = useState<LiturgyEntry[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.
  const [showAddLiturgy, setShowAddLiturgy] = useState(false);
  const [newLiturgy, setNewLiturgy] = useState({
    date: '',
    liturgyType: '',
    location: '',
    notes: ''
  });

  // Mock liturgy entries
  const mockLiturgyEntries: LiturgyEntry[] = [
    {
      id: '1',
      date: '2024-12-08',
      liturgyType: 'قداس الأحد',
      location: 'الكنيسة الرئيسية',
      notes: 'خدمة في الشماسية',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      date: '2024-12-15',
      liturgyType: 'قداس الأحد',
      location: 'الكنيسة الرئيسية',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      date: '2024-12-22',
      liturgyType: 'قداس الأحد',
      location: 'الكنيسة الرئيسية',
      notes: 'قراءة الإنجيل',
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    if (user?.role === 'deacon') {
      loadAttendanceData();
    }
  }, [user]);

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      const [sessionsData, attendanceData, statsData] = await Promise.all([
        sessionsApi.getAll(),
        attendanceApi.getByDeaconId(user!.id),
        attendanceApi.getStats(user!.id)
      ]);
      
      setSessions(sessionsData);
      setAttendance(attendanceData);
      setStats(statsData);
      setLiturgyEntries(mockLiturgyEntries);
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeekDates = (weekOffset: number = 0) => {
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay() + (weekOffset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getWeekAttendanceRecords = (weekOffset: number = 0): AttendanceRecord[] => {
    const weekDates = getWeekDates(weekOffset);
    const records: AttendanceRecord[] = [];
    
    weekDates.forEach(date => {
      const dateStr = date.toISOString().split('T')[0];
      
      // Add sessions for this date
      const daySessions = sessions.filter(s => s.date === dateStr);
      daySessions.forEach(session => {
        const sessionAttendance = attendance.find(a => 
          a.sessionId === session.id && a.date === dateStr
        );
        records.push({
          session,
          attendance: sessionAttendance,
          date: dateStr
        });
      });
      
      // Add liturgy entries for this date
      const dayLiturgy = liturgyEntries.filter(l => l.date === dateStr);
      dayLiturgy.forEach(liturgy => {
        const mockSession: Session = {
          id: `liturgy-${liturgy.id}`,
          name: liturgy.liturgyType,
          description: liturgy.notes || 'خدمة ليتورجية',
          type: 'other',
          date: liturgy.date,
          startTime: '09:00',
          endTime: '11:00',
          location: liturgy.location,
          levelIds: [],
          isRecurring: false,
          isActive: true,
          createdAt: liturgy.createdAt,
          updatedAt: liturgy.createdAt
        };
        
        const mockAttendance: Attendance = {
          id: `liturgy-attendance-${liturgy.id}`,
          sessionId: mockSession.id,
          deaconId: user!.id,
          date: liturgy.date,
          status: 'present',
          takenBy: user!.id,
          createdAt: liturgy.createdAt,
          updatedAt: liturgy.createdAt
        };
        
        records.push({
          session: mockSession,
          attendance: mockAttendance,
          date: dateStr
        });
      });
    });
    
    return records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'late':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'excused':
        return <ExclamationTriangleIcon className="w-5 h-5 text-blue-600" />;
      case 'absent':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'late':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'excused':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'absent':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'late': return 'متأخر';
      case 'excused': return 'معذور';
      case 'absent': return 'غائب';
      default: return 'غير محدد';
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'event': return '🎉';
      case 'trip': return '🚌';
      case 'meeting': return '👥';
      case 'other': return '⛪';
      default: return '📅';
    }
  };

  const handleAddLiturgy = () => {
    if (!newLiturgy.date || !newLiturgy.liturgyType || !newLiturgy.location) return;
    
    const liturgyEntry: LiturgyEntry = {
      id: Math.random().toString(36).substr(2, 9),
      date: newLiturgy.date,
      liturgyType: newLiturgy.liturgyType,
      location: newLiturgy.location,
      notes: newLiturgy.notes,
      createdAt: new Date().toISOString()
    };
    
    setLiturgyEntries(prev => [...prev, liturgyEntry]);
    setNewLiturgy({ date: '', liturgyType: '', location: '', notes: '' });
    setShowAddLiturgy(false);
  };

  const calculateStreak = () => {
    // Calculate current attendance streak
    const sortedRecords = getWeekAttendanceRecords(0)
      .concat(getWeekAttendanceRecords(-1))
      .concat(getWeekAttendanceRecords(-2))
      .filter(r => r.attendance?.status === 'present')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (const record of sortedRecords) {
      if (record.date <= today) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const currentWeekRecords = getWeekAttendanceRecords(selectedWeek);
  const weekDates = getWeekDates(selectedWeek);
  const streak = calculateStreak();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل سجل الحضور...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="text-right">
            <h1 className="text-2xl font-bold font-cairo mb-2">سجل الحضور التفاعلي</h1>
            <p className="text-blue-100 font-cairo">تتبع حضورك وحافظ على التزامك</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <FireIcon className="w-5 h-5 text-orange-300" />
              <span className="text-2xl font-bold">{streak}</span>
            </div>
            <p className="text-sm text-blue-100 font-cairo">أيام متتالية</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-300" />
              <span className="text-2xl font-bold">{stats?.attendanceRate || 0}%</span>
            </div>
            <p className="text-sm text-blue-100 font-cairo">نسبة الحضور</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <CalendarIcon className="w-5 h-5 text-blue-300" />
              <span className="text-2xl font-bold">{stats?.attendedSessions || 0}</span>
            </div>
            <p className="text-sm text-blue-100 font-cairo">جلسات حضرتها</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
              <TrophyIcon className="w-5 h-5 text-yellow-300" />
              <span className="text-2xl font-bold">{liturgyEntries.length}</span>
            </div>
            <p className="text-sm text-blue-100 font-cairo">قداسات حضرتها</p>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={() => setSelectedWeek(selectedWeek - 1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-600">←</span>
            </button>
            <button
              onClick={() => setSelectedWeek(selectedWeek + 1)}
              disabled={selectedWeek >= 0}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-gray-600">→</span>
            </button>
          </div>
          
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900 font-cairo">
              {selectedWeek === 0 ? 'هذا الأسبوع' : 
               selectedWeek === -1 ? 'الأسبوع الماضي' : 
               `منذ ${Math.abs(selectedWeek)} أسابيع`}
            </h2>
            <p className="text-gray-600 font-cairo">
              {weekDates[0].toLocaleDateString('ar-EG')} - {weekDates[6].toLocaleDateString('ar-EG')}
            </p>
          </div>
        </div>

        {/* Weekly Timeline */}
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, dayIndex) => {
            const dateStr = date.toISOString().split('T')[0];
            const dayRecords = currentWeekRecords.filter(r => r.date === dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            
            return (
              <div
                key={dayIndex}
                className={`border-2 rounded-xl p-3 min-h-32 transition-all duration-300 hover:shadow-md ${
                  isToday ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                {/* Day Header */}
                <div className="text-center mb-3">
                  <div className={`text-sm font-bold font-cairo mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {weekDays[dayIndex]}
                  </div>
                  <div className={`text-lg font-bold ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                </div>

                {/* Day Records */}
                <div className="space-y-2">
                  {dayRecords.map((record, recordIndex) => (
                    <div
                      key={recordIndex}
                      className={`p-2 rounded-lg border text-xs transition-all duration-200 hover:scale-105 ${
                        getStatusColor(record.attendance?.status)
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        {getStatusIcon(record.attendance?.status)}
                        <div className="text-right flex-1 mr-1">
                          <div className="font-medium font-cairo truncate">
                            {getSessionTypeIcon(record.session.type)} {record.session.name}
                          </div>
                          <div className="opacity-75 font-cairo">
                            {record.session.startTime}
                          </div>
                        </div>
                      </div>
                      {record.session.location && (
                        <div className="flex items-center space-x-1 space-x-reverse opacity-75">
                          <MapPinIcon className="w-3 h-3" />
                          <span className="font-cairo truncate">{record.session.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {dayRecords.length === 0 && (
                    <div className="text-center py-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full mx-auto mb-1"></div>
                      <span className="text-xs text-gray-400 font-cairo">لا توجد أنشطة</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Liturgy Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowAddLiturgy(!showAddLiturgy)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-4 h-4" />
            <span>إضافة قداس حضرته</span>
          </button>
          
          <div className="text-right">
            <h3 className="text-lg font-bold text-gray-900 font-cairo">سجل القداسات الشخصي</h3>
            <p className="text-gray-600 font-cairo">أضف القداسات التي حضرتها خارج جدول المدرسة</p>
          </div>
        </div>

        {/* Add Liturgy Form */}
        {showAddLiturgy && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  التاريخ *
                </label>
                <input
                  type="date"
                  value={newLiturgy.date}
                  onChange={(e) => setNewLiturgy({...newLiturgy, date: e.target.value})}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  نوع القداس *
                </label>
                <select
                  value={newLiturgy.liturgyType}
                  onChange={(e) => setNewLiturgy({...newLiturgy, liturgyType: e.target.value})}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                >
                  <option value="">اختر نوع القداس</option>
                  <option value="قداس الأحد">قداس الأحد</option>
                  <option value="قداس الأعياد">قداس الأعياد</option>
                  <option value="قداس الجمعة">قداس الجمعة</option>
                  <option value="قداس خاص">قداس خاص</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  المكان *
                </label>
                <input
                  type="text"
                  value={newLiturgy.location}
                  onChange={(e) => setNewLiturgy({...newLiturgy, location: e.target.value})}
                  placeholder="مثال: الكنيسة الرئيسية"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                  ملاحظات
                </label>
                <input
                  type="text"
                  value={newLiturgy.notes}
                  onChange={(e) => setNewLiturgy({...newLiturgy, notes: e.target.value})}
                  placeholder="مثال: خدمة في الشماسية"
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 space-x-reverse mt-4">
              <button
                onClick={() => setShowAddLiturgy(false)}
                className="flex-1 px-4 py-2 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddLiturgy}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-colors font-medium"
              >
                إضافة القداس
              </button>
            </div>
          </div>
        )}

        {/* Recent Liturgy Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liturgyEntries.slice(-6).map((liturgy) => (
            <div key={liturgy.id} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-purple-600 font-cairo bg-purple-100 px-2 py-1 rounded-full">
                  {new Date(liturgy.date).toLocaleDateString('ar-EG')}
                </span>
                <div className="text-2xl">⛪</div>
              </div>
              <h4 className="font-bold text-purple-900 font-cairo mb-1">{liturgy.liturgyType}</h4>
              <p className="text-sm text-purple-700 font-cairo mb-2">{liturgy.location}</p>
              {liturgy.notes && (
                <p className="text-xs text-purple-600 font-cairo bg-white/50 px-2 py-1 rounded">
                  {liturgy.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          {streak >= 7 ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="text-xl font-bold text-green-900 font-cairo mb-2">
                رائع! {streak} أيام متتالية من الحضور!
              </h3>
              <p className="text-green-700 font-cairo">
                أنت تحقق تقدماً ممتازاً. استمر في هذا الالتزام الرائع!
              </p>
            </div>
          ) : streak >= 3 ? (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold text-orange-900 font-cairo mb-2">
                أحسنت! {streak} أيام متتالية
              </h3>
              <p className="text-orange-700 font-cairo">
                أنت على الطريق الصحيح. حاول الوصول إلى 7 أيام متتالية!
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="text-xl font-bold text-blue-900 font-cairo mb-2">
                ابدأ رحلتك!
              </h3>
              <p className="text-blue-700 font-cairo">
                احضر الجلسات والقداسات بانتظام لبناء سجل حضور قوي.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Attendance History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">سجل الحضور التفصيلي</h3>
        
        <div className="space-y-3">
          {currentWeekRecords.length > 0 ? (
            currentWeekRecords.map((record, index) => (
              <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                getStatusColor(record.attendance?.status)
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getStatusIcon(record.attendance?.status)}
                    <div className="text-right">
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <span className="text-lg">{getSessionTypeIcon(record.session.type)}</span>
                        <h4 className="font-bold text-gray-900 font-cairo">{record.session.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 font-cairo">{record.session.description}</p>
                      <div className="flex items-center space-x-4 space-x-reverse mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1 space-x-reverse">
                          <ClockIcon className="w-3 h-3" />
                          <span>{record.session.startTime} - {record.session.endTime}</span>
                        </span>
                        {record.session.location && (
                          <span className="flex items-center space-x-1 space-x-reverse">
                            <MapPinIcon className="w-3 h-3" />
                            <span>{record.session.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900 font-cairo mb-1">
                      {new Date(record.date).toLocaleDateString('ar-EG')}
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      getStatusColor(record.attendance?.status)
                    }`}>
                      {getStatusLabel(record.attendance?.status)}
                    </span>
                    {record.attendance?.arrivalTime && (
                      <div className="text-xs text-gray-500 font-cairo mt-1">
                        وصل: {record.attendance.arrivalTime}
                      </div>
                    )}
                  </div>
                </div>
                
                {record.attendance?.notes && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-cairo">
                      <strong>ملاحظات:</strong> {record.attendance.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد أنشطة هذا الأسبوع</h4>
              <p className="text-gray-500 font-cairo">لم يتم جدولة أي جلسات أو فعاليات لهذا الأسبوع</p>
            </div>
          )}
        </div>
      </div>

      {/* Encouragement Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-sm border border-amber-200 p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-amber-900 font-cairo mb-3">هدفك القادم</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-600 mb-1">7</div>
              <p className="text-sm text-amber-800 font-cairo">أيام متتالية</p>
            </div>
            <div className="bg-white/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-600 mb-1">95%</div>
              <p className="text-sm text-orange-800 font-cairo">نسبة حضور</p>
            </div>
            <div className="bg-white/80 rounded-xl p-4">
              <div className="text-2xl font-bold text-red-600 mb-1">20</div>
              <p className="text-sm text-red-800 font-cairo">جلسة في الشهر</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBoard;