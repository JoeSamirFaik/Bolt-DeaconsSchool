import React from 'react';
import { 
  PencilIcon, 
  TrashIcon, 
  AcademicCapIcon,
  UsersIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { User, LevelAssignment } from '../../../types/user';
import { Level } from '../../../types/lms';

interface AssignmentsTabProps {
  assignments: LevelAssignment[];
  users: User[];
  levels: Level[];
  onEdit: (assignment: LevelAssignment) => void;
  onDelete: (id: string) => void;
}

const AssignmentsTab: React.FC<AssignmentsTabProps> = ({ 
  assignments, 
  users, 
  levels, 
  onEdit, 
  onDelete 
}) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'assigned': return 'مُكلف';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'failed': return 'فاشل';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Mobile: Card View */}
      <div className="block lg:hidden space-y-3">
        {assignments.map((assignment) => {
          const deacon = users.find(u => u.id === assignment.deaconId);
          const level = levels.find(l => l.id === assignment.levelId);
          
          return (
            <div key={assignment.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                {/* Quick Actions */}
                <div className="flex space-x-2 space-x-reverse">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    title="تعديل"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(assignment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Assignment Icon */}
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <AcademicCapIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              {/* Main Info */}
              <div className="text-right mb-3">
                <h3 className="text-base font-bold text-gray-900 mb-1 font-cairo">
                  {deacon?.firstName} {deacon?.lastName}
                </h3>
                <p className="text-gray-600 font-cairo text-sm mb-2">
                  {level?.name}
                </p>
                <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                    {getStatusLabel(assignment.status)}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-cairo">
                    {assignment.academicYear}
                  </span>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-purple-600">{assignment.progress}%</span>
                  <span className="text-sm text-gray-600 font-cairo">التقدم</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 transition-all duration-700"
                    style={{ width: `${assignment.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 font-cairo">
                  <span>انتهاء: {new Date(assignment.expectedEndDate).toLocaleDateString('ar-EG')}</span>
                  <span>بداية: {new Date(assignment.startDate).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Desktop: Assignments by Level */}
      <div className="hidden lg:block space-y-6">
        {levels.map((level) => {
          const levelAssignments = assignments.filter(a => a.levelId === level.id);
          const averageProgress = levelAssignments.length > 0 
            ? Math.round(levelAssignments.reduce((sum, a) => sum + a.progress, 0) / levelAssignments.length)
            : 0;
          
          return (
            <div key={level.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* Level Header */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-2">
                        <span className="text-xl font-bold text-amber-600">{averageProgress}%</span>
                      </div>
                      <p className="text-xs text-gray-600 font-cairo">متوسط التقدم</p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-gray-900 font-cairo mb-2">{level.name}</h3>
                      <p className="text-gray-600 font-cairo mb-3">{level.description}</p>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                          {levelAssignments.length} شماس مُكلف
                        </span>
                        <span className="text-gray-500">نسبة النجاح: {level.passPercentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg">
                    <AcademicCapIcon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 transition-all duration-700 shadow-sm"
                      style={{ width: `${averageProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Assigned Deacons */}
              {levelAssignments.length > 0 ? (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levelAssignments.map((assignment) => {
                      const deacon = users.find(u => u.id === assignment.deaconId);
                      
                      return (
                        <div key={assignment.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex space-x-2 space-x-reverse">
                              <button
                                onClick={() => onEdit(assignment)}
                                className="p-1 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="تعديل التكليف"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDelete(assignment.id)}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="حذف التكليف"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <h4 className="font-semibold text-gray-900 font-cairo">
                                {deacon?.firstName} {deacon?.lastName}
                              </h4>
                              <p className="text-xs text-gray-500 font-cairo">{assignment.academicYear}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-amber-600">{assignment.progress}%</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                              {getStatusLabel(assignment.status)}
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="text-xs text-gray-500 font-cairo">
                            {new Date(assignment.startDate).toLocaleDateString('ar-EG')} - {new Date(assignment.expectedEndDate).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-cairo">لا يوجد شمامسة مُكلفون في هذا المستوى</p>
                </div>
              )}
            </div>
          );
        })}
        
        {levels.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا يوجد مستويات</h3>
            <p className="text-gray-500 font-cairo">يرجى إضافة مستويات أكاديمية أولاً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentsTab;