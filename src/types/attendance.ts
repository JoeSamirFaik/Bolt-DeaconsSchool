export interface Session {
  id: string;
  name: string;
  description: string;
  type: 'lesson' | 'event' | 'trip' | 'meeting' | 'other';
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  instructorId?: string; // servant/admin who conducts the session
  levelIds: string[]; // which levels can attend
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  maxAttendees?: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; // every X days/weeks/months
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, etc. (for weekly)
  dayOfMonth?: number; // for monthly
  endDate?: string;
  occurrences?: number; // number of occurrences
}

export interface Attendance {
  id: string;
  sessionId: string;
  deaconId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  notes?: string;
  takenBy: string; // admin/servant who took attendance
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSession {
  id: string;
  sessionId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  attendanceCount: number;
  totalExpected: number;
  takenBy?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionRequest {
  name: string;
  description: string;
  type: 'lesson' | 'event' | 'trip' | 'meeting' | 'other';
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  instructorId?: string;
  levelIds: string[];
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  maxAttendees?: number;
  notes?: string;
}

export interface CreateAttendanceRequest {
  sessionId: string;
  deaconId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  notes?: string;
}

export interface AttendanceStats {
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  lateCount: number;
  excusedCount: number;
}