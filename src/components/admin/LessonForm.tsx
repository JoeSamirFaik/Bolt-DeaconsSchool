import React, { useState, useEffect } from 'react';
import { XMarkIcon, DocumentTextIcon, PhotoIcon, VideoCameraIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Lesson, Subject, CreateLessonRequest, UpdateLessonRequest, LessonContent } from '../../types/lms';
import { lessonsApi } from '../../services/lmsApi';

interface LessonFormProps {
  lesson?: Lesson | null;
  subjectId?: string;
  subjects: Subject[];
  onClose: () => void;
  onSave: () => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ lesson, subjectId, subjects, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    subjectId: subjectId || '',
    title: '',
    description: '',
    order: 1,
    contentType: 'text' as 'text' | 'image' | 'video' | 'mixed',
    duration: 30,
    isActive: true,
    content: {
      text: '',
      imageUrl: '',
      videoUrl: '',
      attachments: [] as string[]
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (lesson) {
      setFormData({
        subjectId: lesson.subjectId,
        title: lesson.title,
        description: lesson.description,
        order: lesson.order,
        contentType: lesson.contentType,
        duration: lesson.duration,
        isActive: lesson.isActive,
        content: {
          text: lesson.content.text || '',
          imageUrl: lesson.content.imageUrl || '',
          videoUrl: lesson.content.videoUrl || '',
          attachments: lesson.content.attachments || []
        }
      });
    } else if (subjectId) {
      setFormData(prev => ({ ...prev, subjectId }));
    }
  }, [lesson, subjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const content: LessonContent = {};
      
      // Only include relevant content based on type
      if (formData.contentType === 'text' || formData.contentType === 'mixed') {
        content.text = formData.content.text;
      }
      if (formData.contentType === 'image' || formData.contentType === 'mixed') {
        content.imageUrl = formData.content.imageUrl;
      }
      if (formData.contentType === 'video' || formData.contentType === 'mixed') {
        content.videoUrl = formData.content.videoUrl;
      }
      if (formData.content.attachments.length > 0) {
        content.attachments = formData.content.attachments;
      }

      if (lesson) {
        // Update existing lesson
        const updateData: UpdateLessonRequest = {
          id: lesson.id,
          subjectId: formData.subjectId,
          title: formData.title,
          description: formData.description,
          order: formData.order,
          contentType: formData.contentType,
          content,
          duration: formData.duration,
          isActive: formData.isActive
        };
        await lessonsApi.update(updateData);
      } else {
        // Create new lesson
        const createData: CreateLessonRequest = {
          subjectId: formData.subjectId,
          title: formData.title,
          description: formData.description,
          order: formData.order,
          contentType: formData.contentType,
          content,
          duration: formData.duration
        };
        await lessonsApi.create(createData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving lesson:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('content.')) {
      const contentField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [contentField]: value
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

  const contentTypes = [
    { value: 'text', label: 'محتوى نصي', icon: DocumentTextIcon, color: 'from-blue-600 to-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { value: 'image', label: 'محتوى مرئي', icon: PhotoIcon, color: 'from-green-600 to-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
    { value: 'video', label: 'محتوى فيديو', icon: VideoCameraIcon, color: 'from-red-600 to-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { value: 'mixed', label: 'محتوى مختلط', icon: BookOpenIcon, color: 'from-purple-600 to-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' }
  ];

  const renderContentFields = () => {
    const { contentType } = formData;
    
    return (
      <div className="space-y-6">
        {(contentType === 'text' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.text" className="block text-sm font-bold text-purple-900 mb-3 text-right">
              المحتوى النصي للدرس
            </label>
            <textarea
              id="content.text"
              name="content.text"
              value={formData.content.text}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo resize-none leading-relaxed"
              placeholder="اكتب محتوى الدرس النصي هنا... يمكنك إضافة الشرح والتفاصيل والأمثلة"
            />
          </div>
        )}

        {(contentType === 'image' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.imageUrl" className="block text-sm font-bold text-purple-900 mb-3 text-right">
              رابط الصورة التعليمية
            </label>
            <input
              type="url"
              id="content.imageUrl"
              name="content.imageUrl"
              value={formData.content.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-purple-600 mt-2 text-right">أدخل رابط الصورة التعليمية المناسبة للدرس</p>
          </div>
        )}

        {(contentType === 'video' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.videoUrl" className="block text-sm font-bold text-purple-900 mb-3 text-right">
              رابط الفيديو التعليمي
            </label>
            <input
              type="url"
              id="content.videoUrl"
              name="content.videoUrl"
              value={formData.content.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo"
              placeholder="https://youtube.com/watch?v=... أو رابط فيديو آخر"
            />
            <p className="text-xs text-purple-600 mt-2 text-right">أدخل رابط الفيديو التعليمي (يوتيوب أو منصة أخرى)</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-purple-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 border-b border-purple-200 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-purple-200 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-purple-800" />
            </button>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-purple-900 font-cairo">
                  {lesson ? 'تعديل الدرس التعليمي' : 'إضافة درس تعليمي جديد'}
                </h2>
                <p className="text-purple-700 text-sm font-cairo mt-1">
                  {lesson ? 'قم بتعديل بيانات الدرس ومحتواه' : 'أدخل بيانات الدرس الجديد ومحتواه التعليمي'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="subjectId" className="block text-sm font-bold text-purple-900 mb-3 text-right">
                  المقرر الدراسي *
                </label>
                <select
                  id="subjectId"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo text-lg bg-white"
                >
                  <option value="">-- اختر المقرر الدراسي --</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-bold text-purple-900 mb-3 text-right">
                  عنوان الدرس *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo text-lg"
                  placeholder="مثال: مقدمة في تاريخ الكنيسة القبطية"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-bold text-purple-900 mb-3 text-right">
                  وصف الدرس *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo resize-none leading-relaxed"
                  placeholder="وصف مختصر وواضح للدرس وأهدافه التعليمية..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="order" className="block text-sm font-bold text-purple-900 mb-3 text-right">
                    ترتيب الدرس *
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo text-lg"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-bold text-purple-900 mb-3 text-right">
                    مدة الدرس (دقيقة) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-4 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-600 transition-all duration-300 text-right font-cairo text-lg"
                  />
                </div>
              </div>

              {lesson && (
                <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
                  <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                    <span className="text-sm font-bold text-purple-900">تفعيل الدرس</span>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600 border-2 border-purple-300 rounded focus:ring-purple-500"
                    />
                  </label>
                  <p className="text-xs text-purple-600 mt-2 text-right">
                    {formData.isActive ? 'الدرس مفعل ومتاح للطلاب' : 'الدرس غير مفعل ولن يظهر للطلاب'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-900 mb-4 text-right">
              نوع المحتوى التعليمي *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`relative cursor-pointer p-6 border-2 rounded-2xl transition-all duration-300 ${
                      formData.contentType === type.value
                        ? `${type.borderColor} ${type.bgColor} shadow-lg`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      value={type.value}
                      checked={formData.contentType === type.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${type.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{type.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-900 mb-6 text-right font-cairo">محتوى الدرس التعليمي</h3>
            {renderContentFields()}
          </div>

          <div className="flex space-x-4 space-x-reverse pt-6 border-t-2 border-purple-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-purple-300 text-purple-800 rounded-2xl hover:bg-purple-50 transition-colors font-bold text-lg"
            >
              إلغاء العملية
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                lesson ? 'تحديث الدرس' : 'إضافة الدرس'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;