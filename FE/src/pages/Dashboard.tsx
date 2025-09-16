import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, BarChart3, Bell, Calendar, Award, Clock, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  مرحباً، {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600">
                  {user?.role === 'deacon' && 'شماس'}
                  {user?.role === 'servant' && 'خادم'}
                  {user?.role === 'parent' && 'ولي أمر'}
                  {user?.role === 'admin' && 'مدير النظام'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الدروس المكتملة</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">النقاط المكتسبة</p>
                <p className="text-2xl font-bold text-gray-900">850</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">ساعات الدراسة</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">معدل التقدم</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Lessons */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">الدروس الحديثة</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="p-2 bg-blue-100 rounded-lg mr-4">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">درس التاريخ الكنسي {item}</h3>
                        <p className="text-sm text-gray-600">المستوى الأول • 30 دقيقة</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        منذ {item} أيام
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">إجراءات سريعة</h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center p-3 text-right bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-blue-700">متابعة الدرس الحالي</span>
                </button>
                <button className="w-full flex items-center p-3 text-right bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-700">عرض التقدم</span>
                </button>
                <button className="w-full flex items-center p-3 text-right bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-purple-700">الجدول الزمني</span>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">الإشعارات</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">درس جديد متاح في التاريخ الكنسي</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">تم إكمال درس الصلاة بنجاح</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};