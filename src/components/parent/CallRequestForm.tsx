import React, { useState } from 'react';
import { 
  XMarkIcon, 
  PhoneIcon, 
  CalendarIcon, 
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CallRequestData {
  requestType: 'parent-servant' | 'parent-deacon';
  preferredDate: string;
  preferredTime: string;
  alternativeDate: string;
  alternativeTime: string;
  topic: string;
  urgency: 'low' | 'medium' | 'high';
  notes: string;
}

interface CallRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CallRequestData) => void;
}

const CallRequestForm: React.FC<CallRequestFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CallRequestData>({
    requestType: 'parent-servant',
    preferredDate: '',
    preferredTime: '',
    alternativeDate: '',
    alternativeTime: '',
    topic: '',
    urgency: 'medium',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      requestType: 'parent-servant',
      preferredDate: '',
      preferredTime: '',
      alternativeDate: '',
      alternativeTime: '',
      topic: '',
      urgency: 'medium',
      notes: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  const topics = [
    'مناقشة تقدم الطفل الأكاديمي',
    'مشاكل في الحضور أو السلوك',
    'استفسارات حول المنهج',
    'طلب إرشادات تربوية',
    'مناقشة الأنشطة الإضافية',
    'مشاكل شخصية تؤثر على الدراسة',
    'اقتراحات لتحسين الأداء',
    'أخرى'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 font-cairo">طلب مكالمة</h2>
              <p className="text-gray-600 text-sm font-cairo">احجز مكالمة مع الخادم أو طفلك</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <PhoneIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Call Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-right font-cairo">
              نوع المكالمة *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                formData.requestType === 'parent-servant'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="requestType"
                  value="parent-servant"
                  checked={formData.requestType === 'parent-servant'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <UserIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900 font-cairo">مع الخادم</span>
                  <p className="text-xs text-gray-600 font-cairo mt-1">مناقشة تقدم الطفل مع المعلم</p>
                </div>
              </label>
              
              <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                formData.requestType === 'parent-deacon'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="requestType"
                  value="parent-deacon"
                  checked={formData.requestType === 'parent-deacon'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900 font-cairo">مع الطفل</span>
                  <p className="text-xs text-gray-600 font-cairo mt-1">محادثة مباشرة مع طفلك</p>
                </div>
              </label>
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              موضوع المكالمة *
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo"
            >
              <option value="">اختر موضوع المكالمة</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-right font-cairo">
              مستوى الأولوية *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.urgency === 'low'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="urgency"
                  value="low"
                  checked={formData.urgency === 'low'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🟢</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">عادي</span>
                </div>
              </label>
              
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.urgency === 'medium'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="urgency"
                  value="medium"
                  checked={formData.urgency === 'medium'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🟡</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">متوسط</span>
                </div>
              </label>
              
              <label className={`cursor-pointer p-3 border-2 rounded-xl transition-all ${
                formData.urgency === 'high'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="urgency"
                  value="high"
                  checked={formData.urgency === 'high'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-1">🔴</div>
                  <span className="text-sm font-medium text-gray-900 font-cairo">عاجل</span>
                </div>
              </label>
            </div>
          </div>

          {/* Preferred Time Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h3 className="text-md font-bold text-purple-900 mb-3 text-right font-cairo">الموعد المفضل</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                    التاريخ *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                    الوقت *
                  </label>
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="text-md font-bold text-indigo-900 mb-3 text-right font-cairo">موعد بديل</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="alternativeDate" className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    id="alternativeDate"
                    name="alternativeDate"
                    value={formData.alternativeDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="alternativeTime" className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                    الوقت
                  </label>
                  <input
                    type="time"
                    id="alternativeTime"
                    name="alternativeTime"
                    value={formData.alternativeTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              ملاحظات إضافية
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo resize-none"
              placeholder="أي معلومات إضافية تود مناقشتها..."
            />
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-colors font-medium shadow-lg hover:scale-105"
            >
              إرسال طلب المكالمة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallRequestForm;