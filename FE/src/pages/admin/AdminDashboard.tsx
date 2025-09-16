import React, { useState, useEffect } from 'react';
import { Level, Subject, Lesson } from '../../types/lms';
import { levelsApi, subjectsApi, lessonsApi } from '../../services/lmsApi';
import { LevelForm } from '../../components/admin/LevelForm';
import { SubjectForm } from '../../components/admin/SubjectForm';
import { LessonForm } from '../../components/admin/LessonForm';
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  GraduationCap,
  FileText,
  ChevronDown,
  ChevronRight,
  Users,
  BarChart3,
  Settings,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());

  // Form states
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | undefined>();
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>();
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>();
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [levelsData, subjectsData, lessonsData] = await Promise.all([
        levelsApi.getAll(),
        subjectsApi.getAll(),
        lessonsApi.getAll(),
      ]);
      setLevels(levelsData);
      setSubjects(subjectsData);
      setLessons(lessonsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLevel = (levelId: string) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  const toggleSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects);
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId);
    } else {
      newExpanded.add(subjectId);
    }
    setExpandedSubjects(newExpanded);
  };

  // Level handlers
  const handleCreateLevel = async (data: any) => {
    try {
      setFormLoading(true);
      await levelsApi.create(data);
      await loadData();
      setShowLevelForm(false);
    } catch (error) {
      console.error('Error creating level:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateLevel = async (data: any) => {
    if (!editingLevel) return;
    try {
      setFormLoading(true);
      await levelsApi.update(editingLevel.id, data);
      await loadData();
      setShowLevelForm(false);
      setEditingLevel(undefined);
    } catch (error) {
      console.error('Error updating level:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLevel = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستوى؟')) return;
    try {
      await levelsApi.delete(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting level:', error);
    }
  };

  // Subject handlers
  const handleCreateSubject = async (data: any) => {
    try {
      setFormLoading(true);
      await subjectsApi.create(data);
      await loadData();
      setShowSubjectForm(false);
      setSelectedLevelId('');
    } catch (error) {
      console.error('Error creating subject:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateSubject = async (data: any) => {
    if (!editingSubject) return;
    try {
      setFormLoading(true);
      await subjectsApi.update(editingSubject.id, data);
      await loadData();
      setShowSubjectForm(false);
      setEditingSubject(undefined);
    } catch (error) {
      console.error('Error updating subject:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المادة؟')) return;
    try {
      await subjectsApi.delete(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  // Lesson handlers
  const handleCreateLesson = async (data: any) => {
    try {
      setFormLoading(true);
      await lessonsApi.create(data);
      await loadData();
      setShowLessonForm(false);
      setSelectedSubjectId('');
    } catch (error) {
      console.error('Error creating lesson:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateLesson = async (data: any) => {
    if (!editingLesson) return;
    try {
      setFormLoading(true);
      await lessonsApi.update(editingLesson.id, data);
      await loadData();
      setShowLessonForm(false);
      setEditingLesson(undefined);
    } catch (error) {
      console.error('Error updating lesson:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الدرس؟')) return;
    try {
      await lessonsApi.delete(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const getSubjectsByLevel = (levelId: string) => {
    return subjects.filter(subject => subject.levelId === levelId);
  };

  const getLessonsBySubject = (subjectId: string) => {
    return lessons.filter(lesson => lesson.subjectId === subjectId);
  };

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'text': return <FileText className="w-4 h-4" />;
      case 'image': return <FileText className="w-4 h-4" />;
      case 'video': return <FileText className="w-4 h-4" />;
      case 'mixed': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة إدارة النظام التعليمي</h1>
              <p className="text-gray-600">إدارة المستويات والمواد والدروس</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLevelForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة مستوى
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المستويات</p>
                <p className="text-2xl font-bold text-gray-900">{levels.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المواد</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الدروس</p>
                <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الطلاب</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tree */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">هيكل المحتوى التعليمي</h2>
          </div>
          <div className="p-6">
            {levels.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مستويات</h3>
                <p className="text-gray-600 mb-4">ابدأ بإضافة مستوى تعليمي جديد</p>
                <button
                  onClick={() => setShowLevelForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  إضافة مستوى جديد
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {levels.map(level => {
                  const levelSubjects = getSubjectsByLevel(level.id);
                  const isExpanded = expandedLevels.has(level.id);
                  
                  return (
                    <div key={level.id} className="border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleLevel(level.id)}
                            className="mr-2 p-1 hover:bg-gray-200 rounded"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                          <div>
                            <h3 className="font-medium text-gray-900">{level.name}</h3>
                            <p className="text-sm text-gray-600">
                              {levelSubjects.length} مادة • نسبة النجاح: {level.passPercentage}%
                            </p>
                          </div>
                          {!level.isActive && (
                            <span className="mr-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                              غير نشط
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedLevelId(level.id);
                              setShowSubjectForm(true);
                            }}
                            className="p-2 text-green-600 hover:bg-green-100 rounded"
                            title="إضافة مادة"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingLevel(level);
                              setShowLevelForm(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLevel(level.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="p-4 border-t border-gray-200">
                          {levelSubjects.length === 0 ? (
                            <div className="text-center py-8">
                              <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600 mb-2">لا توجد مواد في هذا المستوى</p>
                              <button
                                onClick={() => {
                                  setSelectedLevelId(level.id);
                                  setShowSubjectForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-sm"
                              >
                                إضافة مادة جديدة
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {levelSubjects.map(subject => {
                                const subjectLessons = getLessonsBySubject(subject.id);
                                const isSubjectExpanded = expandedSubjects.has(subject.id);
                                
                                return (
                                  <div key={subject.id} className="border border-gray-100 rounded-lg">
                                    <div className="flex items-center justify-between p-3 bg-white">
                                      <div className="flex items-center">
                                        <button
                                          onClick={() => toggleSubject(subject.id)}
                                          className="mr-2 p-1 hover:bg-gray-100 rounded"
                                        >
                                          {isSubjectExpanded ? (
                                            <ChevronDown className="w-4 h-4" />
                                          ) : (
                                            <ChevronRight className="w-4 h-4" />
                                          )}
                                        </button>
                                        <BookOpen className="w-4 h-4 text-green-600 mr-2" />
                                        <div>
                                          <h4 className="font-medium text-gray-900">{subject.name}</h4>
                                          <p className="text-sm text-gray-600">
                                            {subjectLessons.length} درس • نسبة النجاح: {subject.passPercentage}%
                                          </p>
                                        </div>
                                        {!subject.isActive && (
                                          <span className="mr-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                            غير نشط
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => {
                                            setSelectedSubjectId(subject.id);
                                            setShowLessonForm(true);
                                          }}
                                          className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                                          title="إضافة درس"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => {
                                            setEditingSubject(subject);
                                            setShowSubjectForm(true);
                                          }}
                                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                          title="تعديل"
                                        >
                                          <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteSubject(subject.id)}
                                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                                          title="حذف"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                    
                                    {isSubjectExpanded && (
                                      <div className="p-3 border-t border-gray-100 bg-gray-50">
                                        {subjectLessons.length === 0 ? (
                                          <div className="text-center py-6">
                                            <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-600 mb-2">لا توجد دروس في هذه المادة</p>
                                            <button
                                              onClick={() => {
                                                setSelectedSubjectId(subject.id);
                                                setShowLessonForm(true);
                                              }}
                                              className="text-purple-600 hover:text-purple-700 text-sm"
                                            >
                                              إضافة درس جديد
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="space-y-2">
                                            {subjectLessons.map(lesson => (
                                              <div key={lesson.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                                <div className="flex items-center">
                                                  {getContentTypeIcon(lesson.contentType)}
                                                  <div className="mr-2">
                                                    <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                                    <p className="text-sm text-gray-600">
                                                      {lesson.estimatedDuration} دقيقة • {lesson.contentType}
                                                    </p>
                                                  </div>
                                                  {!lesson.isActive && (
                                                    <span className="mr-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                                      غير نشط
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                  <button
                                                    onClick={() => {
                                                      setEditingLesson(lesson);
                                                      setShowLessonForm(true);
                                                    }}
                                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                    title="تعديل"
                                                  >
                                                    <Edit className="w-3 h-3" />
                                                  </button>
                                                  <button
                                                    onClick={() => handleDeleteLesson(lesson.id)}
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                    title="حذف"
                                                  >
                                                    <Trash2 className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forms */}
      {showLevelForm && (
        <LevelForm
          level={editingLevel}
          onSubmit={editingLevel ? handleUpdateLevel : handleCreateLevel}
          onCancel={() => {
            setShowLevelForm(false);
            setEditingLevel(undefined);
          }}
          isLoading={formLoading}
        />
      )}

      {showSubjectForm && (
        <SubjectForm
          subject={editingSubject}
          levels={levels}
          selectedLevelId={selectedLevelId}
          onSubmit={editingSubject ? handleUpdateSubject : handleCreateSubject}
          onCancel={() => {
            setShowSubjectForm(false);
            setEditingSubject(undefined);
            setSelectedLevelId('');
          }}
          isLoading={formLoading}
        />
      )}

      {showLessonForm && (
        <LessonForm
          lesson={editingLesson}
          subjects={subjects}
          selectedSubjectId={selectedSubjectId}
          onSubmit={editingLesson ? handleUpdateLesson : handleCreateLesson}
          onCancel={() => {
            setShowLessonForm(false);
            setEditingLesson(undefined);
            setSelectedSubjectId('');
          }}
          isLoading={formLoading}
        />
      )}
    </div>
  );
};