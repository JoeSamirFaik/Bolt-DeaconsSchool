import React, { useState, useEffect } from 'react';
import { XMarkIcon, ClipboardDocumentCheckIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import { Quiz, Subject, Lesson, CreateQuizRequest, UpdateQuizRequest, Question } from '../../types/lms';
import { quizzesApi } from '../../services/lmsApi';

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

interface QuizFormProps {
  quiz?: Quiz | null;
  subjectId?: string;
  lessonId?: string;
  subjects: Subject[];
  lessons: Lesson[];
  onClose: () => void;
  onSave: () => void;
}

const QuizForm: React.FC<QuizFormProps> = ({ quiz, subjectId, lessonId, subjects, lessons, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    subjectId: subjectId || '',
    title: '',
    description: '',
    type: 'lesson_quiz' as 'lesson_quiz' | 'final_exam',
    lessonId: lessonId || '',
    order: 1,
    timeLimit: 30,
    passingScore: 70,
    maxAttempts: 3,
    isActive: true,
    questions: [] as Omit<Question, 'id'>[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (quiz) {
      setFormData({
        subjectId: quiz.subjectId,
        title: quiz.title,
        description: quiz.description,
        type: quiz.type,
        lessonId: quiz.lessonId || '',
        order: quiz.order,
        timeLimit: quiz.timeLimit,
        passingScore: quiz.passingScore,
        maxAttempts: quiz.maxAttempts,
        isActive: quiz.isActive,
        questions: quiz.questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
          points: q.points,
          explanation: q.explanation
        }))
      });
    } else if (subjectId) {
      setFormData(prev => ({ ...prev, subjectId }));
    }
    if (lessonId) {
      setFormData(prev => ({ ...prev, lessonId, type: 'lesson_quiz' }));
    }
  }, [quiz, subjectId, lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (quiz) {
        // Update existing quiz
        const updateData: UpdateQuizRequest = {
          id: quiz.id,
          ...formData
        };
        await quizzesApi.update(updateData);
      } else {
        // Create new quiz
        const createData: CreateQuizRequest = {
          subjectId: formData.subjectId,
          title: formData.title,
          description: formData.description,
          type: formData.type,
          lessonId: formData.type === 'lesson_quiz' ? formData.lessonId : undefined,
          order: formData.order,
          timeLimit: formData.timeLimit,
          passingScore: formData.passingScore,
          maxAttempts: formData.maxAttempts,
          questions: formData.questions
        };
        await quizzesApi.create(createData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : 
               type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, {
        text: '',
        type: 'multiple_choice',
        options: ['', '', ''],
        correctAnswer: 0,
        points: 10,
        explanation: ''
      }]
    }));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? { ...q, options: [...(q.options || []), ''] } : q
      )
    }));
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options?.map((opt, oi) => oi === optionIndex ? value : opt)
        } : q
      )
    }));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options?.filter((_, oi) => oi !== optionIndex)
        } : q
      )
    }));
  };

  const filteredLessons = lessons.filter(lesson => lesson.subjectId === formData.subjectId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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
                {quiz ? 'تعديل الاختبار' : 'إضافة اختبار جديد'}
              </h2>
              <p className="text-gray-600 text-sm font-cairo">
                {quiz ? 'قم بتعديل بيانات الاختبار' : 'أدخل بيانات الاختبار الجديد'}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-indigo-600" />
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
                <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  المقرر الدراسي *
                </label>
                <Select
                  value={formData.subjectId ? 
                    { value: formData.subjectId, label: subjects.find(s => s.id === formData.subjectId)?.name } : 
                    null
                  }
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setFormData({ ...formData, subjectId: selectedOption.value, lessonId: '' });
                    }
                  }}
                  options={subjects.map(subject => ({ value: subject.id, label: subject.name }))}
                  styles={customSelectStyles}
                  placeholder="-- اختر المقرر --"
                  isSearchable={false}
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  عنوان الاختبار *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo"
                  placeholder="مثال: اختبار سريع - الدرس الأول"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  وصف الاختبار *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo resize-none"
                  placeholder="وصف مختصر للاختبار..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  نوع الاختبار *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    formData.type === 'lesson_quiz'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="type"
                      value="lesson_quiz"
                      checked={formData.type === 'lesson_quiz'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-lg mb-1">📝</div>
                      <span className="text-sm font-medium text-gray-700">اختبار درس</span>
                    </div>
                  </label>
                  <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    formData.type === 'final_exam'
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="type"
                      value="final_exam"
                      checked={formData.type === 'final_exam'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-lg mb-1">🎓</div>
                      <span className="text-sm font-medium text-gray-700">امتحان نهائي</span>
                    </div>
                  </label>
                </div>
              </div>

              {formData.type === 'lesson_quiz' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    الدرس المرتبط
                  </label>
                  <Select
                    value={formData.lessonId ? 
                      { value: formData.lessonId, label: filteredLessons.find(l => l.id === formData.lessonId)?.title } : 
                      null
                    }
                    onChange={(selectedOption) => {
                      setFormData({ ...formData, lessonId: selectedOption ? selectedOption.value : '' });
                    }}
                    options={filteredLessons.map(lesson => ({ value: lesson.id, label: lesson.title }))}
                    styles={customSelectStyles}
                    placeholder="-- اختر الدرس --"
                    isSearchable={false}
                    isClearable
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    المدة (دقيقة) *
                  </label>
                  <input
                    type="number"
                    id="timeLimit"
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo"
                  />
                </div>

                <div>
                  <label htmlFor="passingScore" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    درجة النجاح (%) *
                  </label>
                  <input
                    type="number"
                    id="passingScore"
                    name="passingScore"
                    value={formData.passingScore}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="maxAttempts" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    عدد المحاولات *
                  </label>
                  <input
                    type="number"
                    id="maxAttempts"
                    name="maxAttempts"
                    value={formData.maxAttempts}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo"
                  />
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    ترتيب الاختبار *
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right font-cairo"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={addQuestion}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse"
              >
                <PlusIcon className="w-4 h-4" />
                <span>إضافة سؤال</span>
              </button>
              <h3 className="text-lg font-semibold text-gray-900 font-cairo">الأسئلة ({formData.questions.length})</h3>
            </div>

            <div className="space-y-6">
              {formData.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    <h4 className="font-semibold text-gray-900 font-cairo">السؤال {questionIndex + 1}</h4>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        نص السؤال *
                      </label>
                      <textarea
                        value={question.text}
                        onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo resize-none"
                        placeholder="اكتب نص السؤال..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        نوع السؤال *
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(questionIndex, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                      >
                        <option value="multiple_choice">اختيار من متعدد</option>
                        <option value="true_false">صح أم خطأ</option>
                        <option value="short_answer">إجابة قصيرة</option>
                      </select>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                          النقاط *
                        </label>
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) => updateQuestion(questionIndex, 'points', parseInt(e.target.value) || 0)}
                          required
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Options */}
                  {question.type === 'multiple_choice' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <button
                          type="button"
                          onClick={() => addOption(questionIndex)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-cairo"
                        >
                          + إضافة خيار
                        </button>
                        <label className="text-sm font-medium text-gray-700 font-cairo">الخيارات</label>
                      </div>
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-3 space-x-reverse">
                            <button
                              type="button"
                              onClick={() => removeOption(questionIndex, optionIndex)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                            <input
                              type="radio"
                              name={`correct-${questionIndex}`}
                              checked={question.correctAnswer === optionIndex}
                              onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                              className="w-4 h-4 text-indigo-600"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                              placeholder={`الخيار ${optionIndex + 1}`}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {question.type === 'true_false' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        الإجابة الصحيحة
                      </label>
                      <div className="flex space-x-4 space-x-reverse">
                        <label className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-cairo">خطأ</span>
                          <input
                            type="radio"
                            name={`tf-${questionIndex}`}
                            checked={question.correctAnswer === 'false'}
                            onChange={() => updateQuestion(questionIndex, 'correctAnswer', 'false')}
                            className="w-4 h-4 text-indigo-600"
                          />
                        </label>
                        <label className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-cairo">صح</span>
                          <input
                            type="radio"
                            name={`tf-${questionIndex}`}
                            checked={question.correctAnswer === 'true'}
                            onChange={() => updateQuestion(questionIndex, 'correctAnswer', 'true')}
                            className="w-4 h-4 text-indigo-600"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {question.type === 'short_answer' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                        الإجابة الصحيحة *
                      </label>
                      <input
                        type="text"
                        value={question.correctAnswer as string}
                        onChange={(e) => updateQuestion(questionIndex, 'correctAnswer', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                        placeholder="اكتب الإجابة الصحيحة..."
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      التفسير (اختياري)
                    </label>
                    <textarea
                      value={question.explanation || ''}
                      onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo resize-none"
                      placeholder="تفسير الإجابة الصحيحة..."
                    />
                  </div>
                </div>
              ))}

              {formData.questions.length === 0 && (
                <div className="text-center py-8">
                  <ClipboardDocumentCheckIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-cairo">لم يتم إضافة أي أسئلة بعد</p>
                  <p className="text-sm text-gray-400 font-cairo">انقر على "إضافة سؤال" لبدء إنشاء الاختبار</p>
                </div>
              )}
            </div>
          </div>

          {quiz && (
            <div className="bg-gray-50 rounded-xl p-4">
              <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                <span className="text-sm font-medium text-gray-700">تفعيل الاختبار</span>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </label>
            </div>
          )}

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
              disabled={loading || formData.questions.length === 0}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                quiz ? 'تحديث الاختبار' : 'إضافة الاختبار'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;