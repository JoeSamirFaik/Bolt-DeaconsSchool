import React from 'react';

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

interface AttendanceRecordProps {
  record: AttendanceRecordType;
  isMobile?: boolean;
}

const AttendanceRecord: React.FC<AttendanceRecordProps> = ({ record, isMobile = false }) => {
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

  const getPoints = (type: string) => {
    switch (type) {
      case 'liturgy': return 50;
      case 'prayer': return 25;
      default: return 30;
    }
  };

  return (
    <div
      className={`text-xs p-1.5 sm:p-2 rounded-md sm:rounded-lg cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105 shadow-sm border ${getStatusColor(record.status)}`}
      title={`${record.sessionName} - ${record.arrivalTime} في ${record.location}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm sm:text-lg">{getSessionTypeIcon(record.sessionType)}</span>
        <div className="text-right flex-1 mr-1 sm:mr-2">
          <div className="font-bold truncate font-cairo leading-tight text-xs sm:text-sm">
            {isMobile ? record.sessionName.substring(0, 15) + (record.sessionName.length > 15 ? '...' : '') : record.sessionName}
          </div>
          <div className="opacity-90 font-cairo text-xs">{record.arrivalTime}</div>
          {record.isUserAdded && (
            <div className="flex items-center space-x-1 space-x-reverse mt-0.5 sm:mt-1">
              <span className="bg-purple-100 text-purple-800 px-1 py-0.5 text-xs rounded-full font-medium">
                +{getPoints(record.sessionType)} نقطة
              </span>
              {!isMobile && (
                <span className="bg-purple-100 text-purple-800 px-1 py-0.5 text-xs rounded-full font-medium">
                  شخصي
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {record.location && !isMobile && (
        <p className="text-xs opacity-75 font-cairo mt-1">📍 {record.location}</p>
      )}
      {record.notes && !isMobile && (
        <p className="text-xs opacity-75 font-cairo mt-1 line-clamp-1">💬 {record.notes}</p>
      )}
    </div>
  );
};

export default AttendanceRecord;