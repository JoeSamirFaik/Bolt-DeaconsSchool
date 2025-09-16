import { Injectable } from '@nestjs/common';

@Injectable()
export class AttendanceService {
  getMyAttendance() {
    return [
      {
        id: '1',
        userId: '1',
        sessionId: 'session1',
        date: '2024-01-15',
        status: 'present',
        notes: 'حضر في الوقت المحدد',
      },
      {
        id: '2',
        userId: '1',
        sessionId: 'session2',
        date: '2024-01-16',
        status: 'present',
        notes: 'مشارك نشط',
      },
    ];
  }

  getMyAttendanceStats() {
    return {
      totalSessions: 10,
      presentSessions: 9,
      absentSessions: 1,
      attendanceRate: 90,
    };
  }
}