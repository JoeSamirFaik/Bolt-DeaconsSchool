import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LiturgyFormData {
  date: string;
  liturgyType: string;
  location: string;
  notes: string;
}

interface LiturgyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LiturgyFormData) => void;
}

const LiturgyForm: React.FC<LiturgyFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<LiturgyFormData>({
    date: '',
    liturgyType: '',
    location: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ date: '', liturgyType: '', location: '', notes: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-900 font-cairo">إضافة قداس</h2>
            <p className="text-gray-600 text-sm font-cairo">سجل حضورك للقداديس</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              التاريخ *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              نوع القداس *
            </label>
            <select
              value={formData.liturgyType}
              onChange={(e) => setFormData({ ...formData, liturgyType: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
            >
              <option value="">اختر نوع القداس</option>
              <option value="قداس الأحد">قداس الأحد</option>
              <option value="قداس السبت">قداس السبت</option>
              <option value="قداس الأعياد">قداس الأعياد</option>
              <option value="قداس خاص">قداس خاص</option>
              <option value="صلاة باكر">صلاة باكر</option>
              <option value="صلاة عشية">صلاة عشية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              المكان *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
              placeholder="مثال: الكنيسة الكبرى"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              ملاحظات
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo resize-none"
              placeholder="ملاحظات إضافية..."
            />
          </div>

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
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              إضافة القداس
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiturgyForm;