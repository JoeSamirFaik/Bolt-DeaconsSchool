import React, { useState, useEffect } from 'react';
import { XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Subject, Level, CreateSubjectRequest, UpdateSubjectRequest } from '../../types/lms';
import { subjectsApi } from '../../services/lmsApi';

interface SubjectFormProps {
  subject?: Subject | null;
  levelId?: string;
  levels: Level[];
  onClose: () => void;
  onSave: () => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subject, levelId, levels, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    levelId: levelId || '',
    name: '',
    description: '',
    order: 1,
    passPercentage: 80,
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (subject) {
      setFormData({
        levelId: subject.levelId,
        name: subject.name,
        description: subject.description,
        order: subject.order,
        passPercentage: subject.passPercentage,
        isActive: subject.isActive
      });
    } else if (levelId) {
      setFormData(prev => ({ ...prev, levelId }));
    }
  }, [subject, levelId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (subject) {
        // Update existing subject
        const updateData: UpdateSubjectRequest = {
          id: subject.id,
          ...formData
        };
        await subjectsApi.update(updateData);
      } else {
        // Create new subject
        const createData: CreateSubjectRequest = {
          levelId: formData.levelId,
          name: formData.name,
          description: formData.description,
          order: formData.order,
          passPercentage: formData.passPercentage
        };
        await subjectsApi.create(createData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving subject:', err);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                {subject ? 'تعديل المقرر' : 'إضافة مقرر جديد'}
              </h2>
              <p className="text-gray-600 text-sm font-cairo">
                {subject ? 'قم بتعديل بيانات المقرر' : 'أدخل بيانات المقرر الجديد'}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-right font-cairo">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="levelId" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                المستوى الأكاديمي *
              </label>
              <Select
                value={formData.levelId}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setFormData({ ...formData, levelId: selectedOption.value });
                  }
                }}
                options={levels.map(level => ({ value: level.id, label: level.name }))}
                styles={customSelectStyles}
                placeholder="-- اختر المستوى --"
                isSearchable={false}
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم المقرر *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
                placeholder="مثال: تاريخ الكنيسة القبطية"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                وصف المقرر *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo resize-none"
                placeholder="وصف تفصيلي للمقرر ومحتواه التعليمي..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  ترتيب المقرر *
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
                />
              </div>

              <div>
                <label htmlFor="passPercentage" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  نسبة النجاح (%) *
                </label>
                <input
                  type="number"
                  id="passPercentage"
                  name="passPercentage"
                  value={formData.passPercentage}
                  onChange={handleChange}
                  required
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
                />
              </div>
            </div>

            {subject && (
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">تفعيل المقرر</span>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
            )}
          </div>

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
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                subject ? 'تحديث المقرر' : 'إضافة المقرر'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;