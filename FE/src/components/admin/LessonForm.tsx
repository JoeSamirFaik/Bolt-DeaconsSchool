import React, { useState, useEffect } from 'react';
import { Lesson, CreateLessonDto, Subject } from '../../types/lms';
import { X, Save, Loader2, FileText, Image, Video, Layers } from 'lucide-react';

interface LessonFormProps {
  lesson?: Lesson;
  subjects: Subject[];
  onSubmit: (data: CreateLessonDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  selectedSubjectId?: string;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  lesson,
  subjects,
  onSubmit,
  onCancel,
  isLoading = false,
  selectedSubjectId,
}) => {
  const [formData, setFormData] = useState<CreateLessonDto>({
    title: '',
    description: '',
    textContent: '',
    imageUrl: '',
    videoUrl: '',
    contentType: 'text',
    order: 1,
    estimatedDuration: 30,
    isActive: true,
    subjectId: selectedSubjectId || '',
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        description: lesson.description || '',
        textContent: lesson.textContent || '',
        imageUrl: lesson.imageUrl || '',
        videoUrl: lesson.videoUrl || '',
        contentType: lesson.contentType,
        order: lesson.order,
        estimatedDuration: lesson.estimatedDuration,
        isActive: lesson.isActive,
        subjectId: lesson.subjectId,
      });
    } else if (selectedSubjectId) {
      setFormData(prev => ({ ...prev, subjectId: selectedSubjectId }));
    }
  }, [lesson, selectedSubjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const contentTypeIcons = {
    text: FileText,
    image: Image,
    video: Video,
    mixed: Layers,
  };

  const ContentTypeIcon = contentTypeIcons[formData.contentType];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {lesson ? 'تعديل الدرس' : 'إضافة درس جديد'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المادة *
            </label>
            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="">اختر المادة</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.level?.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان الدرس *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: مقدمة في التاريخ الكنسي"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="وصف الدرس..."
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع المحتوى
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(contentTypeIcons).map(([type, Icon]) => (
                <label
                  key={type}
                  className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-colors ${
                    formData.contentType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="contentType"
                    value={type}
                    checked={formData.contentType === type}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="text-sm">
                    {type === 'text' && 'نص'}
                    {type === 'image' && 'صورة'}
                    {type === 'video' && 'فيديو'}
                    {type === 'mixed' && 'مختلط'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {(formData.contentType === 'text' || formData.contentType === 'mixed') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                محتوى النص
              </label>
              <textarea
                name="textContent"
                value={formData.textContent}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اكتب محتوى الدرس هنا..."
                disabled={isLoading}
              />
            </div>
          )}

          {(formData.contentType === 'image' || formData.contentType === 'mixed') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الصورة
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
                disabled={isLoading}
              />
            </div>
          )}

          {(formData.contentType === 'video' || formData.contentType === 'mixed') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الفيديو
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
                disabled={isLoading}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الترتيب
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدة المقدرة (دقيقة)
              </label>
              <input
                type="number"
                name="estimatedDuration"
                value={formData.estimatedDuration}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label className="mr-2 block text-sm text-gray-900">
              درس نشط
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};