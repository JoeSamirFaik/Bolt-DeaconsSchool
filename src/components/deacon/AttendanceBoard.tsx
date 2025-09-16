import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AttendanceStats from './attendance/AttendanceStats';
import WeeklyTimeline from './attendance/WeeklyTimeline';
import DetailedStats from './attendance/DetailedStats';
import AttendanceHistory from './attendance/AttendanceHistory';
import LiturgyForm from './attendance/LiturgyForm';
import PrayerForm from './attendance/PrayerForm';
import PointsLegend from './attendance/PointsLegend';

interface AttendanceRecord {
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

interface LiturgyFormData {
  date: string;
  liturgyType: string;
  location: string;
  notes: string;
}

interface PrayerFormData {
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

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeek(newDate);
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
    const totalPoints = liturgyPoints + prayerPoints + sessionPoints;
    
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
      totalPoints
    };
  };

  const handleAddLiturgy = (data: LiturgyFormData) => {
    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: data.date,
      sessionName: data.liturgyType,
      sessionType: 'liturgy',
      status: 'present',
      arrivalTime: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      location: data.location,
      notes: data.notes,
      isUserAdded: true
    };
    
    setAttendanceRecords(prev => [...prev, newRecord]);
    setShowLiturgyForm(false);
  };

  const handleAddPrayer = (data: PrayerFormData) => {
    const newRecord: AttendanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: data.date,
      sessionName: data.prayerType,
      sessionType: 'prayer',
      status: 'present',
      arrivalTime: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      location: data.location,
      notes: `${data.duration} دقيقة - ${data.notes}`,
      isUserAdded: true
    };
    
    setAttendanceRecords(prev => [...prev, newRecord]);
    setShowPrayerForm(false);
  };

  const stats = calculateStats();

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
      <AttendanceStats stats={stats} />

      {/* Week Navigation */}
      <WeeklyTimeline
        currentWeek={currentWeek}
        attendanceRecords={attendanceRecords}
        onNavigateWeek={navigateWeek}
        onAddLiturgy={() => setShowLiturgyForm(true)}
        onAddPrayer={() => setShowPrayerForm(true)}
      />

      {/* Detailed Statistics */}
      <DetailedStats stats={stats} />

      {/* Recent Attendance History */}
      <AttendanceHistory attendanceRecords={attendanceRecords} />

      {/* Points Legend */}
      <PointsLegend />

      {/* Modals */}
      <LiturgyForm
        isOpen={showLiturgyForm}
        onClose={() => setShowLiturgyForm(false)}
        onSubmit={handleAddLiturgy}
      />

      <PrayerForm
        isOpen={showPrayerForm}
        onClose={() => setShowPrayerForm(false)}
        onSubmit={handleAddPrayer}
      />
    </div>
  );
};

export default AttendanceBoard;