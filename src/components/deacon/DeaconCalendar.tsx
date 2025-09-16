import React, { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  BookOpenIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface MockSession {
  id: string;
  name: string;
  type: 'lesson' | 'event' | 'trip' | 'meeting';
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
}

const DeaconCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sessions, setSessions] = useState<MockSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock sessions data
  const mockSessions: MockSession[] = [
    {
      id: '1',
      name: 'درس الكتاب المقدس',
      type: 'lesson',
      date: '2024-12-15',
      startTime: '10:00',
      endTime: '11:30',
      location: 'قاعة الدراسة'
    },
    {
      id: '2',
      name: 'رحلة إلى الدير',
      type: 'trip',
      date: '2024-12-20',
      startTime: '08:00',
      endTime: '18:00',
      location: 'دير الأنبا بيشوي'
    },
    {
      id: '3',
      name: 'احتفال عيد الميلاد',
      type: 'event',
      date: '2024-12-25',
      startTime: '16:00',
      endTime: '19:00',
      location: 'القاعة الكبرى'
    },
    {
      id: '4',
      name: 'اجتماع أولياء الأمور',
      type: 'meeting',
      date: '2024-12-28',
      startTime: '18:00',
      endTime: '20:00',
      location: 'قاعة الاجتماعات'
    },
    {
      id: '5',
      name: 'درس تاريخ الكنيسة',
      type: 'lesson',
      date: '2025-01-05',
      startTime: '14:00',
      endTime: '15:30',
      location: 'قاعة التاريخ'
    },
    {
      id: '6',
      name: 'ورشة الألحان',
      type: 'lesson',
      date: '2025-01-08',
      startTime: '11:00',
      endTime: '12:30',
      location: 'قاعة الموسيقى'
    },
    {
      id: '7',
      name: 'رحلة المتحف القبطي',
      type: 'trip',
      date: '2025-01-10',
      startTime: '09:00',
      endTime: '16:00',
      location: 'المتحف القبطي'
    },
    {
      id: '8',
      name: 'مسابقة الكتاب المقدس',
      type: 'event',
      date: '2025-01-18',
      startTime: '17:00',
      endTime: '19:00',
      location: 'القاعة الكبرى'
    },
    {
      id: '9',
      name: 'درس الصلاة والتأمل',
      type: 'lesson',
      date: '2025-01-12',
      startTime: '15:00',
      endTime: '16:00',
      location: 'الكنيسة الصغيرة'
    },
    {
      id: '10',
      name: 'اجتماع الخدام',
      type: 'meeting',
      date: '2025-01-15',
      startTime: '19:00',
      endTime: '21:00',
      location: 'مكتب الإدارة'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setSessions(mockSessions);
      setLoading(false);
    }, 1000);
  }, []);

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-500 border-blue-600 text-white';
      case 'event': return 'bg-green-500 border-green-600 text-white';
      case 'trip': return 'bg-purple-500 border-purple-600 text-white';
      case 'meeting': return 'bg-orange-500 border-orange-600 text-white';
      default: return 'bg-gray-500 border-gray-600 text-white';
    }
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'درس';
      case 'event': return 'فعالية';
      case 'trip': return 'رحلة';
      case 'meeting': return 'اجتماع';
      default: return type;
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'event': return '🎉';
      case 'trip': return '🚌';
      case 'meeting': return '👥';
      default: return '📅';
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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل التقويم...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors hover:scale-110 order-2 sm:order-1"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 sm:p-3 hover:bg-gray-100 rounded-xl transition-colors hover:scale-110 order-3 sm:order-2"
            >
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-3 sm:p-4 order-1 sm:order-3">
              <h2 className="text-xl sm:text-3xl font-bold text-amber-900 font-cairo text-center sm:text-right">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 font-cairo mb-1 sm:mb-2">تقويم الجلسات والفعاليات</h1>
            <p className="text-gray-600 font-cairo text-sm sm:text-lg hidden sm:block">عرض جميع الجلسات والأنشطة المجدولة</p>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <BookOpenIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
            {sessions.filter(s => s.type === 'lesson').length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">دروس</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <span className="text-2xl">🎉</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
            {sessions.filter(s => s.type === 'event').length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">فعاليات</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <span className="text-2xl">🚌</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
            {sessions.filter(s => s.type === 'trip').length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">رحلات</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
            <UsersIcon className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-orange-600 mb-1">
            {sessions.filter(s => s.type === 'meeting').length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">اجتماعات</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200 hidden sm:block">
          <div className="grid grid-cols-7 gap-0">
            {dayNames.map((day) => (
              <div key={day} className="p-2 sm:p-4 text-center border-r border-gray-200 last:border-r-0">
                <span className="text-sm font-bold text-gray-700 font-cairo">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Calendar Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200 block sm:hidden">
          <div className="grid grid-cols-7 gap-0">
            {['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'].map((day, index) => (
              <div key={index} className="p-2 text-center border-r border-gray-200 last:border-r-0">
                <span className="text-xs font-bold text-gray-700 font-cairo">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Body */}
        <div className="grid grid-cols-7 gap-0">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-36 border-b border-r border-gray-100 last:border-r-0 p-3 relative transition-colors hover:bg-gray-50 ${
                !day.isCurrentMonth ? 'bg-gray-25 text-gray-400' : 'bg-white'
              } ${day.isToday ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              {/* Day Number */}
              <div className="flex items-center justify-end mb-2">
                <span className={`text-sm font-bold font-cairo ${
                  day.isToday 
                    ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg' 
                    : day.isCurrentMonth 
                      ? 'text-gray-900' 
                      : 'text-gray-400'
                }`}>
                  {day.dayNumber}
                </span>
              </div>

              {/* Sessions */}
              <div className="space-y-1">
                {day.sessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className={`text-xs p-2 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-sm ${getSessionTypeColor(session.type)}`}
                    title={`${session.name} - ${session.startTime} في ${session.location}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{getSessionIcon(session.type)}</span>
                      <div className="text-right flex-1 mr-2">
                        <div className="font-bold truncate font-cairo leading-tight">{session.name}</div>
                        <div className="opacity-90 font-cairo text-xs">{session.startTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {day.sessions.length > 3 && (
                  <div className="text-xs text-gray-500 text-center font-cairo bg-gray-100 rounded-lg py-1">
                    +{day.sessions.length - 3} أخرى
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-right font-cairo flex items-center space-x-2 sm:space-x-3 space-x-reverse">
          <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          <span>الجلسات القادمة</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sessions
            .filter(s => new Date(s.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 6)
            .map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:scale-105">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                    session.type === 'lesson' ? 'bg-blue-100' :
                    session.type === 'event' ? 'bg-green-100' :
                    session.type === 'trip' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <span className="text-2xl">{getSessionIcon(session.type)}</span>
                  </div>
                  <div className="text-right flex-1 mr-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getSessionTypeColor(session.type)} shadow-sm`}>
                      {getSessionTypeLabel(session.type)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <h4 className="font-bold text-gray-900 font-cairo mb-2 text-base sm:text-lg">
                    {session.name}
                  </h4>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="font-cairo text-xs sm:text-sm">{new Date(session.date).toLocaleDateString('ar-EG')}</span>
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="font-cairo text-xs sm:text-sm">{session.startTime} - {session.endTime}</span>
                      <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    
                    {session.location && (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="font-cairo text-xs sm:text-sm">{session.location}</span>
                        <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {sessions.filter(s => new Date(s.date) >= new Date()).length === 0 && (
          <div className="text-center py-8">
            <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-cairo text-sm sm:text-base">لا توجد جلسات قادمة</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 text-right font-cairo">دليل الألوان والرموز</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xs sm:text-sm text-gray-700 font-cairo">دروس</span>
              <span className="text-lg">📚</span>
            </div>
            <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xs sm:text-sm text-gray-700 font-cairo">فعاليات</span>
              <span className="text-lg">🎉</span>
            </div>
            <div className="w-4 h-4 bg-green-500 rounded shadow-sm"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xs sm:text-sm text-gray-700 font-cairo">رحلات</span>
              <span className="text-lg">🚌</span>
            </div>
            <div className="w-4 h-4 bg-purple-500 rounded shadow-sm"></div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xs sm:text-sm text-gray-700 font-cairo">اجتماعات</span>
              <span className="text-lg">👥</span>
            </div>
            <div className="w-4 h-4 bg-orange-500 rounded shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeaconCalendar;