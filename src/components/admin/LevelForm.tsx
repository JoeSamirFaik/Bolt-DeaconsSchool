import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 font-cairo">
              {level ? 'تعديل المستوى' : 'إضافة مستوى جديد'}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
              <p className="text-red-600 text-sm font-medium text-right">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              اسم المستوى *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              placeholder="مثال: المستوى الابتدائي"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2 text-right">
              وصف المستوى *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo resize-none"
              placeholder="وصف تفصيلي للمستوى الأكاديمي..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="order" className="block text-sm font-bold text-gray-700 mb-2 text-right">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              />
            </div>

            <div>
              <label htmlFor="passPercentage" className="block text-sm font-bold text-gray-700 mb-2 text-right">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 text-right font-cairo"
              />
            </div>
          </div>

          {level && (
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-bold text-gray-700">المستوى نشط</span>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              {loading ? 'جاري الحفظ...' : level ? 'تحديث المستوى' : 'إضافة المستوى'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelForm;