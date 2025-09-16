import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '48px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '16px',
      fontFamily: 'Cairo, sans-serif',
      '&:hover': {
        borderColor: '#9ca3af'
      },
      '&:focus-within': {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#374151'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'Cairo, sans-serif',
      textAlign: 'right',
      color: '#9ca3af'
    })
  };

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
                {level ? 'تعديل المستوى' : 'إضافة مستوى جديد'}
              </h2>
              <p className="text-gray-600 text-sm font-cairo">
                {level ? 'قم بتعديل بيانات المستوى' : 'أدخل بيانات المستوى الجديد'}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-blue-600" />
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                اسم المستوى *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo"
                placeholder="مثال: المستوى الابتدائي الأول"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                وصف المستوى *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right font-cairo resize-none"
                placeholder="وصف تفصيلي للمستوى وأهدافه التعليمية..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2 text-right">
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

            {level && (
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">تفعيل المستوى</span>
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