import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PrayerFormData {
  date: string;
  prayerType: string;
  duration: number;
  location: string;
  notes: string;
}

interface PrayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PrayerFormData) => void;
}

const PrayerForm: React.FC<PrayerFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<PrayerFormData>({
    date: '',
    prayerType: '',
    duration: 15,
    location: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ date: '', prayerType: '', duration: 15, location: '', notes: '' });
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
            <h2 className="text-xl font-bold text-gray-900 font-cairo">إضافة صلاة</h2>
            <p className="text-gray-600 text-sm font-cairo">سجل صلواتك الشخصية</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              نوع الصلاة *
            </label>
            <select
              value={formData.prayerType}
              onChange={(e) => setFormData({ ...formData, prayerType: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
            >
              <option value="">اختر نوع الصلاة</option>
              <option value="صلاة الصبح">صلاة الصبح</option>
              <option value="صلاة المساء">صلاة المساء</option>
              <option value="صلاة الساعات">صلاة الساعات</option>
              <option value="صلاة التسبيح">صلاة التسبيح</option>
              <option value="صلاة شخصية">صلاة شخصية</option>
              <option value="صلاة جماعية">صلاة جماعية</option>
              <option value="صلاة التوبة">صلاة التوبة</option>
              <option value="صلاة الشكر">صلاة الشكر</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              المدة (دقيقة) *
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
            >
              <option value={5}>5 دقائق</option>
              <option value={10}>10 دقائق</option>
              <option value={15}>15 دقيقة</option>
              <option value={20}>20 دقيقة</option>
              <option value={30}>30 دقيقة</option>
              <option value={45}>45 دقيقة</option>
              <option value={60}>ساعة كاملة</option>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
              placeholder="مثال: المنزل، الكنيسة، العمل"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo resize-none"
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
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              إضافة الصلاة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrayerForm;