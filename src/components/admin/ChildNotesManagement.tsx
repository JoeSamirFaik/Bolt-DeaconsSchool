import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  DocumentTextIcon, 
  UserIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User } from '../../types/user';
import { usersApi, childNotesApi } from '../../services/userApi';
import ChildNoteForm from './ChildNoteForm';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '48px',
    border: state.isFocused ? '2px solid #10b981' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#10b981'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#10b981' 
      : state.isFocused 
        ? '#d1fae5' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const,
    '&:hover': {
      backgroundColor: state.isSelected ? '#10b981' : '#d1fae5'
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

interface ChildNote {
  id: string;
  deaconId: string;
  servantId: string;
  title: string;
  content: string;
  category: 'academic' | 'behavioral' | 'spiritual' | 'general';
  priority: 'low' | 'medium' | 'high';
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

const ChildNotesManagement: React.FC = () => {
  const [notes, setNotes] = useState<ChildNote[]>([]);
  const [deacons, setDeacons] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [selectedDeaconId, setSelectedDeaconId] = useState<string>('');
  
  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [deaconFilter, setDeaconFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [deaconsData, notesData] = await Promise.all([
        usersApi.getByRole('deacon'),
        childNotesApi.getByDeaconId('') // Get all notes
      ]);
      setDeacons(deaconsData);
      setNotes(notesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNote = async (data: any) => {
    try {
      await childNotesApi.create(data);
      setShowNoteForm(false);
      setSelectedDeaconId('');
      loadData();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
      try {
        await childNotesApi.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'behavioral': return '👤';
      case 'spiritual': return '🙏';
      case 'general': return '💬';
      default: return '📝';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'أكاديمي';
      case 'behavioral': return 'سلوكي';
      case 'spiritual': return 'روحي';
      case 'general': return 'عام';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-orange-100 text-orange-800';
      case 'spiritual': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'مهم';
      case 'medium': return 'متوسط';
      case 'low': return 'عادي';
      default: return priority;
    }
  };

  const filteredNotes = notes.filter(note => {
    if (categoryFilter !== 'all' && note.category !== categoryFilter) return false;
    if (priorityFilter !== 'all' && note.priority !== priorityFilter) return false;
    if (deaconFilter !== 'all' && note.deaconId !== deaconFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل ملاحظات الشمامسة...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Action Button */}
          <button
            onClick={() => setShowNoteForm(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">إضافة ملاحظة</span>
            <span className="sm:hidden">إضافة</span>
          </button>
          
          {/* Right side - Title & Description */}
          <div className="text-right">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">ملاحظات الشمامسة</h1>
            <p className="text-gray-600 font-cairo text-sm sm:text-base hidden sm:block">إدارة الملاحظات والتعليقات حول الشمامسة</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4">
          <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo">تصفية الملاحظات</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الشماس
            </label>
            <Select
              value={deaconFilter !== 'all' ? { 
                value: deaconFilter, 
                label: deacons.find(d => d.id === deaconFilter)?.firstName + ' ' + deacons.find(d => d.id === deaconFilter)?.lastName 
              } : null}
              onChange={(option) => setDeaconFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع الشمامسة' },
                ...deacons.map(deacon => ({ 
                  value: deacon.id, 
                  label: `${deacon.firstName} ${deacon.lastName}` 
                }))
              ]}
              styles={customSelectStyles}
              placeholder="اختر الشماس"
              isSearchable={true}
              isClearable
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الفئة
            </label>
            <Select
              value={categoryFilter !== 'all' ? { value: categoryFilter, label: getCategoryLabel(categoryFilter) } : null}
              onChange={(option) => setCategoryFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع الفئات' },
                { value: 'academic', label: 'أكاديمي' },
                { value: 'behavioral', label: 'سلوكي' },
                { value: 'spiritual', label: 'روحي' },
                { value: 'general', label: 'عام' }
              ]}
              styles={customSelectStyles}
              placeholder="اختر الفئة"
              isSearchable={false}
              isClearable
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الأولوية
            </label>
            <Select
              value={priorityFilter !== 'all' ? { value: priorityFilter, label: getPriorityLabel(priorityFilter) } : null}
              onChange={(option) => setPriorityFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع المستويات' },
                { value: 'high', label: 'مهم' },
                { value: 'medium', label: 'متوسط' },
                { value: 'low', label: 'عادي' }
              ]}
              styles={customSelectStyles}
              placeholder="اختر الأولوية"
              isSearchable={false}
              isClearable
            />
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {filteredNotes.map((note) => {
              const deacon = deacons.find(d => d.id === note.deaconId);
              
              return (
                <div key={note.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-4 sm:space-y-0">
                    {/* Left side - Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse order-3 sm:order-1">
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="حذف الملاحظة"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      
                      <div className="flex flex-wrap items-center gap-2 justify-end sm:justify-start">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(note.priority)}`}>
                          {getPriorityLabel(note.priority)}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(note.category)}`}>
                          {getCategoryLabel(note.category)}
                        </span>
                        {note.isPrivate && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            خاص
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Center - Note Content */}
                    <div className="flex-1 text-right order-1 sm:order-2 sm:mx-6">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mb-3">
                        <span className="text-sm text-gray-500 font-cairo">
                          {new Date(note.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 font-cairo">
                          {note.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 font-cairo mb-3 leading-relaxed text-sm sm:text-base">
                        {note.content}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 sm:space-x-reverse text-xs sm:text-sm text-gray-500">
                        <span className="font-cairo">
                          👤 {deacon?.firstName} {deacon?.lastName}
                        </span>
                        <span className="font-cairo">
                          📝 {getCategoryLabel(note.category)}
                        </span>
                        {note.isPrivate && (
                          <span className="font-cairo text-blue-600">
                            🔒 ملاحظة خاصة لولي الأمر
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side - Category Icon */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 order-2 sm:order-3">
                      <span className="text-3xl">{getCategoryIcon(note.category)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد ملاحظات</h3>
              <p className="text-gray-500 font-cairo text-sm sm:text-base">لم يتم إضافة أي ملاحظات بعد</p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
            <DocumentTextIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">{notes.length}</div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">إجمالي الملاحظات</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
            <ExclamationTriangleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-red-600 mb-1">
            {notes.filter(n => n.priority === 'high').length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">ملاحظات مهمة</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
            <InformationCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">
            {notes.filter(n => n.isPrivate).length}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">ملاحظات خاصة</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4">
            <UserIcon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
            {new Set(notes.map(n => n.deaconId)).size}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">شمامسة لديهم ملاحظات</p>
        </div>
      </div>

      {/* Note Form Modal */}
      <ChildNoteForm
        isOpen={showNoteForm}
        onClose={() => {
          setShowNoteForm(false);
          setSelectedDeaconId('');
        }}
        onSubmit={handleSubmitNote}
        deacons={deacons}
        selectedDeaconId={selectedDeaconId}
      />
    </div>
  );
};

export default ChildNotesManagement;