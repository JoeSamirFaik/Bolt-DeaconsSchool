import React, { useState } from 'react';
import { 
  XMarkIcon, 
  DocumentTextIcon, 
  UserIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types/user';

interface ChildNoteFormData {
  deaconId: string;
  title: string;
  content: string;
  category: 'academic' | 'behavioral' | 'spiritual' | 'general';
  priority: 'low' | 'medium' | 'high';
  isPrivate: boolean;
}

interface ChildNoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ChildNoteFormData) => void;
  deacons: User[];
  selectedDeaconId?: string;
}

const ChildNoteForm: React.FC<ChildNoteFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  deacons,
  selectedDeaconId 
}) => {
  const [formData, setFormData] = useState<ChildNoteFormData>({
    deaconId: selectedDeaconId || '',
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    isPrivate: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      deaconId: selectedDeaconId || '',
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      isPrivate: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  const categories = [
    { value: 'academic', label: 'أكاديمي', icon: '📚', color: 'text-blue-600' },
    { value: 'behavioral', label: 'سلوكي', icon: '👤', color: 'text-orange-600' },
    { value: 'spiritual', label: 'روحي', icon: '🙏', color: 'text-purple-600' },
    { value: 'general', label: 'عام', icon: '💬', color: 'text-gray-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إضافة ملاحظة</h2>
              <p className="text-gray-600 text-sm font-cairo">اكتب ملاحظة حول الشماس لولي الأمر</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Deacon Selection */}
          <div>
            <label htmlFor="deaconId" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الشماس *
            </label>
            <select
              id="deaconId"
              name="deaconId"
              value={formData.deaconId}
              onChange={handleChange}
              required
              disabled={!!selectedDeaconId}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo disabled:bg-gray-100"
            >
              <option value="">اختر الشماس</option>
              {deacons.map((deacon) => (
                <option key={deacon.id} value={deacon.id}>
                  {deacon.firstName} {deacon.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              عنوان الملاحظة *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
              placeholder="مثال: تقدم ممتاز في الحفظ"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-right font-cairo">
              فئة الملاحظة *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <label
                  key={category.value}
                  className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    formData.category === category.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <span className="font-medium text-gray-900 font-cairo">{category.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-right font-cairo">
              مستوى الأهمية *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.priority === 'low'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={formData.priority === 'low'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🟢</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">عادي</span>
                </div>
              </label>
              
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.priority === 'medium'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={formData.priority === 'medium'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🟡</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">متوسط</span>
                </div>
              </label>
              
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.priority === 'high'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={formData.priority === 'high'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🔴</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">مهم</span>
                </div>
              </label>
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              محتوى الملاحظة *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo resize-none"
              placeholder="اكتب ملاحظتك التفصيلية هنا..."
            />
          </div>

          {/* Privacy Setting */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <label className="flex items-center justify-between cursor-pointer">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="text-right">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900 font-cairo">ملاحظة خاصة</span>
                </div>
                <p className="text-sm text-blue-700 font-cairo">
                  إذا تم تحديدها، ستكون الملاحظة مرئية لولي الأمر فقط وليس للشماس
                </p>
              </div>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-lg hover:scale-105"
            >
              إضافة الملاحظة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildNoteForm;