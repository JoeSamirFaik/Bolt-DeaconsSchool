import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  AcademicCapIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  EyeIcon,
  EyeSlashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Level, Subject, Lesson, Quiz } from '../../types/lms';
import { levelsApi, subjectsApi, lessonsApi, quizzesApi } from '../../services/lmsApi';
import LevelForm from './LevelForm';
import SubjectForm from './SubjectForm';
import LessonForm from './LessonForm';
import QuizForm from './QuizForm';

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
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: '12px',
    padding: '8px'
  })
};

const LMSManagement: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'levels' | 'subjects' | 'lessons' | 'quizzes'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Modal states
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    loadLevels();
  }, []);

  useEffect(() => {
    if (selectedLevel) {
      loadSubjects(selectedLevel);
    }
  }, [selectedLevel]);

  useEffect(() => {
    if (selectedSubject) {
      loadLessons(selectedSubject);
      loadQuizzes(selectedSubject);
    }
  }, [selectedSubject]);

  const loadLevels = async () => {
    try {
      setLoading(true);
      const data = await levelsApi.getAll();
      setLevels(data);
    } catch (error) {
      console.error('Error loading levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubjects = async (levelId: string) => {
    try {
      const data = await subjectsApi.getByLevelId(levelId);
      setSubjects(data);
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadLessons = async (subjectId: string) => {
    try {
      const data = await lessonsApi.getBySubjectId(subjectId);
      setLessons(data);
    } catch (error) {
      console.error('Error loading lessons:', error);
    }
  };

  const loadQuizzes = async (subjectId: string) => {
    try {
      const data = await quizzesApi.getBySubjectId(subjectId);
      setQuizzes(data);
    } catch (error) {
      console.error('Error loading quizzes:', error);
    }
  };

  const handleDeleteLevel = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستوى؟')) {
      try {
        await levelsApi.delete(id);
        loadLevels();
      } catch (error) {
        console.error('Error deleting level:', error);
      }
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقرر؟')) {
      try {
        await subjectsApi.delete(id);
        if (selectedLevel) loadSubjects(selectedLevel);
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الدرس؟')) {
      try {
        await lessonsApi.delete(id);
        if (selectedSubject) loadLessons(selectedSubject);
      } catch (error) {
        console.error('Error deleting lesson:', error);
      }
    }
  };

  const handleDeleteQuiz = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الاختبار؟')) {
      try {
        await quizzesApi.delete(id);
        if (selectedSubject) loadQuizzes(selectedSubject);
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'text':
        return <DocumentTextIcon className="w-4 h-4" />;
      case 'image':
        return <PhotoIcon className="w-4 h-4" />;
      case 'video':
        return <VideoCameraIcon className="w-4 h-4" />;
      case 'mixed':
        return <BookOpenIcon className="w-4 h-4" />;
      default:
        return <DocumentTextIcon className="w-4 h-4" />;
    }
  };

  const getContentTypeLabel = (contentType: string) => {
    switch (contentType) {
      case 'text':
        return 'نص';
      case 'image':
        return 'صورة';
      case 'video':
        return 'فيديو';
      case 'mixed':
        return 'مختلط';
      default:
        return 'نص';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل المحتوى التعليمي...</p>
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
        <div className="flex items-center justify-between mb-6">
          {/* Left side - Title & Description */}
          <div className="text-right">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">إدارة المحتوى التعليمي</h1>
            <p className="text-gray-600 font-cairo mt-1 text-sm sm:text-base hidden sm:block">إدارة المستويات والمقررات والدروس</p>
          </div>
          
          {/* Right side - Action Button */}
          <button
            onClick={() => {
              setEditingItem(null);
              if (activeTab === 'levels') setShowLevelForm(true);
              else if (activeTab === 'subjects') setShowSubjectForm(true);
              else if (activeTab === 'lessons') setShowLessonForm(true);
              else setShowQuizForm(true);
            }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm sm:text-base"
          >
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              <span className="hidden sm:inline">
                {activeTab === 'levels' ? 'إضافة مستوى' : 
                 activeTab === 'subjects' ? 'إضافة مقرر' : 
                 activeTab === 'lessons' ? 'إضافة درس' : 'إضافة اختبار'}
              </span>
              <span className="sm:hidden">إضافة</span>
            </span>
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 sm:flex sm:space-x-1 sm:space-x-reverse gap-1 sm:gap-0 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('levels')}
            className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
              activeTab === 'levels'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AcademicCapIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>المستويات</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
              activeTab === 'subjects'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>المقررات</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
              activeTab === 'lessons'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DocumentTextIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>الدروس</span>
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`py-2 px-2 sm:py-3 sm:px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-1 sm:space-x-2 space-x-reverse text-xs sm:text-base ${
              activeTab === 'quizzes'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ClipboardDocumentCheckIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>الاختبارات</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {(activeTab === 'subjects' || activeTab === 'lessons' || activeTab === 'quizzes') && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo">تصفية المحتوى</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                المستوى الأكاديمي
              </label>
              <Select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e ? e.value : '');
                  setSelectedSubject('');
                }}
                options={[
                  { value: '', label: '-- اختر المستوى --' },
                  ...levels.map(level => ({ value: level.id, label: level.name }))
                ]}
                styles={customSelectStyles}
                placeholder="-- اختر المستوى --"
                isSearchable={false}
                isClearable
              />
            </div>
            
            {(activeTab === 'lessons' || activeTab === 'quizzes') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  المقرر الدراسي
                </label>
                <Select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e ? e.value : '')}
                  options={[
                    { value: '', label: '-- اختر المقرر --' },
                    ...subjects.map(subject => ({ value: subject.id, label: subject.name }))
                  ]}
                  styles={customSelectStyles}
                  placeholder="-- اختر المقرر --"
                  isSearchable={false}
                  isDisabled={!selectedLevel}
                  isClearable
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <div className="p-6">
            {/* Mobile: List View */}
            <div className="block sm:hidden space-y-4">
              {levels.map((level) => (
                <div key={level.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(level);
                          setShowLevelForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  
                  <div className="text-right mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                      {level.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-cairo">
                      {level.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-amber-600">{level.passPercentage}%</span>
                      <span className="text-gray-600 font-cairo">نسبة النجاح</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${level.passPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                        level.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {level.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                        <span>{level.isActive ? 'نشط' : 'غير نشط'}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-500">#{level.order}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid View */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div key={level.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(level);
                          setShowLevelForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                  
                  <div className="text-right mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                      {level.name}
                    </h3>
                    <p className="text-gray-600 text-sm font-cairo">
                      {level.description}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-amber-600">{level.passPercentage}%</span>
                      <span className="text-gray-600">نسبة النجاح</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${level.passPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                        level.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {level.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                        <span>{level.isActive ? 'نشط' : 'غير نشط'}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-500">#{level.order}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="p-6">
            {!selectedLevel ? (
              <div className="text-center py-12">
                <BookOpenIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 font-cairo">اختر مستوى أكاديمي</h3>
                <p className="text-gray-500 font-cairo text-sm sm:text-base">يرجى اختيار مستوى أكاديمي لعرض المقررات</p>
              </div>
            ) : (
              <div>
                {/* Mobile: List View */}
                <div className="block sm:hidden space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(subject);
                              setShowSubjectForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      
                      <div className="text-right mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                          {subject.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-cairo">
                          {subject.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-orange-600">{subject.passPercentage}%</span>
                          <span className="text-gray-600 font-cairo">نسبة النجاح</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${subject.passPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                            subject.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subject.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                            <span>{subject.isActive ? 'نشط' : 'غير نشط'}</span>
                          </span>
                          <span className="text-sm font-medium text-gray-500">#{subject.order}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Desktop: Grid View */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(subject);
                              setShowSubjectForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubject(subject.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-orange-600" />
                        </div>
                      </div>
                      
                      <div className="text-right mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-cairo">
                          {subject.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-cairo">
                          {subject.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-orange-600">{subject.passPercentage}%</span>
                          <span className="text-gray-600">نسبة النجاح</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${subject.passPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                            subject.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subject.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                            <span>{subject.isActive ? 'نشط' : 'غير نشط'}</span>
                          </span>
                          <span className="text-sm font-medium text-gray-500">#{subject.order}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="p-6">
            {!selectedSubject ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 font-cairo">اختر مقرر دراسي</h3>
                <p className="text-gray-500 font-cairo text-sm sm:text-base">يرجى اختيار مقرر دراسي لعرض الدروس</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                        <div className="flex space-x-2 space-x-reverse justify-end sm:justify-start">
                          <button
                            onClick={() => {
                              setEditingItem(lesson);
                              setShowLessonForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                              lesson.contentType === 'text' ? 'bg-blue-100 text-blue-800' :
                              lesson.contentType === 'image' ? 'bg-green-100 text-green-800' :
                              lesson.contentType === 'video' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {getContentTypeIcon(lesson.contentType)}
                              <span>{getContentTypeLabel(lesson.contentType)}</span>
                            </span>
                            <span className="text-sm text-gray-500 font-cairo">{lesson.duration} دقيقة</span>
                            <span className="text-sm text-gray-500 font-cairo">#{lesson.order}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm font-cairo">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse justify-between sm:justify-end">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                          lesson.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {lesson.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{lesson.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          {getContentTypeIcon(lesson.contentType)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="p-6">
            {!selectedSubject ? (
              <div className="text-center py-12">
                <ClipboardDocumentCheckIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 font-cairo">اختر مقرر دراسي</h3>
                <p className="text-gray-500 font-cairo text-sm sm:text-base">يرجى اختيار مقرر دراسي لعرض الاختبارات</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                        <div className="flex space-x-2 space-x-reverse justify-end sm:justify-start">
                          <button
                            onClick={() => {
                              setEditingItem(quiz);
                              setShowQuizForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteQuiz(quiz.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              quiz.type === 'lesson_quiz' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {quiz.type === 'lesson_quiz' ? 'اختبار درس' : 'امتحان نهائي'}
                            </span>
                            <span className="text-sm text-gray-500 font-cairo">{quiz.timeLimit} دقيقة</span>
                            <span className="text-sm text-gray-500 font-cairo">{quiz.questions.length} سؤال</span>
                            <span className="text-sm text-gray-500 font-cairo">#{quiz.order}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo mb-1">
                            {quiz.title}
                          </h3>
                          <p className="text-gray-600 text-sm font-cairo">
                            {quiz.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 sm:space-x-reverse mt-2 text-sm text-gray-500">
                            <span className="font-cairo">درجة النجاح: {quiz.passingScore}%</span>
                            <span className="font-cairo">عدد المحاولات: {quiz.maxAttempts}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse justify-between sm:justify-end">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                          quiz.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {quiz.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{quiz.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <ClipboardDocumentCheckIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showLevelForm && (
        <LevelForm
          level={editingItem}
          onClose={() => {
            setShowLevelForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowLevelForm(false);
            setEditingItem(null);
            loadLevels();
          }}
        />
      )}

      {showSubjectForm && (
        <SubjectForm
          subject={editingItem}
          levelId={selectedLevel}
          levels={levels}
          onClose={() => {
            setShowSubjectForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowSubjectForm(false);
            setEditingItem(null);
            if (selectedLevel) loadSubjects(selectedLevel);
          }}
        />
      )}

      {showLessonForm && (
        <LessonForm
          lesson={editingItem}
          subjectId={selectedSubject}
          subjects={subjects}
          onClose={() => {
            setShowLessonForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowLessonForm(false);
            setEditingItem(null);
            if (selectedSubject) loadLessons(selectedSubject);
          }}
        />
      )}

      {showQuizForm && (
        <QuizForm
          quiz={editingItem}
          subjectId={selectedSubject}
          subjects={subjects}
          lessons={lessons}
          onClose={() => {
            setShowQuizForm(false);
            setEditingItem(null);
          }}
          onSave={() => {
            setShowQuizForm(false);
            setEditingItem(null);
            if (selectedSubject) loadQuizzes(selectedSubject);
          }}
        />
      )}
    </div>
  );
};

export default LMSManagement;