import React, { useState, useEffect } from 'react';
import { XMarkIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { Level, CreateLevelRequest, UpdateLevelRequest } from '../../types/lms';
import { levelsApi } from '../../services/lmsApi';

interface LevelFormProps {
  level?: Level | null;
  onClose: () => void;
  onSave: () => void;
}

const LevelForm: React.FC<LevelFormProps> = ({ level, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 1,
    passPercentage: 70,
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (level) {
      setFormData({
        name: level.name,
        description: level.description,
        order: level.order,
        passPercentage: level.passPercentage,
        isActive: level.isActive
      });
    }
  }, [level]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (level) {
        // Update existing level
        const updateData: UpdateLevelRequest = {
          id: level.id,
          ...formData
        };
        await levelsApi.update(updateData);
      } else {
        // Create new level
        const createData: CreateLevelRequest = {
          name: formData.name,
          description: formData.description,
          order: formData.order,
          passPercentage: formData.passPercentage
        };
        await levelsApi.create(createData);
      }
      onSave();
    } catch (err) {
      setError('حدث خطأ أثناء حفظ البيانات');
      console.error('Error saving level:', err);
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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-amber-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b border-amber-200 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-200 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-amber-800" />
            </button>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <h2 className="text-2xl font-bold text-amber-900 font-cairo">
                  {level ? 'تعديل المستوى الأكاديمي' : 'إضافة مستوى أكاديمي جديد'}
                </h2>
                <p className="text-amber-700 text-sm font-cairo mt-1">
                  {level ? 'قم بتعديل بيانات المستوى' : 'أدخل بيانات المستوى الجديد'}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-white" />
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
              <label htmlFor="name" className="block text-sm font-bold text-amber-900 mb-3 text-right">
                اسم المستوى الأكاديمي *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo text-lg"
                placeholder="مثال: المستوى الابتدائي الأول"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-amber-900 mb-3 text-right">
                وصف المستوى الأكاديمي *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo resize-none leading-relaxed"
                placeholder="وصف تفصيلي للمستوى الأكاديمي وأهدافه التعليمية..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="order" className="block text-sm font-bold text-amber-900 mb-3 text-right">
                  ترتيب المستوى *
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo text-lg"
                />
                <p className="text-xs text-amber-600 mt-2 text-right">ترتيب عرض المستوى في النظام</p>
              </div>

              <div>
                <label htmlFor="passPercentage" className="block text-sm font-bold text-amber-900 mb-3 text-right">
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
                  className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 focus:border-amber-600 transition-all duration-300 text-right font-cairo text-lg"
                />
                <p className="text-xs text-amber-600 mt-2 text-right">النسبة المئوية المطلوبة لاجتياز المستوى</p>
              </div>
            </div>

            {level && (
              <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
                <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                  <span className="text-sm font-bold text-amber-900">تفعيل المستوى</span>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 text-amber-600 border-2 border-amber-300 rounded focus:ring-amber-500"
                  />
                </label>
                <p className="text-xs text-amber-600 mt-2 text-right">
                  {formData.isActive ? 'المستوى مفعل ومتاح للطلاب' : 'المستوى غير مفعل ولن يظهر للطلاب'}
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-4 space-x-reverse pt-6 border-t-2 border-amber-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-amber-300 text-amber-800 rounded-2xl hover:bg-amber-50 transition-colors font-bold text-lg"
            >
              إلغاء العملية
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-700 to-orange-700 text-white rounded-2xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>جاري الحفظ...</span>
                </div>
              ) : (
                level ? 'تحديث المستوى' : 'إضافة المستوى'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelForm;