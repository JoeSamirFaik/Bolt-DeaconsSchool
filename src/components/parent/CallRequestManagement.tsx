import React, { useState, useEffect } from 'react';
import { 
  PhoneIcon, 
  PlusIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import CallRequestForm from './CallRequestForm';

interface CallRequest {
  id: string;
  parentId: string;
  requestType: 'parent-servant' | 'parent-deacon';
  topic: string;
  preferredDate: string;
  preferredTime: string;
  alternativeDate: string;
  alternativeTime: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  scheduledDate?: string;
  scheduledTime?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

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

const CallRequestManagement: React.FC = () => {
  const { user } = useAuth();
  const [callRequests, setCallRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Mock call requests data
  const mockCallRequests: CallRequest[] = [
    {
      id: '1',
      parentId: user?.id || '3',
      requestType: 'parent-servant',
      topic: 'مناقشة تقدم الطفل الأكاديمي',
      preferredDate: '2024-12-23',
      preferredTime: '18:00',
      alternativeDate: '2024-12-24',
      alternativeTime: '19:00',
      urgency: 'medium',
      status: 'scheduled',
      notes: 'أريد مناقشة تقدم يوحنا في مقرر تاريخ الكنيسة',
      scheduledDate: '2024-12-23',
      scheduledTime: '18:00',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      createdAt: '2024-12-21T10:00:00Z',
      updatedAt: '2024-12-21T15:00:00Z'
    },
    {
      id: '2',
      parentId: user?.id || '3',
      requestType: 'parent-deacon',
      topic: 'طلب إرشادات تربوية',
      preferredDate: '2024-12-25',
      preferredTime: '16:00',
      alternativeDate: '2024-12-26',
      alternativeTime: '17:00',
      urgency: 'low',
      status: 'pending',
      notes: 'أريد التحدث مع يوحنا حول أهمية الصلاة اليومية',
      createdAt: '2024-12-20T14:30:00Z',
      updatedAt: '2024-12-20T14:30:00Z'
    },
    {
      id: '3',
      parentId: user?.id || '3',
      requestType: 'parent-servant',
      topic: 'مشاكل في الحضور أو السلوك',
      preferredDate: '2024-12-18',
      preferredTime: '19:00',
      alternativeDate: '',
      alternativeTime: '',
      urgency: 'high',
      status: 'completed',
      notes: 'كان هناك تأخير في الحضور الأسبوع الماضي',
      scheduledDate: '2024-12-18',
      scheduledTime: '19:00',
      createdAt: '2024-12-17T16:00:00Z',
      updatedAt: '2024-12-18T20:00:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setCallRequests(mockCallRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmitRequest = (data: CallRequestData) => {
    const newRequest: CallRequest = {
      id: Math.random().toString(36).substr(2, 9),
      parentId: user?.id || '3',
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setCallRequests(prev => [newRequest, ...prev]);
    setShowRequestForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'scheduled':
        return 'مجدولة';
      case 'completed':
        return 'مكتملة';
      case 'cancelled':
        return 'ملغية';
      default:
        return status;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'عاجل';
      case 'medium':
        return 'متوسط';
      case 'low':
        return 'عادي';
      default:
        return urgency;
    }
  };

  const getRequestTypeLabel = (type: string) => {
    switch (type) {
      case 'parent-servant':
        return 'مع الخادم';
      case 'parent-deacon':
        return 'مع الطفل';
      default:
        return type;
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'parent-servant':
        return <UserIcon className="w-5 h-5 text-purple-600" />;
      case 'parent-deacon':
        return <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600" />;
      default:
        return <PhoneIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل طلبات المكالمات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Action Button */}
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            <span>طلب مكالمة جديدة</span>
          </button>
          
          {/* Right side - Title & Description */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">طلبات المكالمات</h1>
            <p className="text-gray-600 font-cairo">احجز مكالمات مع الخادم أو طفلك</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <PhoneIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {callRequests.length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">إجمالي الطلبات</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ClockIcon className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {callRequests.filter(r => r.status === 'pending').length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">في الانتظار</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {callRequests.filter(r => r.status === 'scheduled').length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">مجدولة</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {callRequests.filter(r => r.status === 'completed').length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">مكتملة</p>
        </div>
      </div>

      {/* Call Requests List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {callRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  {/* Left side - Status and Actions */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(request.urgency)}`}>
                      {getUrgencyLabel(request.urgency)}
                    </span>
                    {request.status === 'scheduled' && request.meetingLink && (
                      <a
                        href={request.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors"
                      >
                        انضم للمكالمة
                      </a>
                    )}
                  </div>

                  {/* Center - Request Details */}
                  <div className="flex-1 text-right mx-6">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <span className="text-sm text-gray-500 font-cairo">
                        {new Date(request.createdAt).toLocaleDateString('ar-EG')}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 font-cairo">
                        {request.topic}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mb-3">
                      <span className="font-cairo">
                        📅 {new Date(request.preferredDate).toLocaleDateString('ar-EG')}
                      </span>
                      <span className="font-cairo">⏰ {request.preferredTime}</span>
                      <span className="font-cairo">👥 {getRequestTypeLabel(request.requestType)}</span>
                    </div>
                    
                    {request.notes && (
                      <p className="text-gray-600 font-cairo text-sm mb-3">{request.notes}</p>
                    )}
                    
                    {request.status === 'scheduled' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 space-x-reverse text-blue-800">
                          <CalendarIcon className="w-4 h-4" />
                          <span className="font-cairo text-sm">
                            مجدولة: {new Date(request.scheduledDate!).toLocaleDateString('ar-EG')} في {request.scheduledTime}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right side - Request Type Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                    {getRequestTypeIcon(request.requestType)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {callRequests.length === 0 && (
            <div className="text-center py-12">
              <PhoneIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد طلبات مكالمات</h3>
              <p className="text-gray-500 font-cairo">ابدأ بطلب مكالمة جديدة للتواصل مع الخادم أو طفلك</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-purple-900 mb-4 text-right font-cairo">نصائح للمكالمات الفعالة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/70 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 font-cairo mb-2">📞 مع الخادم</h4>
            <ul className="text-sm text-purple-700 font-cairo space-y-1">
              <li>• ناقش التقدم الأكاديمي لطفلك</li>
              <li>• اطلب نصائح تربوية</li>
              <li>• استفسر عن الأنشطة الإضافية</li>
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <h4 className="font-semibold text-indigo-800 font-cairo mb-2">👨‍👩‍👧 مع الطفل</h4>
            <ul className="text-sm text-indigo-700 font-cairo space-y-1">
              <li>• تحدث عن التحديات الدراسية</li>
              <li>• شجع على الاستمرار</li>
              <li>• ناقش الأهداف المستقبلية</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call Request Form Modal */}
      <CallRequestForm
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
};

export default CallRequestManagement;