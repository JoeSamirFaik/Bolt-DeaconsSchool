import React, { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  FunnelIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
  targetRole?: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

const NotificationLogs: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'درس جديد متاح',
      message: 'تم إضافة درس جديد "قوة الصلاة" في مقرر الروحانيات',
      type: 'info',
      isRead: false,
      createdAt: '2024-12-21T10:30:00Z',
      priority: 'medium',
      actionUrl: '/lessons'
    },
    {
      id: '2',
      title: 'تذكير: قداس الأحد',
      message: 'لا تنس حضور قداس الأحد غداً في الساعة 9:00 صباحاً',
      type: 'warning',
      isRead: false,
      createdAt: '2024-12-21T08:00:00Z',
      priority: 'high'
    },
    {
      id: '3',
      title: 'تهانينا! إنجاز جديد',
      message: 'حصلت على شارة "متعلم نشط" لإكمال 5 دروس متتالية',
      type: 'success',
      isRead: true,
      createdAt: '2024-12-20T15:45:00Z',
      priority: 'low'
    },
    {
      id: '4',
      title: 'اختبار قادم',
      message: 'لديك اختبار في مقرر "تاريخ الكنيسة" يوم الجمعة القادم',
      type: 'warning',
      isRead: false,
      createdAt: '2024-12-20T14:20:00Z',
      priority: 'high'
    },
    {
      id: '5',
      title: 'رحلة إلى الدير',
      message: 'تم تأكيد مشاركتك في رحلة دير الأنبا بيشوي يوم السبت',
      type: 'success',
      isRead: true,
      createdAt: '2024-12-19T16:10:00Z',
      priority: 'medium'
    },
    {
      id: '6',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بميزات جديدة. تحقق من التحديثات الجديدة',
      type: 'info',
      isRead: true,
      createdAt: '2024-12-19T09:00:00Z',
      priority: 'low'
    },
    {
      id: '7',
      title: 'غياب غير مبرر',
      message: 'تم تسجيل غياب غير مبرر في جلسة "درس الألحان" أمس',
      type: 'error',
      isRead: false,
      createdAt: '2024-12-18T18:30:00Z',
      priority: 'high'
    },
    {
      id: '8',
      title: 'اجتماع أولياء الأمور',
      message: 'دعوة لحضور اجتماع أولياء الأمور يوم الخميس في الساعة 6 مساءً',
      type: 'info',
      isRead: true,
      createdAt: '2024-12-18T12:00:00Z',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />;
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-red-600" />;
      case 'info':
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'عاجل';
      case 'medium':
        return 'متوسط';
      case 'low':
      default:
        return 'عادي';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'read' && !notif.isRead) return false;
    if (filter === 'unread' && notif.isRead) return false;
    if (typeFilter !== 'all' && notif.type !== typeFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'منذ يوم';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    return date.toLocaleDateString('ar-EG');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل الإشعارات...</p>
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
        <div className="flex items-center justify-between mb-6">
          {/* Left side - Actions */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
              >
                <CheckCircleIcon className="w-4 h-4" />
                <span>تحديد الكل كمقروء</span>
              </button>
            )}
          </div>
          
          {/* Right side - Title & Stats */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">الإشعارات</h1>
            <p className="text-gray-600 font-cairo">
              {unreadCount > 0 ? `${unreadCount} إشعار غير مقروء` : 'جميع الإشعارات مقروءة'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 font-cairo">تصفية:</span>
          </div>
          
          {/* Read Status Filter */}
          <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              غير مقروء ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                filter === 'read'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              مقروء
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex space-x-1 space-x-reverse bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                typeFilter === 'all'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              جميع الأنواع
            </button>
            <button
              onClick={() => setTypeFilter('info')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                typeFilter === 'info'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              معلومات
            </button>
            <button
              onClick={() => setTypeFilter('warning')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                typeFilter === 'warning'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              تحذيرات
            </button>
            <button
              onClick={() => setTypeFilter('success')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                typeFilter === 'success'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              نجاح
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                  notification.isRead 
                    ? 'border-gray-200 bg-white' 
                    : `${getNotificationColor(notification.type)} border-opacity-50`
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Left side - Actions */}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف الإشعار"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        notification.isRead
                          ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                          : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                      title={notification.isRead ? 'مقروء' : 'تحديد كمقروء'}
                    >
                      {notification.isRead ? (
                        <EyeIcon className="w-4 h-4" />
                      ) : (
                        <EyeSlashIcon className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Center - Content */}
                  <div className="flex-1 text-right mx-4">
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                          {getPriorityLabel(notification.priority)}
                        </span>
                        <span className="text-sm text-gray-500 font-cairo flex items-center space-x-1 space-x-reverse">
                          <ClockIcon className="w-3 h-3" />
                          <span>{formatTimeAgo(notification.createdAt)}</span>
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold font-cairo ${
                        notification.isRead ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                    </div>
                    
                    <p className={`font-cairo leading-relaxed ${
                      notification.isRead ? 'text-gray-600' : 'text-gray-800'
                    }`}>
                      {notification.message}
                    </p>
                    
                    {notification.actionUrl && (
                      <button className="mt-3 text-amber-600 hover:text-amber-700 font-cairo font-medium text-sm hover:scale-105 transition-transform duration-200">
                        اتخاذ إجراء →
                      </button>
                    )}
                  </div>

                  {/* Right side - Icon and Status */}
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {!notification.isRead && (
                      <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse shadow-lg"></div>
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      notification.type === 'error' ? 'bg-red-100' :
                      'bg-blue-100'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <BellIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">
                {filter === 'unread' ? 'لا توجد إشعارات غير مقروءة' : 
                 filter === 'read' ? 'لا توجد إشعارات مقروءة' : 
                 'لا توجد إشعارات'}
              </h3>
              <p className="text-gray-500 font-cairo">
                {filter === 'unread' ? 'جميع إشعاراتك مقروءة!' : 'ستظهر الإشعارات الجديدة هنا'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <BellIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {notifications.length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">إجمالي الإشعارات</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <EyeSlashIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600 mb-1">
            {unreadCount}
          </div>
          <p className="text-sm text-gray-600 font-cairo">غير مقروء</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 mb-1">
            {notifications.filter(n => n.priority === 'high' && !n.isRead).length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">عاجل</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {notifications.filter(n => n.isRead).length}
          </div>
          <p className="text-sm text-gray-600 font-cairo">مقروء</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationLogs;