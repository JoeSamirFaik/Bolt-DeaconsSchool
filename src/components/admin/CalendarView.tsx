import React, { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Session } from '../../types/attendance';
import { User } from '../../types/user';
import { Level } from '../../types/lms';
import { sessionsApi } from '../../services/attendanceApi';
import { usersApi } from '../../services/userApi';
import { levelsApi } from '../../services/lmsApi';
import SessionForm from './SessionForm';
import AttendanceForm from './AttendanceForm';

interface CalendarViewProps {
}

const CalendarView: React.FC<CalendarViewProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [currentDate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      const [sessionsData, usersData, levelsData] = await Promise.all([
        sessionsApi.getByDateRange(
          startOfMonth.toISOString().split('T')[0],
          endOfMonth.toISOString().split('T')[0]
        ),
        usersApi.getAll(),
        levelsApi.getAll()
      ]);
      
      setSessions(sessionsData);
      setUsers(usersData);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeAttendance = (session: Session) => {
    setSelectedSession(session);
    setShowAttendanceForm(true);
  };

  const handleAddSession = (date: string) => {
    setSelectedDate(date);
    setSelectedSession(null);
    setShowSessionForm(true);
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-500 border-blue-600';
      case 'event': return 'bg-green-500 border-green-600';
      case 'trip': return 'bg-purple-500 border-purple-600';
      case 'meeting': return 'bg-orange-500 border-orange-600';
      case 'other': return 'bg-gray-500 border-gray-600';
      default: return 'bg-gray-500 border-gray-600';
    }
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

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateStr = currentDateObj.toISOString().split('T')[0];
      const dayNumber = currentDateObj.getDate();
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const isToday = currentDateObj.toDateString() === new Date().toDateString();
      const daySessions = sessions.filter(s => s.date === dateStr);
      
      days.push({
        date: dateStr,
        dayNumber,
        isCurrentMonth,
        isToday,
        sessions: daySessions
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const calendarDays = generateCalendarDays();

  if (showAttendanceForm && selectedSession) {
    return (
      <AttendanceForm
        session={selectedSession}
        deacons={users.filter(u => u.role === 'deacon')}
        levels={levels}
        onClose={() => {
          setShowAttendanceForm(false);
          setSelectedSession(null);
        }}
        onSave={() => {
          setShowAttendanceForm(false);
          setSelectedSession(null);
          loadData();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 font-cairo">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">تقويم الجلسات والفعاليات</h1>
            <p className="text-gray-600 font-cairo">إدارة الجلسات وتسجيل الحضور</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
          <div className="grid grid-cols-7 gap-0">
            {dayNames.map((day) => (
              <div key={day} className="p-4 text-center">
                <span className="text-sm font-semibold text-gray-700 font-cairo">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-32 border-b border-r border-gray-100 p-2 relative group hover:bg-gray-50 transition-colors ${
                !day.isCurrentMonth ? 'bg-gray-25 text-gray-400' : ''
              } ${day.isToday ? 'bg-blue-50' : ''}`}
            >
              {/* Day Number */}
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => handleAddSession(day.date)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-amber-100 rounded transition-all duration-200"
                  title="إضافة جلسة"
                >
                  <PlusIcon className="w-4 h-4 text-amber-600" />
                </button>
                <span className={`text-sm font-medium font-cairo ${
                  day.isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''
                }`}>
                  {day.dayNumber}
                </span>
              </div>

              {/* Sessions */}
              <div className="space-y-1">
                {day.sessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className={`text-xs p-2 rounded-lg text-white cursor-pointer hover:opacity-80 transition-opacity ${getSessionTypeColor(session.type)}`}
                    onClick={() => handleTakeAttendance(session)}
                    title={`${session.name} - ${session.startTime}`}
                  >
                    <div className="flex items-center justify-between">
                      <UsersIcon className="w-3 h-3" />
                      <div className="text-right flex-1 mr-1">
                        <div className="font-medium truncate font-cairo">{session.name}</div>
                        <div className="opacity-75 font-cairo">{session.startTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {day.sessions.length > 3 && (
                  <div className="text-xs text-gray-500 text-center font-cairo">
                    +{day.sessions.length - 3} أخرى
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right font-cairo">دليل الألوان</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm text-gray-700 font-cairo">درس</span>
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm text-gray-700 font-cairo">فعالية</span>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm text-gray-700 font-cairo">رحلة</span>
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm text-gray-700 font-cairo">اجتماع</span>
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <span className="text-sm text-gray-700 font-cairo">أخرى</span>
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
          </div>
        </div>
      </div>

      {/* Session Form Modal */}
      {showSessionForm && (
        <SessionForm
          session={selectedSession}
          users={users.filter(u => u.role === 'servant' || u.role === 'admin')}
          levels={levels}
          onClose={() => {
            setShowSessionForm(false);
            setSelectedSession(null);
            setSelectedDate('');
          }}
          onSave={() => {
            setShowSessionForm(false);
            setSelectedSession(null);
            setSelectedDate('');
            loadData();
          }}
        />
      )}
    </div>
  );
};

export default CalendarView;