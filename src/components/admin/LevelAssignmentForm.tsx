import React, { useState, useEffect } from 'react';
import { XMarkIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { LevelAssignment, User, AcademicYear, CreateLevelAssignmentRequest } from '../../types/user';
import { Level } from '../../types/lms';
import { levelAssignmentsApi } from '../../services/userApi';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '48px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f59e0b' 
      : state.isFocused 
        ? '#fef3c7' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const,
    '&:hover': {
      backgroundColor: state.isSelected ? '#f59e0b' : '#fef3c7'
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  })
};

interface LevelAssignmentFormProps {
  assignment?: LevelAssignment | null;
  users: User[];
  levels: Level[];
  academicYears: AcademicYear[];
  onClose: () => void;
  onSave: () => void;
}

const LevelAssignmentForm: React.FC<LevelAssignmentFormProps> = ({ 
  assignment, 
  users, 
  levels, 
  academicYears, 
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<CreateLevelAssignmentRequest>({
    deaconId: '',
    levelId: '',
    academicYear: '',
    startDate: '',
    expectedEndDate: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (assignment) {
      setFormData({
        deaconId: assignment.deaconId,
        levelId: assignment.levelId,
        academicYear: assignment.academicYear,
        startDate: assignment.startDate,
        expectedEndDate: assignment.expectedEndDate,
        notes: assignment.notes || ''
      });
    }
  }, [assignment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (assignment) {
        // Update existing assignment
        await levelAssignmentsApi.update(assignment.id, formData);
      } else {
        // Create new assignment
        await levelAssignmentsApi.create(formData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">
                {assignment ? 'تعديل التكليف' : 'تكليف مستوى جديد'}
              </h2>
              <p className="text-gray-600 text-sm font-cairo">
                {assignment ? 'قم بتعديل بيانات التكليف' : 'قم بتكليف شماس بمستوى دراسي'}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                الشماس *
              </label>
              <Select
                value={formData.deaconId ? 
                  { value: formData.deaconId, label: users.find(u => u.id === formData.deaconId)?.firstName + ' ' + users.find(u => u.id === formData.deaconId)?.lastName } : 
                  null
                }
                onChange={(option) => {
                  setFormData({ ...formData, deaconId: option ? option.value : '' });
                }}
                options={users.map(user => ({ 
                  value: user.id, 
                  label: `${user.firstName} ${user.lastName}` 
                }))}
                styles={customSelectStyles}
                placeholder="اختر الشماس"
                isSearchable={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                المستوى *
              </label>
              <Select
                value={formData.levelId ? 
                  { value: formData.levelId, label: levels.find(l => l.id === formData.levelId)?.name } : 
                  null
                }
                onChange={(option) => {
                  setFormData({ ...formData, levelId: option ? option.value : '' });
                }}
                options={levels.map(level => ({ 
                  value: level.id, 
                  label: level.name 
                }))}
                styles={customSelectStyles}
                placeholder="اختر المستوى"
                isSearchable={true}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                السنة الأكاديمية *
              </label>
              <Select
                value={formData.academicYear ? 
                  { value: formData.academicYear, label: formData.academicYear } : 
                  null
                }
                onChange={(option) => {
                  setFormData({ ...formData, academicYear: option ? option.value : '' });
                }}
                options={academicYears.map(year => ({ 
                  value: year.year, 
                  label: year.year 
                }))}
                styles={customSelectStyles}
                placeholder="اختر السنة"
                isSearchable={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  تاريخ البداية *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right font-cairo"
                />
              </div>
              
              <div>
                <label htmlFor="expectedEndDate" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  تاريخ الانتهاء المتوقع *
                </label>
                <input
                  type="date"
                  id="expectedEndDate"
                  name="expectedEndDate"
                  value={formData.expectedEndDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right font-cairo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                ملاحظات
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-right font-cairo resize-none"
                placeholder="ملاحظات إضافية..."
              />
            </div>
          </div>

          <div className="flex space-x-3 space-x-reverse pt-6 border-t border-gray-200">
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
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                assignment ? 'تحديث التكليف' : 'إنشاء التكليف'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelAssignmentForm;