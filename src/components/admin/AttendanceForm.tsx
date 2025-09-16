import React, { useState, useEffect } from 'react';
import { XMarkIcon, UsersIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Session, Attendance, CreateAttendanceRequest } from '../../types/attendance';
import { User } from '../../types/user';
import { Level } from '../../types/lms';
import { attendanceApi } from '../../services/attendanceApi';

interface AttendanceFormProps {
  session: Session;
  deacons: User[];
  levels: Level[];
  onClose: () => void;
  onSave: () => void;
}

interface AttendanceRecord {
  deaconId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  arrivalTime?: string;
  notes?: string;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ session, deacons, levels, onClose, onSave }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(session.date);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter deacons based on session levels
  const eligibleDeacons = deacons.filter(deacon => 
    deacon.deaconInfo?.currentLevel && session.levelIds.includes(deacon.deaconInfo.currentLevel)
  );

  const filteredDeacons = eligibleDeacons.filter(deacon =>
    deacon.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deacon.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Initialize attendance records for all eligible deacons
    const initialRecords: AttendanceRecord[] = eligibleDeacons.map(deacon => ({
      deaconId: deacon.id,
      status: 'absent',
      arrivalTime: '',
      notes: ''
    }));
    setAttendanceRecords(initialRecords);

    // Load existing attendance if any
    loadExistingAttendance();
  }, [session, eligibleDeacons, selectedDate]);

  const loadExistingAttendance = async () => {
    try {
      const existingAttendance = await attendanceApi.getBySessionAndDate(session.id, selectedDate);
      
      if (existingAttendance.length > 0) {
        setAttendanceRecords(prev => 
          prev.map(record => {
            const existing = existingAttendance.find(a => a.deaconId === record.deaconId);
            return existing ? {
              deaconId: record.deaconId,
              status: existing.status,
              arrivalTime: existing.arrivalTime || '',
              notes: existing.notes || ''
            } : record;
          })
        );
      }
    } catch (error) {
      console.error('Error loading existing attendance:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await attendanceApi.bulkUpdate(attendanceRecords, session.id, selectedDate);
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateAttendanceRecord = (deaconId: string, field: keyof AttendanceRecord, value: any) => {
    setAttendanceRecords(prev =>
      prev.map(record =>
        record.deaconId === deaconId ? { ...record, [field]: value } : record
      )
    );
  };

  const markAllAs = (status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceRecords(prev =>
      prev.map(record => ({ ...record, status }))
    );
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
        return 'bg-green-50 border-green-200';
      case 'late':
        return 'bg-yellow-50 border-yellow-200';
      case 'excused':
        return 'bg-blue-50 border-blue-200';
      case 'absent':
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const attendanceStats = {
    present: attendanceRecords.filter(r => r.status === 'present').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    excused: attendanceRecords.filter(r => r.status === 'excused').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    total: attendanceRecords.length
  };

  const attendanceRate = attendanceStats.total > 0 
    ? Math.round(((attendanceStats.present + attendanceStats.late) / attendanceStats.total) * 100)
    : 0;

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {/* Right side - Title & Description */}
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900 font-cairo">تسجيل الحضور</h1>
              <p className="text-gray-600 font-cairo">{session.name}</p>
            </div>
            
            {/* Left side - Back Button */}
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium"
            >
              <XMarkIcon className="w-5 h-5" />
              <span>العودة</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-4">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          {/* Session Info & Date Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-right">
                <h3 className="text-sm font-medium text-gray-700 font-cairo">الجلسة</h3>
                <p className="text-lg font-semibold text-gray-900 font-cairo">{session.name}</p>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-medium text-gray-700 font-cairo">الوقت</h3>
                <p className="text-lg font-semibold text-gray-900 font-cairo">
                  {session.startTime} - {session.endTime}
                </p>
              </div>
              <div>
                <label htmlFor="selectedDate" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  التاريخ
                </label>
                <input
                  type="date"
                  id="selectedDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-right font-cairo"
                />
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{attendanceStats.total}</div>
                <div className="text-sm text-gray-600 font-cairo">المجموع</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{attendanceStats.present}</div>
                <div className="text-sm text-gray-600 font-cairo">حاضر</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{attendanceStats.late}</div>
                <div className="text-sm text-gray-600 font-cairo">متأخر</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{attendanceStats.excused}</div>
                <div className="text-sm text-gray-600 font-cairo">معذور</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{attendanceStats.absent}</div>
                <div className="text-sm text-gray-600 font-cairo">غائب</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-green-600">{attendanceRate}%</span>
                <span className="text-sm text-gray-600 font-cairo">نسبة الحضور</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
            <div className="flex space-x-2 space-x-reverse">
              <button
                type="button"
                onClick={() => markAllAs('present')}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium font-cairo"
              >
                تحديد الكل حاضر
              </button>
              <button
                type="button"
                onClick={() => markAllAs('absent')}
                className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium font-cairo"
              >
                تحديد الكل غائب
              </button>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="البحث عن شماس..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
              />
              <span className="text-sm text-gray-600 font-cairo">
                {filteredDeacons.length} من {eligibleDeacons.length} شماس
              </span>
            </div>
            </div>
          </div>

          {/* Attendance List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-3">
            {filteredDeacons.map((deacon) => {
              const record = attendanceRecords.find(r => r.deaconId === deacon.id);
              if (!record) return null;

              const currentLevel = levels.find(l => l.id === deacon.deaconInfo?.currentLevel);

              return (
                <div
                  key={deacon.id}
                  className={`border-2 rounded-xl p-4 transition-all ${getStatusColor(record.status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      {/* Status Buttons */}
                      <div className="flex space-x-1 space-x-reverse">
                        <button
                          type="button"
                          onClick={() => updateAttendanceRecord(deacon.id, 'status', 'present')}
                          className={`p-2 rounded-lg transition-colors ${
                            record.status === 'present' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                          }`}
                          title="حاضر"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAttendanceRecord(deacon.id, 'status', 'late')}
                          className={`p-2 rounded-lg transition-colors ${
                            record.status === 'late' 
                              ? 'bg-yellow-600 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
                          }`}
                          title="متأخر"
                        >
                          <ClockIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAttendanceRecord(deacon.id, 'status', 'excused')}
                          className={`p-2 rounded-lg transition-colors ${
                            record.status === 'excused' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                          }`}
                          title="معذور"
                        >
                          <ExclamationTriangleIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateAttendanceRecord(deacon.id, 'status', 'absent')}
                          className={`p-2 rounded-lg transition-colors ${
                            record.status === 'absent' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                          }`}
                          title="غائب"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Arrival Time (for present/late) */}
                      {(record.status === 'present' || record.status === 'late') && (
                        <input
                          type="time"
                          value={record.arrivalTime || ''}
                          onChange={(e) => updateAttendanceRecord(deacon.id, 'arrivalTime', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-cairo"
                          placeholder="وقت الوصول"
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="text-right">
                        <h4 className="font-semibold text-gray-900 font-cairo">
                          {deacon.firstName} {deacon.lastName}
                        </h4>
                        <p className="text-sm text-gray-600 font-cairo">
                          {currentLevel?.name || 'غير محدد'}
                        </p>
                      </div>
                      {/* Notes */}
                      <input
                        type="text"
                        value={record.notes || ''}
                        onChange={(e) => updateAttendanceRecord(deacon.id, 'notes', e.target.value)}
                        placeholder="ملاحظات..."
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm font-cairo w-32"
                      />

                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {deacon.firstName.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {filteredDeacons.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-cairo">لا يوجد شمامسة مؤهلون لهذه الجلسة</p>
            </div>
          )}

          {/* Save Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex space-x-3 space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                'حفظ الحضور'
              )}
            </button>
            </div>
          </div>
        </form>
    </div>
  );
};

export default AttendanceForm;