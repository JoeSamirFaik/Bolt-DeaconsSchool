import React, { useState, useEffect } from 'react';
import { 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FireIcon,
  TrophyIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

interface AttendanceRecord {
  id: string;
  date: string;
  sessionName: string;
  sessionType: 'lesson' | 'event' | 'trip' | 'meeting' | 'liturgy';
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  location?: string;
  notes?: string;
  isUserAdded?: boolean;
}

interface LiturgyForm {
  date: string;
  liturgyType: string;
  location: string;
  notes: string;
}

interface PrayerForm {
  date: string;
  prayerType: string;
  duration: number;
  location: string;
  notes: string;
}

const AttendanceBoard: React.FC = () => {
  const { user } = useAuth();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLiturgyForm, setShowLiturgyForm] = useState(false);
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [liturgyForm, setLiturgyForm] = useState<LiturgyForm>({
    date: '',
    liturgyType: '',
    location: '',
    notes: ''
  });
  const [prayerForm, setPrayerForm] = useState<PrayerForm>({
    date: '',
    prayerType: '',
    duration: 15,
    location: '',
    notes: ''
  });
  const [totalPoints, setTotalPoints] = useState(850); // Starting points

  // Mock attendance data
  const mockAttendanceRecords: AttendanceRecord[] = [
    // Week 1 (Dec 9-15, 2024)
    { id: '1', date: '2024-12-15', sessionName: 'درس الكتاب المقدس', sessionType: 'lesson', status: 'present', arrivalTime: '10:05', location: 'قاعة الدراسة' },
    { id: '2', date: '2024-12-14', sessionName: 'قداس الأحد', sessionType: 'liturgy', status: 'present', arrivalTime: '09:00', location: 'الكنيسة الكبرى', isUserAdded: true },
    { id: '3', date: '2024-12-12', sessionName: 'درس الألحان', sessionType: 'lesson', status: 'late', arrivalTime: '11:15', location: 'قاعة الموسيقى' },
    
    // Week 2 (Dec 16-22, 2024)
    { id: '4', date: '2024-12-22', sessionName: 'درس تاريخ الكنيسة', sessionType: 'lesson', status: 'present', arrivalTime: '14:00', location: 'قاعة التاريخ' },
    { id: '5', date: '2024-12-21', sessionName: 'قداس السبت', sessionType: 'liturgy', status: 'present', arrivalTime: '18:30', location: 'الكنيسة الصغرى', isUserAdded: true },
    { id: '6', date: '2024-12-20', sessionName: 'رحلة إلى الدير', sessionType: 'trip', status: 'present', arrivalTime: '08:00', location: 'دير الأنبا بيشوي' },
    { id: '7', date: '2024-12-19', sessionName: 'اجتماع الشمامسة', sessionType: 'meeting', status: 'excused', notes: 'مريض' },
    
    // Week 3 (Dec 23-29, 2024)
    { id: '8', date: '2024-12-25', sessionName: 'احتفال عيد الميلاد', sessionType: 'event', status: 'present', arrivalTime: '16:00', location: 'القاعة الكبرى' },
    { id: '9', date: '2024-12-28', sessionName: 'اجتماع أولياء الأمور', sessionType: 'meeting', status: 'absent' },
    { id: '10', date: '2024-12-29', sessionName: 'قداس الأحد', sessionType: 'liturgy', status: 'present', arrivalTime: '09:15', location: 'الكنيسة الكبرى', isUserAdded: true },
    
    // Week 4 (Dec 30 - Jan 5, 2025)
    { id: '11', date: '2025-01-05', sessionName: 'ورشة الألحان', sessionType: 'lesson', status: 'present', arrivalTime: '11:00', location: 'قاعة الموسيقى' },
    { id: '12', date: '2025-01-04', sessionName: 'قداس السبت', sessionType: 'liturgy', status: 'late', arrivalTime: '19:00', location: 'الكنيسة الصغرى', isUserAdded: true },
    { id: '13', date: '2025-01-02', sessionName: 'صلاة رأس السنة', sessionType: 'liturgy', status: 'present', arrivalTime: '23:30', location: 'الكنيسة الكبرى', isUserAdded: true },
    
    // Prayer records
    { id: '14', date: '2024-12-16', sessionName: 'صلاة الصبح', sessionType: 'prayer', status: 'present', arrivalTime: '06:00', location: 'المنزل', isUserAdded: true },
    { id: '15', date: '2024-12-17', sessionName: 'صلاة المساء', sessionType: 'prayer', status: 'present', arrivalTime: '18:30', location: 'المنزل', isUserAdded: true },
    { id: '16', date: '2024-12-18', sessionName: 'صلاة الساعات', sessionType: 'prayer', status: 'present', arrivalTime: '12:00', location: 'العمل', isUserAdded: true },
    { id: '17', date: '2024-12-23', sessionName: 'صلاة التسبيح', sessionType: 'prayer', status: 'present', arrivalTime: '07:00', location: 'المنزل', isUserAdded: true },
    { id: '18', date: '2024-12-30', sessionName: 'صلاة شخصية', sessionType: 'prayer', status: 'present', arrivalTime: '20:00', location: 'المنزل', isUserAdded: true },
    { id: '19', date: '2025-01-03', sessionName: 'صلاة الصبح', sessionType: 'prayer', status: 'present', arrivalTime: '06:15', location: 'المنزل', isUserAdded: true },
    { id: '20', date: '2025-01-06', sessionName: 'صلاة المساء', sessionType: 'prayer', status: 'present', arrivalTime: '19:00', location: 'المنزل', isUserAdded: true },
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setAttendanceRecords(mockAttendanceRecords);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeek(newDate);
  };

  const getAttendanceForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceRecords.filter(record => record.date === dateStr);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'late':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'excused':
        return <ExclamationTriangleIcon className="w-5 h-5 text-blue-600" />;
      case 'absent':
      default:
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'late':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'excused':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'absent':
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'event': return '🎉';
      case 'trip': return '🚌';
      case 'meeting': return '👥';
      case 'liturgy': return '⛪';
      case 'prayer': return '🙏';
      default: return '📅';
    }
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'درس';
      case 'event': return 'فعالية';
      case 'trip': return 'رحلة';
      case 'meeting': return 'اجتماع';
      case 'liturgy': return 'قداس';
      case 'prayer': return 'صلاة';
      default: return type;
    }
  };

  const calculateStats = () => {
    const totalSessions = attendanceRecords.length;
    const presentSessions = attendanceRecords.filter(r => r.status === 'present').length;
    const lateSessions = attendanceRecords.filter(r => r.status === 'late').length;
    const excusedSessions = attendanceRecords.filter(r => r.status === 'excused').length;
    const absentSessions = attendanceRecords.filter(r => r.status === 'absent').length;
    
    const attendanceRate = totalSessions > 0 ? Math.round(((presentSessions + lateSessions) / totalSessions) * 100) : 0;
    
    // Calculate points
    const liturgyPoints = attendanceRecords.filter(r => r.sessionType === 'liturgy' && r.status === 'present').length * 50;
    const prayerPoints = attendanceRecords.filter(r => r.sessionType === 'prayer' && r.status === 'present').length * 25;
    const sessionPoints = attendanceRecords.filter(r => ['lesson', 'event', 'trip', 'meeting'].includes(r.sessionType) && r.status === 'present').length * 30;
    const calculatedPoints = liturgyPoints + prayerPoints + sessionPoints;
    
    // Calculate streak
    const sortedRecords = [...attendanceRecords]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    for (const record of sortedRecords) {
      if (record.status === 'present' || record.status === 'late') {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      totalSessions,
      presentSessions,
      lateSessions,
      excusedSessions,
      absentSessions,
      attendanceRate,
      currentStreak,
      totalPoints: calculatedPoints
    };
  };

  const handleAddLiturgy = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: liturgyForm.date,
      sessionName: `${liturgyForm.liturgyType}`,
      sessionType: 'liturgy',
      status: 'present',
      arrivalTime: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      location: liturgyForm.location,
      notes: liturgyForm.notes,
      isUserAdded: true
    };
    
    setAttendanceRecords(prev => [...prev, newRecord]);
    setLiturgyForm({ date: '', liturgyType: '', location: '', notes: '' });
    setShowLiturgyForm(false);
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: prayerForm.date,
      sessionName: `${prayerForm.prayerType}`,
      sessionType: 'prayer',
      status: 'present',
      arrivalTime: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      location: prayerForm.location,
      notes: `${prayerForm.duration} دقيقة - ${prayerForm.notes}`,
      isUserAdded: true
    };
    
    setAttendanceRecords(prev => [...prev, newRecord]);
    setPrayerForm({ date: '', prayerType: '', duration: 15, location: '', notes: '' });
    setShowPrayerForm(false);
  };

  const weekDates = getWeekDates(currentWeek);
  const stats = calculateStats();
  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل سجل الحضور...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="text-right">
              <h1 className="text-3xl font-bold mb-2 font-cairo">سجل الحضور التفاعلي</h1>
              <p className="text-lg opacity-90 font-cairo">تتبع حضورك وحافظ على انتظامك</p>
            </div>
            
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <FireIcon className="w-6 h-6 text-orange-300" />
                <span className="text-2xl font-bold">{stats.currentStreak}</span>
              </div>
              <p className="text-sm opacity-90 font-cairo">أيام متتالية</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <ChartBarIcon className="w-6 h-6 text-green-300" />
                <span className="text-2xl font-bold">{stats.attendanceRate}%</span>
              </div>
              <p className="text-sm opacity-90 font-cairo">نسبة الحضور</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <CheckCircleIcon className="w-6 h-6 text-blue-300" />
                <span className="text-2xl font-bold">{stats.presentSessions}</span>
              </div>
              <p className="text-sm opacity-90 font-cairo">جلسة حضور</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                <TrophyIcon className="w-6 h-6 text-yellow-300" />
                <span className="text-2xl font-bold">{stats.totalSessions}</span>
              </div>
              <p className="text-sm opacity-90 font-cairo">إجمالي الجلسات</p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-center">
              {stats.currentStreak >= 7 ? (
                <p className="text-lg font-cairo">🔥 رائع! لديك {stats.currentStreak} أيام متتالية من الحضور!</p>
              ) : stats.attendanceRate >= 90 ? (
                <p className="text-lg font-cairo">⭐ ممتاز! نسبة حضورك {stats.attendanceRate}%</p>
              ) : stats.attendanceRate >= 70 ? (
                <p className="text-lg font-cairo">👍 جيد! استمر في المحافظة على الحضور</p>
              ) : (
                <p className="text-lg font-cairo">💪 يمكنك تحسين نسبة حضورك - استمر!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigateWeek('next')}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors hover:scale-110"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => navigateWeek('prev')}
              className="p-3 hover:bg-gray-100 rounded-xl transition-colors hover:scale-110"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-600" />
            </button>
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4">
              <h2 className="text-xl font-bold text-amber-900 font-cairo">
                {weekDates[0].toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
            </div>
          </div>
          
          <div className="text-right">
            <button
              onClick={() => setShowLiturgyForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
            >
              <PlusIcon className="w-5 h-5" />
              <span>إضافة قداس</span>
            </button>
          </div>
        </div>

        {/* Weekly Timeline */}
        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const dayAttendance = getAttendanceForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 min-h-[200px] transition-all duration-300 hover:shadow-lg ${
                  isToday ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                {/* Day Header */}
                <div className="text-center mb-4">
                  <div className={`text-sm font-bold mb-1 font-cairo ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {dayNames[index]}
                  </div>
                  <div className={`text-lg font-bold font-cairo ${
                    isToday ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' : 'text-gray-900'
                  }`}>
                    {date.getDate()}
                  </div>
                </div>

                {/* Attendance Records */}
                <div className="space-y-2">
                  {dayAttendance.map((record) => (
                    <div
                      key={record.id}
                      className={`border rounded-lg p-3 transition-all duration-200 hover:scale-105 ${getStatusColor(record.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {getStatusIcon(record.status)}
                          <span className="text-lg">{getSessionTypeIcon(record.sessionType)}</span>
                        </div>
                        {record.isUserAdded && (
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full font-medium">
                            مُضاف شخصياً
                          </span>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <h4 className="font-bold text-sm font-cairo mb-1">
                          {record.sessionName}
                        </h4>
                        <p className="text-xs opacity-75 font-cairo mb-1">
                          {getSessionTypeLabel(record.sessionType)}
                        </p>
                        {record.arrivalTime && (
                          <p className="text-xs opacity-75 font-cairo">
                            {record.arrivalTime}
                          </p>
                        )}
                        {record.location && (
                          <p className="text-xs opacity-75 font-cairo">
                            📍 {record.location}
                          </p>
                        )}
                        {record.notes && (
                          <p className="text-xs opacity-75 font-cairo mt-1">
                            💬 {record.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {dayAttendance.length === 0 && (
                    <div className="text-center py-4">
                      <div className="text-gray-300 text-2xl mb-2">📅</div>
                      <p className="text-xs text-gray-400 font-cairo">لا توجد جلسات</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.presentSessions}</div>
          <p className="text-sm text-gray-600 font-cairo">حضور كامل</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-2">{stats.lateSessions}</div>
          <p className="text-sm text-gray-600 font-cairo">حضور متأخر</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.excusedSessions}</div>
          <p className="text-sm text-gray-600 font-cairo">غياب بعذر</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <XCircleIcon className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-2">{stats.absentSessions}</div>
          <p className="text-sm text-gray-600 font-cairo">غياب</p>
        </div>
      </div>

      {/* Recent Attendance History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-right font-cairo flex items-center space-x-3 space-x-reverse">
          <ChartBarIcon className="w-6 h-6 text-purple-600" />
          <span>سجل الحضور الأخير</span>
        </h3>
        
        <div className="space-y-4">
          {attendanceRecords
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
            .map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status === 'present' ? 'حاضر' :
                     record.status === 'late' ? 'متأخر' :
                     record.status === 'excused' ? 'معذور' : 'غائب'}
                  </div>
                  {record.isUserAdded && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full font-medium">
                      مُضاف شخصياً
                    </span>
                  )}
                  <div className="text-right">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <span className="text-lg">{getSessionTypeIcon(record.sessionType)}</span>
                      <h4 className="font-semibold text-gray-900 font-cairo">{record.sessionName}</h4>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                      <span className="font-cairo">{new Date(record.date).toLocaleDateString('ar-EG')}</span>
                      {record.arrivalTime && (
                        <span className="font-cairo">⏰ {record.arrivalTime}</span>
                      )}
                      {record.location && (
                        <span className="font-cairo">📍 {record.location}</span>
                      )}
                    </div>
                    {record.notes && (
                      <p className="text-xs text-gray-500 font-cairo mt-1">💬 {record.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getStatusIcon(record.status)}
                  <span className="text-2xl">{getSessionTypeIcon(record.sessionType)}</span>
                </div>
              </div>
            ))}
        </div>
        
        {attendanceRecords.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد سجل حضور</h3>
            <p className="text-gray-500 font-cairo">ابدأ في حضور الجلسات لبناء سجل حضورك</p>
          </div>
        )}
      </div>

      {/* Add Liturgy Modal */}
      {showLiturgyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={() => setShowLiturgyForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-900 font-cairo">إضافة قداس</h2>
                <p className="text-gray-600 text-sm font-cairo">سجل حضورك للقداديس</p>
              </div>
            </div>

            <form onSubmit={handleAddLiturgy} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  التاريخ *
                </label>
                <input
                  type="date"
                  value={liturgyForm.date}
                  onChange={(e) => setLiturgyForm({ ...liturgyForm, date: e.target.value })}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  نوع القداس *
                </label>
                <select
                  value={liturgyForm.liturgyType}
                  onChange={(e) => setLiturgyForm({ ...liturgyForm, liturgyType: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                >
                  <option value="">اختر نوع القداس</option>
                  <option value="قداس الأحد">قداس الأحد</option>
                  <option value="قداس السبت">قداس السبت</option>
                  <option value="قداس الأعياد">قداس الأعياد</option>
                  <option value="قداس خاص">قداس خاص</option>
                  <option value="صلاة باكر">صلاة باكر</option>
                  <option value="صلاة عشية">صلاة عشية</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  المكان *
                </label>
                <input
                  type="text"
                  value={liturgyForm.location}
                  onChange={(e) => setLiturgyForm({ ...liturgyForm, location: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                  placeholder="مثال: الكنيسة الكبرى"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  ملاحظات
                </label>
                <textarea
                  value={liturgyForm.notes}
                  onChange={(e) => setLiturgyForm({ ...liturgyForm, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo resize-none"
                  placeholder="ملاحظات إضافية..."
                />
              </div>

              <div className="flex space-x-3 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowLiturgyForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  إضافة القداس
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-700 font-cairo">قداسات</span>
              <span className="text-lg">⛪</span>
            </div>
            <div className="w-4 h-4 bg-amber-500 rounded shadow-sm"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-gray-700 font-cairo">صلوات</span>
              <span className="text-lg">🙏</span>
            </div>
            <div className="w-4 h-4 bg-indigo-500 rounded shadow-sm"></div>
          </div>
        </div>
        
        {/* Points System Explanation */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
          <h4 className="text-md font-bold text-amber-900 mb-3 text-right font-cairo">نظام النقاط 🏆</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">+50 نقطة</span>
              <span className="text-amber-800 font-cairo">⛪ حضور قداس</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">+25 نقطة</span>
              <span className="text-amber-800 font-cairo">🙏 صلاة شخصية</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">+30 نقطة</span>
              <span className="text-amber-800 font-cairo">📚 حضور جلسة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceBoard;