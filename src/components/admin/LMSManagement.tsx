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
  ChartBarIcon
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
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'image':
        return <PhotoIcon className="w-5 h-5" />;
      case 'video':
        return <VideoCameraIcon className="w-5 h-5" />;
      case 'mixed':
        return <BookOpenIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
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
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-cairo">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => {
                setEditingItem(null);
                if (activeTab === 'levels') setShowLevelForm(true);
                else if (activeTab === 'subjects') setShowSubjectForm(true);
                else setShowLessonForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 space-x-reverse font-bold"
            >
              <PlusIcon className="w-5 h-5" />
              <span>
                {activeTab === 'levels' ? 'إضافة مستوى' : 
                 activeTab === 'subjects' ? 'إضافة مقرر' : 'إضافة درس'}
              </span>
            </button>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إدارة نظام التعلم</h1>
            <AcademicCapIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'levels'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            المستويات الأكاديمية
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'subjects'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            المقررات الدراسية
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
              activeTab === 'lessons'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            الدروس التعليمية
          </button>
        </div>
      </div>

      {/* Filters */}
      {(activeTab === 'subjects' || activeTab === 'lessons') && (
        <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 text-right">
                اختر المستوى
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setSelectedSubject('');
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              >
                <option value="">اختر المستوى</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            
            {activeTab === 'lessons' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">
                  اختر المقرر
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
                  disabled={!selectedLevel}
                >
                  <option value="">اختر المقرر</option>
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
      <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-100">
        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levels.map((level) => (
                <div key={level.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(level);
                          setShowLevelForm(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                      <AcademicCapIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-right font-cairo">
                    {level.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-right font-cairo">
                    {level.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">{level.passPercentage}%</span>
                      <span className="text-sm text-gray-600">نسبة النجاح المطلوبة</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">#{level.order}</span>
                      <span className="text-sm text-gray-600">ترتيب المستوى</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        level.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {level.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                      <span className="text-sm text-gray-600">الحالة</span>
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
                <BookOpenIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-cairo">اختر مستوى أكاديمي لعرض المقررات</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <div key={subject.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => {
                            setEditingItem(subject);
                            setShowSubjectForm(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center">
                        <BookOpenIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-right font-cairo">
                      {subject.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 text-right font-cairo">
                      {subject.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{subject.passPercentage}%</span>
                        <span className="text-sm text-gray-600">نسبة النجاح المطلوبة</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700">#{subject.order}</span>
                        <span className="text-sm text-gray-600">ترتيب المقرر</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                          subject.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                        <span className="text-sm text-gray-600">الحالة</span>
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
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-cairo">اختر مقرر دراسي لعرض الدروس</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(lesson);
                              setShowLessonForm(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <span className="text-sm text-gray-500">#{lesson.order}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{lesson.duration} دقيقة</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-purple-600 font-bold">
                              {getContentTypeLabel(lesson.contentType)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 font-cairo">
                            {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm font-cairo">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                          lesson.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {lesson.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
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