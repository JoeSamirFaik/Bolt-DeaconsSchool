import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import AttendanceRecord from './AttendanceRecord';

interface AttendanceRecordType {
  id: string;
  date: string;
  sessionName: string;
  sessionType: 'lesson' | 'event' | 'trip' | 'meeting' | 'liturgy' | 'prayer';
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  location?: string;
  notes?: string;
  isUserAdded?: boolean;
}

interface WeeklyTimelineProps {
  currentWeek: Date;
  attendanceRecords: AttendanceRecordType[];
  onNavigateWeek: (direction: 'prev' | 'next') => void;
  onAddLiturgy: () => void;
  onAddPrayer: () => void;
  isMobile?: boolean;
}

const WeeklyTimeline: React.FC<WeeklyTimelineProps> = ({
  currentWeek,
  attendanceRecords,
  onNavigateWeek,
  onAddLiturgy,
  onAddPrayer,
  isMobile = false
}) => {
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

  const getAttendanceForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return attendanceRecords.filter(record => record.date === dateStr);
  };

  const weekDates = getWeekDates(currentWeek);
  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 mb-3 sm:mb-6">
        <div className="flex items-center space-x-2 sm:space-x-4 space-x-reverse justify-center sm:justify-start">
          <button
            onClick={() => onNavigateWeek('next')}
            className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors hover:scale-110"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button
            onClick={() => onNavigateWeek('prev')}
            className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors hover:scale-110"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg sm:rounded-xl p-2 sm:p-4">
            <h2 className="text-sm sm:text-xl font-bold text-amber-900 font-cairo text-center">
              {weekDates[0].toLocaleDateString('ar-EG', { month: 'long', day: 'numeric' })} - {weekDates[6].toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
          <button
            onClick={onAddPrayer}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <span className="text-lg">🙏</span>
            <span className="hidden sm:inline">إضافة صلاة</span>
            <span className="sm:hidden">صلاة</span>
          </button>
          <button
            onClick={onAddLiturgy}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <span className="text-lg">⛪</span>
            <span className="hidden sm:inline">إضافة قداس</span>
            <span className="sm:hidden">قداس</span>
          </button>
        </div>
      </div>

      {/* Weekly Timeline */}
      <div className={`grid grid-cols-7 gap-1 sm:gap-2 ${isMobile ? 'text-xs' : ''}`}>
        {weekDates.map((date, index) => {
          const dayAttendance = getAttendanceForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={index}
              className={`border-2 rounded-lg sm:rounded-xl p-2 sm:p-4 min-h-[120px] sm:min-h-[200px] transition-all duration-300 hover:shadow-lg ${
                isToday ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              {/* Day Header */}
              <div className="text-center mb-2 sm:mb-4">
                <div className={`text-xs sm:text-sm font-bold mb-1 font-cairo ${
                  isToday ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {isMobile ? dayNames[index].substring(0, 3) : dayNames[index]}
                </div>
                <div className={`text-sm sm:text-lg font-bold font-cairo ${
                  isToday ? 'bg-blue-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto' : 'text-gray-900'
                }`}>
                  {date.getDate()}
                </div>
              </div>

              {/* Attendance Records */}
              <div className="space-y-1 sm:space-y-2">
                {dayAttendance.map((record) => (
                  <AttendanceRecord key={record.id} record={record} isMobile={isMobile} />
                ))}
                
                {dayAttendance.length === 0 && (
                  <div className="text-center py-2 sm:py-4">
                    <div className="text-gray-300 text-lg sm:text-2xl mb-1 sm:mb-2">📅</div>
                    <p className="text-xs text-gray-400 font-cairo">
                      <span className="hidden sm:inline">لا توجد جلسات</span>
                      <span className="sm:hidden">فارغ</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTimeline;