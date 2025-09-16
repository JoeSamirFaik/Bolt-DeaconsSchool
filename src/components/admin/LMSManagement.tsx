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
  EyeSlashIcon
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
          <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-800 font-cairo font-medium">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl shadow-lg border border-amber-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              setEditingItem(null);
              if (activeTab === 'levels') setShowLevelForm(true);
              else if (activeTab === 'subjects') setShowSubjectForm(true);
              else setShowLessonForm(true);
            }}
            className="bg-gradient-to-r from-amber-700 to-orange-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center space-x-3 space-x-reverse font-bold text-lg"
          >
            <PlusIcon className="w-6 h-6" />
            <span>
              {activeTab === 'levels' ? 'إضافة مستوى جديد' : 
               activeTab === 'subjects' ? 'إضافة مقرر جديد' : 'إضافة درس جديد'}
            </span>
          </button>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="text-right">
              <h1 className="text-3xl font-bold text-amber-900 font-cairo">نظام إدارة التعلم</h1>
              <p className="text-amber-700 font-cairo mt-1">إدارة المستويات والمقررات والدروس</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
              <AcademicCapIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 space-x-reverse bg-white/60 p-2 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'levels'
                ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg'
                : 'text-amber-800 hover:bg-white/80'
            }`}
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span>المستويات الأكاديمية</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'subjects'
                ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg'
                : 'text-amber-800 hover:bg-white/80'
            }`}
          >
            <BookOpenIcon className="w-5 h-5" />
            <span>المقررات الدراسية</span>
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center space-x-2 space-x-reverse ${
              activeTab === 'lessons'
                ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg'
                : 'text-amber-800 hover:bg-white/80'
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <span>الدروس التعليمية</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {(activeTab === 'subjects' || activeTab === 'lessons') && (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-amber-900 mb-3 text-right">
                اختر المستوى الأكاديمي
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value);
                  setSelectedSubject('');
                }}
                className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo bg-white"
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
                <label className="block text-sm font-bold text-amber-900 mb-3 text-right">
                  اختر المقرر الدراسي
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo bg-white"
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
      <div className="bg-white rounded-2xl shadow-lg border border-amber-200">
        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {levels.map((level) => (
                <div key={level.id} className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 hover:border-amber-400 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-3 space-x-reverse">
                      <button
                        onClick={() => {
                          setEditingItem(level);
                          setShowLevelForm(true);
                        }}
                        className="p-3 text-amber-700 hover:bg-amber-100 rounded-xl transition-colors"
                        title="تعديل"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(level.id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="حذف"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <AcademicCapIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-right mb-6">
                    <h3 className="text-xl font-bold text-amber-900 mb-2 font-cairo">
                      {level.name}
                    </h3>
                    <p className="text-amber-700 text-sm leading-relaxed font-cairo">
                      {level.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/80 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-2xl font-bold text-amber-700">{level.passPercentage}%</span>
                        <span className="text-sm text-amber-800 font-medium">نسبة النجاح المطلوبة</span>
                      </div>
                      <div className="w-full bg-amber-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${level.passPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={`px-4 py-2 text-sm font-bold rounded-full flex items-center space-x-2 space-x-reverse ${
                        level.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {level.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                        <span>{level.isActive ? 'نشط' : 'غير نشط'}</span>
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-amber-800">#{level.order}</span>
                        <p className="text-xs text-amber-600">ترتيب المستوى</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="p-8">
            {!selectedLevel ? (
              <div className="text-center py-20">
                <BookOpenIcon className="w-20 h-20 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-amber-800 mb-2 font-cairo">اختر مستوى أكاديمي</h3>
                <p className="text-amber-600 font-cairo">يرجى اختيار مستوى أكاديمي لعرض المقررات الدراسية</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((subject) => (
                  <div key={subject.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-3 space-x-reverse">
                        <button
                          onClick={() => {
                            setEditingItem(subject);
                            setShowSubjectForm(true);
                          }}
                          className="p-3 text-blue-700 hover:bg-blue-100 rounded-xl transition-colors"
                          title="تعديل"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="حذف"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <BookOpenIcon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-right mb-6">
                      <h3 className="text-xl font-bold text-blue-900 mb-2 font-cairo">
                        {subject.name}
                      </h3>
                      <p className="text-blue-700 text-sm leading-relaxed font-cairo">
                        {subject.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white/80 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl font-bold text-blue-700">{subject.passPercentage}%</span>
                          <span className="text-sm text-blue-800 font-medium">نسبة النجاح المطلوبة</span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${subject.passPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`px-4 py-2 text-sm font-bold rounded-full flex items-center space-x-2 space-x-reverse ${
                          subject.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subject.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                          <span>{subject.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-blue-800">#{subject.order}</span>
                          <p className="text-xs text-blue-600">ترتيب المقرر</p>
                        </div>
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
          <div className="p-8">
            {!selectedSubject ? (
              <div className="text-center py-20">
                <DocumentTextIcon className="w-20 h-20 text-amber-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-amber-800 mb-2 font-cairo">اختر مقرر دراسي</h3>
                <p className="text-amber-600 font-cairo">يرجى اختيار مقرر دراسي لعرض الدروس التعليمية</p>
              </div>
            ) : (
              <div className="space-y-6">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 hover:border-purple-400 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex space-x-3 space-x-reverse">
                          <button
                            onClick={() => {
                              setEditingItem(lesson);
                              setShowLessonForm(true);
                            }}
                            className="p-3 text-purple-700 hover:bg-purple-100 rounded-xl transition-colors"
                            title="تعديل"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="حذف"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-3 space-x-reverse mb-2">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                              lesson.contentType === 'text' ? 'bg-blue-100 text-blue-800' :
                              lesson.contentType === 'image' ? 'bg-green-100 text-green-800' :
                              lesson.contentType === 'video' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {getContentTypeLabel(lesson.contentType)}
                            </span>
                            <span className="text-sm text-purple-600 font-medium">{lesson.duration} دقيقة</span>
                            <span className="text-sm text-purple-500">•</span>
                            <span className="text-sm text-purple-600 font-medium">#{lesson.order}</span>
                          </div>
                          <h3 className="text-xl font-bold text-purple-900 font-cairo mb-1">
                            {lesson.title}
                          </h3>
                          <p className="text-purple-700 text-sm font-cairo">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <span className={`px-4 py-2 text-sm font-bold rounded-full flex items-center space-x-2 space-x-reverse ${
                          lesson.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {lesson.isActive ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                          <span>{lesson.isActive ? 'نشط' : 'غير نشط'}</span>
                        </span>
                        <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
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