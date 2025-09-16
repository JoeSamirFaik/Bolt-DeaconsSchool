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
    { value: 'text', label: 'نص', icon: DocumentTextIcon, color: 'text-blue-600' },
    { value: 'image', label: 'صورة', icon: PhotoIcon, color: 'text-green-600' },
    { value: 'video', label: 'فيديو', icon: VideoCameraIcon, color: 'text-red-600' },
    { value: 'mixed', label: 'مختلط', icon: BookOpenIcon, color: 'text-purple-600' }
  ];

  const renderContentFields = () => {
    const { contentType } = formData;
    
    return (
      <div className="space-y-4">
        {(contentType === 'text' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.text" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              المحتوى النصي
            </label>
            <textarea
              id="content.text"
              name="content.text"
              value={formData.content.text}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo resize-none"
              placeholder="اكتب محتوى الدرس النصي هنا..."
            />
          </div>
        )}

        {(contentType === 'image' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.imageUrl" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              رابط الصورة
            </label>
            <input
              type="url"
              id="content.imageUrl"
              name="content.imageUrl"
              value={formData.content.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        )}

        {(contentType === 'video' || contentType === 'mixed') && (
          <div>
            <label htmlFor="content.videoUrl" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              رابط الفيديو
            </label>
            <input
              type="url"
              id="content.videoUrl"
              name="content.videoUrl"
              value={formData.content.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 font-cairo">
              {lesson ? 'تعديل الدرس' : 'إضافة درس جديد'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm font-medium text-right">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="subjectId" className="block text-sm font-bold text-gray-700 mb-2 text-right">
                المقرر الدراسي *
              </label>
              <select
                id="subjectId"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              >
                <option value="">اختر المقرر</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2 text-right">
                عنوان الدرس *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
                placeholder="مثال: مقدمة في تاريخ الكنيسة"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              وصف الدرس *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo resize-none"
              placeholder="وصف مختصر للدرس..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="order" className="block text-sm font-bold text-gray-700 mb-2 text-right">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-bold text-gray-700 mb-2 text-right">
                مدة الدرس (بالدقائق) *
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 text-right">
              نوع المحتوى *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {contentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.value}
                    className={`relative cursor-pointer p-4 border-2 rounded-2xl transition-all duration-300 ${
                      formData.contentType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
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
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
                      <span className="text-sm font-bold text-gray-700">{type.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-right font-cairo">محتوى الدرس</h3>
            {renderContentFields()}
          </div>

          {lesson && (
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-bold text-gray-700">الدرس نشط</span>
              </label>
            </div>
          )}

          <div className="flex space-x-4 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              {loading ? 'جاري الحفظ...' : lesson ? 'تحديث الدرس' : 'إضافة الدرس'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonForm;