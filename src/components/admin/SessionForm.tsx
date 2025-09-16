import React, { useState, useEffect } from 'react';
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { Session, CreateSessionRequest, RecurringPattern } from '../../types/attendance';
import { User } from '../../types/user';
import { Level } from '../../types/lms';
import { sessionsApi } from '../../services/attendanceApi';

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

interface SessionFormProps {
  session?: Session | null;
  users: User[];
  levels: Level[];
  onClose: () => void;
  onSave: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, users, levels, onClose, onSave }) => {
  const [formData, setFormData] = useState<CreateSessionRequest>({
    name: '',
    description: '',
    type: 'lesson',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    instructorId: '',
    levelIds: [],
    isRecurring: false,
    recurringPattern: undefined,
    maxAttendees: undefined,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the selected date from props if creating a new session
  const initialDate = session?.date || new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (session) {
      setFormData({
        name: session.name,
        description: session.description,
        type: session.type,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        location: session.location || '',
        instructorId: session.instructorId || '',
        levelIds: session.levelIds,
        isRecurring: session.isRecurring,
        recurringPattern: session.recurringPattern,
        maxAttendees: session.maxAttendees,
        notes: session.notes || ''
      });
    } else {
      // Set default date for new sessions
      setFormData(prev => ({
        ...prev,
        date: initialDate
      }));
    }
  }, [session, initialDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (session) {
        // Update existing session
        await sessionsApi.update(session.id, formData);
      } else {
        // Create new session
        await sessionsApi.create(formData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving session:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('recurringPattern.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        recurringPattern: {
          ...prev.recurringPattern!,
          [field]: type === 'number' ? parseInt(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) || 0 : 
                 type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleRecurringChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isRecurring: checked,
      recurringPattern: checked ? {
        frequency: 'weekly',
        interval: 1,
        daysOfWeek: [],
        endDate: ''
      } : undefined
    }));
  };

  const sessionTypes = [
    { value: 'lesson', label: 'درس' },
    { value: 'event', label: 'فعالية' },
    { value: 'trip', label: 'رحلة' },
    { value: 'meeting', label: 'اجتماع' },
    { value: 'other', label: 'أخرى' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' },
    { value: 'monthly', label: 'شهري' }
  ];

  const daysOfWeek = [
    { value: 0, label: 'الأحد' },
    { value: 1, label: 'الاثنين' },
    { value: 2, label: 'الثلاثاء' },
    { value: 3, label: 'الأربعاء' },
    { value: 4, label: 'الخميس' },
    { value: 5, label: 'الجمعة' },
    { value: 6, label: 'السبت' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                {session ? 'تعديل الجلسة' : 'إضافة جلسة جديدة'}
              </h2>
              <p className="text-gray-600 text-sm font-cairo">
                {session ? 'قم بتعديل بيانات الجلسة' : 'أدخل بيانات الجلسة الجديدة'}
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  اسم الجلسة *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  placeholder="مثال: درس الكتاب المقدس"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  نوع الجلسة *
                </label>
                <Select
                  value={sessionTypes.find(option => option.value === formData.type)}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setFormData({ ...formData, type: selectedOption.value as any });
                    }
                  }}
                  options={sessionTypes}
                  styles={customSelectStyles}
                  placeholder="اختر نوع الجلسة"
                  isSearchable={false}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  وصف الجلسة *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo resize-none"
                  placeholder="وصف مختصر للجلسة..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    التاريخ *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    المكان
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                    placeholder="مثال: قاعة الدراسة"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    وقت البداية *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    وقت النهاية *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  المدرس
                </label>
                <Select
                  value={formData.instructorId ? 
                    { value: formData.instructorId, label: users.find(u => u.id === formData.instructorId)?.firstName + ' ' + users.find(u => u.id === formData.instructorId)?.lastName } : 
                    null
                  }
                  onChange={(selectedOption) => {
                    setFormData({ ...formData, instructorId: selectedOption ? selectedOption.value : '' });
                  }}
                  options={users.map(user => ({ 
                    value: user.id, 
                    label: `${user.firstName} ${user.lastName}` 
                  }))}
                  styles={customSelectStyles}
                  placeholder="اختر المدرس"
                  isSearchable={true}
                  isClearable
                />
              </div>
            </div>
          </div>

          {/* Levels Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              المستويات المستهدفة *
            </label>
            <Select
              isMulti
              value={formData.levelIds.map(id => ({ 
                value: id, 
                label: levels.find(l => l.id === id)?.name || id 
              }))}
              onChange={(selectedOptions) => {
                setFormData({ 
                  ...formData, 
                  levelIds: selectedOptions ? selectedOptions.map(option => option.value) : [] 
                });
              }}
              options={levels.map(level => ({ value: level.id, label: level.name }))}
              styles={customSelectStyles}
              placeholder="اختر المستويات"
              isSearchable={false}
            />
          </div>

          {/* Recurring Settings */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-end space-x-3 space-x-reverse mb-4">
              <span className="text-sm font-medium text-gray-700 font-cairo">جلسة متكررة</span>
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => handleRecurringChange(e.target.checked)}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
            </div>

            {formData.isRecurring && formData.recurringPattern && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    التكرار
                  </label>
                  <Select
                    value={frequencyOptions.find(option => option.value === formData.recurringPattern?.frequency)}
                    onChange={(selectedOption) => {
                      if (selectedOption) {
                        setFormData(prev => ({
                          ...prev,
                          recurringPattern: {
                            ...prev.recurringPattern!,
                            frequency: selectedOption.value as any
                          }
                        }));
                      }
                    }}
                    options={frequencyOptions}
                    styles={customSelectStyles}
                    placeholder="اختر التكرار"
                    isSearchable={false}
                  />
                </div>

                <div>
                  <label htmlFor="recurringPattern.interval" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    كل
                  </label>
                  <input
                    type="number"
                    name="recurringPattern.interval"
                    value={formData.recurringPattern.interval}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>

                {formData.recurringPattern.frequency === 'weekly' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      أيام الأسبوع
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {daysOfWeek.map(day => (
                        <label key={day.value} className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                          <span className="text-sm font-cairo">{day.label}</span>
                          <input
                            type="checkbox"
                            checked={formData.recurringPattern?.daysOfWeek?.includes(day.value) || false}
                            onChange={(e) => {
                              const daysOfWeek = formData.recurringPattern?.daysOfWeek || [];
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  recurringPattern: {
                                    ...prev.recurringPattern!,
                                    daysOfWeek: [...daysOfWeek, day.value]
                                  }
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  recurringPattern: {
                                    ...prev.recurringPattern!,
                                    daysOfWeek: daysOfWeek.filter(d => d !== day.value)
                                  }
                                }));
                              }
                            }}
                            className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="recurringPattern.endDate" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    تاريخ الانتهاء
                  </label>
                  <input
                    type="date"
                    name="recurringPattern.endDate"
                    value={formData.recurringPattern.endDate || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                الحد الأقصى للحضور
              </label>
              <input
                type="number"
                id="maxAttendees"
                name="maxAttendees"
                value={formData.maxAttendees || ''}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo"
                placeholder="اتركه فارغاً لعدم التحديد"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                ملاحظات
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right font-cairo resize-none"
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
              className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                session ? 'تحديث الجلسة' : 'إضافة الجلسة'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionForm;