import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  AcademicCapIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  ChartBarIcon,
  EyeIcon,
  EyeSlashIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Level, Subject, Lesson } from '../../types/lms';
import { levelsApi, subjectsApi, lessonsApi } from '../../services/lmsApi';
import LevelForm from './LevelForm';
import SubjectForm from './SubjectForm';
import LessonForm from './LessonForm';

const LMSManagement: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'levels' | 'subjects' | 'lessons'>('levels');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  
  // Modal states
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
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
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              setEditingItem(null);
              if (activeTab === 'levels') setShowLevelForm(true);
              else if (activeTab === 'subjects') setShowSubjectForm(true);
              else setShowLessonForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center space-x-2 space-x-reverse font-medium"
          >
            <PlusIcon className="w-5 h-5" />
            <span>
              {activeTab === 'levels' ? 'إضافة مستوى' : 
               activeTab === 'subjects' ? 'إضافة مقرر' : 'إضافة درس'}
            </span>
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة المحتوى التعليمي</h1>
            <p className="text-gray-600 font-cairo mt-1">إدارة المستويات والمقررات والدروس</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'levels'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AcademicCapIcon className="w-4 h-4" />
            <span>المستويات</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'subjects'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpenIcon className="w-4 h-4" />
            <span>المقررات</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'lessons'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <DocumentTextIcon className="w-4 h-4" />
            <span>الدروس</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {(activeTab === 'subjects' || activeTab === 'lessons') && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 font-cairo">تصفية المحتوى</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                المستوى الأكاديمي
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setSelectedSubject('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo bg-white"
              >
                <option value="">-- اختر المستوى --</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            
            {activeTab === 'lessons' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  المقرر الدراسي
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo bg-white"
                  disabled={!selectedLevel}
                >
                  <option value="">-- اختر المقرر --</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div key={level.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(level);
                          setShowLevelForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                      <AcademicCapIcon className="w-6 h-6 text-blue-600" />
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
                      <span className="font-medium text-blue-600">{level.passPercentage}%</span>
                      <span className="text-gray-600">نسبة النجاح</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">اختر مستوى أكاديمي</h3>
                <p className="text-gray-500 font-cairo">يرجى اختيار مستوى أكاديمي لعرض المقررات</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => {
                            setEditingItem(subject);
                            setShowSubjectForm(true);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                        <BookOpenIcon className="w-6 h-6 text-green-600" />
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
                        <span className="font-medium text-green-600">{subject.passPercentage}%</span>
                        <span className="text-gray-600">نسبة النجاح</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
            )}
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div className="p-6">
            {!selectedSubject ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">اختر مقرر دراسي</h3>
                <p className="text-gray-500 font-cairo">يرجى اختيار مقرر دراسي لعرض الدروس</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(lesson);
                              setShowLessonForm(true);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
                          <div className="flex items-center space-x-3 space-x-reverse mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                              lesson.contentType === 'text' ? 'bg-blue-100 text-blue-800' :
                              lesson.contentType === 'image' ? 'bg-green-100 text-green-800' :
                              lesson.contentType === 'video' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {getContentTypeIcon(lesson.contentType)}
                              <span>{getContentTypeLabel(lesson.contentType)}</span>
                            </span>
                            <span className="text-sm text-gray-500">{lesson.duration} دقيقة</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">#{lesson.order}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 font-cairo mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm font-cairo">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 space-x-reverse ${
                          lesson.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {lesson.isActive ? <EyeIcon className="w-3 h-3" /> : <EyeSlashIcon className="w-3 h-3" />}
                          <span>{lesson.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
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
    </div>
  );
};

export default LMSManagement;