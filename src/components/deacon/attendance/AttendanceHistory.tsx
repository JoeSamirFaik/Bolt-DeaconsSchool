import React from 'react';
import { ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

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

interface AttendanceHistoryProps {
  attendanceRecords: AttendanceRecordType[];
}

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ attendanceRecords }) => {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'حاضر';
      case 'late': return 'متأخر';
      case 'excused': return 'معذور';
      case 'absent': return 'غائب';
      default: return status;
    }
  };

  return (
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
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                  {getStatusLabel(record.status)}
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
  );
};

export default AttendanceHistory;