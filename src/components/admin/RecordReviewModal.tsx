import React, { useState } from 'react';
import { 
  XMarkIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  PhotoIcon,
  PhoneIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { DeaconRecord, DeaconBalance, ReviewRecordRequest } from '../../types/approval';
import { User } from '../../types/user';

interface RecordReviewModalProps {
  record: DeaconRecord;
  deacon: User;
  balance?: DeaconBalance | null;
  onClose: () => void;
  onReview: (reviewData: ReviewRecordRequest) => void;
}

const RecordReviewModal: React.FC<RecordReviewModalProps> = ({ 
  record, 
  deacon, 
  balance, 
  onClose, 
  onReview 
}) => {
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'needs_revision'>('approved');
  const [reviewNotes, setReviewNotes] = useState('');
  const [adjustedPoints, setAdjustedPoints] = useState(record.pointsRequested);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reviewData: ReviewRecordRequest = {
        recordId: record.id,
        status: reviewAction,
        reviewNotes: reviewNotes.trim() || undefined,
        adjustedPoints: reviewAction === 'approved' && adjustedPoints !== record.pointsRequested 
          ? adjustedPoints 
          : undefined
      };
      
      await onReview(reviewData);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'liturgy':
        return <span className="text-3xl">⛪</span>;
      case 'prayer':
        return <span className="text-3xl">🙏</span>;
      case 'personal_study':
        return <DocumentTextIcon className="w-8 h-8 text-blue-600" />;
      case 'community_service':
        return <span className="text-3xl">❤️</span>;
      default:
        return <DocumentTextIcon className="w-8 h-8 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'liturgy':
        return 'قداس/صلاة كنسية';
      case 'prayer':
        return 'صلاة شخصية';
      case 'personal_study':
        return 'دراسة شخصية';
      case 'community_service':
        return 'خدمة مجتمعية';
      default:
        return type;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'approved':
        return 'border-green-500 bg-green-50';
      case 'rejected':
        return 'border-red-500 bg-red-50';
      case 'needs_revision':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
              <h2 className="text-xl font-bold text-gray-900 font-cairo">مراجعة سجل النشاط</h2>
              <p className="text-gray-600 text-sm font-cairo">مراجعة واعتماد نشاط الشماس</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <ClipboardDocumentCheckIcon className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Record Details */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-right flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 text-sm rounded-full font-medium">
                    {getTypeLabel(record.type)}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 font-cairo">
                    {record.title}
                  </h3>
                </div>
                
                <p className="text-gray-700 font-cairo text-lg mb-4 leading-relaxed">
                  {record.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-gray-600 font-cairo">{new Date(record.date).toLocaleDateString('ar-EG')}</span>
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-gray-600 font-cairo">{record.location}</span>
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  {record.duration && (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-gray-600 font-cairo">{record.duration} دقيقة</span>
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-gray-600 font-cairo">
                      {new Date(record.submittedAt).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="text-gray-500 font-cairo">تاريخ الإرسال:</span>
                  </div>
                </div>

                {record.notes && (
                  <div className="mt-4 bg-white rounded-lg p-3 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 font-cairo mb-2">ملاحظات الشماس:</h4>
                    <p className="text-gray-700 font-cairo">{record.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
                {getTypeIcon(record.type)}
              </div>
            </div>
          </div>

          {/* Deacon Info & Balance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deacon Info */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 font-cairo mb-4">معلومات الشماس</h3>
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="text-right">
                  <h4 className="font-bold text-blue-900 font-cairo text-lg">
                    {deacon.firstName} {deacon.lastName}
                  </h4>
                  <p className="text-blue-700 font-cairo">{deacon.email}</p>
                  {deacon.deaconInfo?.enrollmentDate && (
                    <p className="text-sm text-blue-600 font-cairo">
                      مسجل منذ {new Date(deacon.deaconInfo.enrollmentDate).toLocaleDateString('ar-EG')}
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Current Balance */}
            {balance && (
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 font-cairo mb-4">رصيد النقاط الحالي</h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{balance.totalPoints}</div>
                  <div className="text-sm text-gray-600 font-cairo">إجمالي النقاط</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{balance.liturgyPoints}</div>
                    <div className="text-xs text-gray-600 font-cairo">قداسات</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{balance.prayerPoints}</div>
                    <div className="text-xs text-gray-600 font-cairo">صلوات</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">{balance.studyPoints}</div>
                    <div className="text-xs text-gray-600 font-cairo">دراسة</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-red-600">{balance.servicePoints}</div>
                    <div className="text-xs text-gray-600 font-cairo">خدمة</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Evidence Details */}
          {record.evidence && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 font-cairo mb-4">الأدلة المرفقة</h3>
              <div className="space-y-4">
                {record.evidence.witnessName && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 font-cairo mb-2">معلومات الشاهد</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-gray-700 font-cairo">{record.evidence.witnessName}</span>
                        <UserIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      {record.evidence.witnessContact && (
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-gray-700 font-cairo">{record.evidence.witnessContact}</span>
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {record.evidence.photos && record.evidence.photos.length > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 font-cairo mb-2">الصور المرفقة</h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-gray-700 font-cairo">{record.evidence.photos.length} صورة</span>
                      <PhotoIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
                
                {record.evidence.documents && record.evidence.documents.length > 0 && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 font-cairo mb-2">المستندات المرفقة</h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-gray-700 font-cairo">{record.evidence.documents.length} مستند</span>
                      <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Review Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 font-cairo mb-6 text-right">قرار المراجعة</h3>
            
            {/* Action Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                reviewAction === 'approved' ? getActionColor('approved') : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="reviewAction"
                  value="approved"
                  checked={reviewAction === 'approved'}
                  onChange={(e) => setReviewAction(e.target.value as any)}
                  className="sr-only"
                />
                <div className="text-center">
                  <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900 font-cairo">اعتماد</span>
                  <p className="text-xs text-gray-600 font-cairo mt-1">إضافة النقاط للرصيد</p>
                </div>
              </label>
              
              <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                reviewAction === 'needs_revision' ? getActionColor('needs_revision') : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="reviewAction"
                  value="needs_revision"
                  checked={reviewAction === 'needs_revision'}
                  onChange={(e) => setReviewAction(e.target.value as any)}
                  className="sr-only"
                />
                <div className="text-center">
                  <ExclamationTriangleIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900 font-cairo">يحتاج مراجعة</span>
                  <p className="text-xs text-gray-600 font-cairo mt-1">طلب معلومات إضافية</p>
                </div>
              </label>
              
              <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                reviewAction === 'rejected' ? getActionColor('rejected') : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="reviewAction"
                  value="rejected"
                  checked={reviewAction === 'rejected'}
                  onChange={(e) => setReviewAction(e.target.value as any)}
                  className="sr-only"
                />
                <div className="text-center">
                  <XCircleIcon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900 font-cairo">رفض</span>
                  <p className="text-xs text-gray-600 font-cairo mt-1">عدم إضافة النقاط</p>
                </div>
              </label>
            </div>

            {/* Points Adjustment (for approved records) */}
            {reviewAction === 'approved' && (
              <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                <h4 className="font-semibold text-green-900 font-cairo mb-3 text-right">تعديل النقاط</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      النقاط المطلوبة
                    </label>
                    <input
                      type="number"
                      value={record.pointsRequested}
                      disabled
                      className="w-full px-4 py-3 border border-green-300 rounded-xl bg-green-100 text-green-800 text-right font-cairo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      النقاط المعتمدة
                    </label>
                    <input
                      type="number"
                      value={adjustedPoints}
                      onChange={(e) => setAdjustedPoints(parseInt(e.target.value) || 0)}
                      min="0"
                      max={record.pointsRequested * 2}
                      className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    />
                  </div>
                </div>
                
                {adjustedPoints !== record.pointsRequested && (
                  <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-yellow-800 font-cairo text-sm">
                      ⚠️ تم تعديل النقاط من {record.pointsRequested} إلى {adjustedPoints}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Review Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                ملاحظات المراجعة {(reviewAction === 'rejected' || reviewAction === 'needs_revision') && '*'}
              </label>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                required={reviewAction === 'rejected' || reviewAction === 'needs_revision'}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo resize-none"
                placeholder={
                  reviewAction === 'approved' 
                    ? 'ملاحظات إضافية (اختياري)...'
                    : reviewAction === 'rejected'
                    ? 'يرجى توضيح سبب الرفض...'
                    : 'يرجى توضيح ما يحتاج إلى مراجعة...'
                }
              />
            </div>

            {/* Balance Preview (for approved records) */}
            {reviewAction === 'approved' && balance && (
              <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
                <h4 className="font-semibold text-purple-900 font-cairo mb-3 text-right">معاينة الرصيد بعد الاعتماد</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {balance.totalPoints + adjustedPoints}
                    </div>
                    <div className="text-xs text-gray-600 font-cairo">الإجمالي</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">
                      {balance.liturgyPoints + (record.type === 'liturgy' ? adjustedPoints : 0)}
                    </div>
                    <div className="text-xs text-gray-600 font-cairo">قداسات</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {balance.prayerPoints + (record.type === 'prayer' ? adjustedPoints : 0)}
                    </div>
                    <div className="text-xs text-gray-600 font-cairo">صلوات</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {balance.studyPoints + (record.type === 'personal_study' ? adjustedPoints : 0)}
                    </div>
                    <div className="text-xs text-gray-600 font-cairo">دراسة</div>
                  </div>
                  <div className="bg-white/70 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-red-600">
                      {balance.servicePoints + (record.type === 'community_service' ? adjustedPoints : 0)}
                    </div>
                    <div className="text-xs text-gray-600 font-cairo">خدمة</div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
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
                disabled={loading || ((reviewAction === 'rejected' || reviewAction === 'needs_revision') && !reviewNotes.trim())}
                className={`flex-1 px-6 py-3 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                  reviewAction === 'approved' 
                    ? 'bg-green-600 hover:bg-green-700'
                    : reviewAction === 'rejected'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري المعالجة...</span>
                  </div>
                ) : (
                  reviewAction === 'approved' ? 'اعتماد السجل' :
                  reviewAction === 'rejected' ? 'رفض السجل' :
                  'طلب مراجعة'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'approved':
      return 'border-green-500 bg-green-50';
    case 'rejected':
      return 'border-red-500 bg-red-50';
    case 'needs_revision':
      return 'border-blue-500 bg-blue-50';
    default:
      return 'border-gray-200 bg-white';
  }
};

export default RecordReviewModal;