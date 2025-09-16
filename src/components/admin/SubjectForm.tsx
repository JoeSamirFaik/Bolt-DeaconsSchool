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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-blue-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 border-b border-blue-200 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-200 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-blue-800" />
            </button>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-blue-900 font-cairo">
                  {subject ? 'تعديل المقرر الدراسي' : 'إضافة مقرر دراسي جديد'}
                </h2>
                <p className="text-blue-700 text-sm font-cairo mt-1">
                  {subject ? 'قم بتعديل بيانات المقرر' : 'أدخل بيانات المقرر الجديد'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <BookOpenIcon className="w-6 h-6 text-white" />
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

          <div className="space-y-6">
            <div>
              <label htmlFor="levelId" className="block text-sm font-bold text-blue-900 mb-3 text-right">
                المستوى الأكاديمي *
              </label>
              <select
                id="levelId"
                name="levelId"
                value={formData.levelId}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-right font-cairo text-lg bg-white"
              >
                <option value="">-- اختر المستوى الأكاديمي --</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-blue-600 mt-2 text-right">اختر المستوى الذي ينتمي إليه هذا المقرر</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-bold text-blue-900 mb-3 text-right">
                اسم المقرر الدراسي *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-right font-cairo text-lg"
                placeholder="مثال: تاريخ الكنيسة القبطية"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-blue-900 mb-3 text-right">
                وصف المقرر الدراسي *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-right font-cairo resize-none leading-relaxed"
                placeholder="وصف تفصيلي للمقرر الدراسي ومحتواه التعليمي..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="order" className="block text-sm font-bold text-blue-900 mb-3 text-right">
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
                  className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-right font-cairo text-lg"
                />
                <p className="text-xs text-blue-600 mt-2 text-right">ترتيب عرض المقرر في النظام</p>
              </div>

              <div>
                <label htmlFor="passPercentage" className="block text-sm font-bold text-blue-900 mb-3 text-right">
                  نسبة النجاح المطلوبة (%) *
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
                  className="w-full px-4 py-4 border-2 border-blue-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all duration-300 text-right font-cairo text-lg"
                />
                <p className="text-xs text-blue-600 mt-2 text-right">النسبة المئوية المطلوبة لاجتياز المقرر</p>
              </div>
            </div>

            {subject && (
              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                  <span className="text-sm font-bold text-blue-900">تفعيل المقرر</span>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-blue-500"
                  />
                </label>
                <p className="text-xs text-blue-600 mt-2 text-right">
                  {formData.isActive ? 'المقرر مفعل ومتاح للطلاب' : 'المقرر غير مفعل ولن يظهر للطلاب'}
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 space-x-reverse pt-6 border-t-2 border-blue-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-blue-300 text-blue-800 rounded-2xl hover:bg-blue-50 transition-colors font-bold text-lg"
            >
              إلغاء العملية
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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