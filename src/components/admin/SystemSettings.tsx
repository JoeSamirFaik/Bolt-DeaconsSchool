import React, { useState, useEffect } from 'react';
import { 
  Cog6ToothIcon,
  TrophyIcon,
  BellIcon,
  CalendarIcon,
  AcademicCapIcon,
  DocumentArrowDownIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  ServerIcon,
  KeyIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface SystemConfig {
  pointsSystem: {
    liturgyPoints: number;
    prayerPoints: number;
    lessonPoints: number;
    servicePoints: number;
    achievementBonus: number;
    streakBonus: number;
  };
  academicSettings: {
    currentAcademicYear: string;
    termStartDate: string;
    termEndDate: string;
    registrationPeriod: {
      start: string;
      end: string;
    };
    defaultPassPercentage: number;
    maxRetakeAttempts: number;
  };
  attendanceSettings: {
    lateThresholdMinutes: number;
    excusedRequiresApproval: boolean;
    autoMarkAbsentAfterHours: number;
    attendanceGracePeriod: number;
  };
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    reminderHours: number;
    digestFrequency: 'daily' | 'weekly' | 'monthly';
  };
  systemSettings: {
    maintenanceMode: boolean;
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    sessionTimeout: number;
    maxFileSize: number;
    supportedLanguages: string[];
  };
  backupSettings: {
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    retentionDays: number;
    lastBackup?: string;
  };
}

const SystemSettings: React.FC = () => {
  const [config, setConfig] = useState<SystemConfig>({
    pointsSystem: {
      liturgyPoints: 50,
      prayerPoints: 25,
      lessonPoints: 50,
      servicePoints: 75,
      achievementBonus: 100,
      streakBonus: 10
    },
    academicSettings: {
      currentAcademicYear: '2024-2025',
      termStartDate: '2024-09-01',
      termEndDate: '2025-06-30',
      registrationPeriod: {
        start: '2024-08-01',
        end: '2024-08-31'
      },
      defaultPassPercentage: 70,
      maxRetakeAttempts: 3
    },
    attendanceSettings: {
      lateThresholdMinutes: 15,
      excusedRequiresApproval: true,
      autoMarkAbsentAfterHours: 2,
      attendanceGracePeriod: 10
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      reminderHours: 24,
      digestFrequency: 'weekly'
    },
    systemSettings: {
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: false,
      sessionTimeout: 60,
      maxFileSize: 10,
      supportedLanguages: ['ar', 'en']
    },
    backupSettings: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      lastBackup: '2024-12-21T02:00:00Z'
    }
  });

  const [activeTab, setActiveTab] = useState<'points' | 'academic' | 'attendance' | 'notifications' | 'system' | 'backup'>('points');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    setLoading(true);
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (section: keyof SystemConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedConfigChange = (section: keyof SystemConfig, nestedField: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedField]: {
          ...(prev[section] as any)[nestedField],
          [field]: value
        }
      }
    }));
  };

  const tabs = [
    { id: 'points', label: 'نظام النقاط', icon: TrophyIcon, color: 'from-amber-500 to-orange-500' },
    { id: 'academic', label: 'الإعدادات الأكاديمية', icon: AcademicCapIcon, color: 'from-blue-500 to-indigo-500' },
    { id: 'attendance', label: 'إعدادات الحضور', icon: ClockIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'notifications', label: 'الإشعارات', icon: BellIcon, color: 'from-purple-500 to-indigo-500' },
    { id: 'system', label: 'إعدادات النظام', icon: ServerIcon, color: 'from-red-500 to-rose-500' },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: ShieldCheckIcon, color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 ${
              saveStatus === 'saved' 
                ? 'bg-green-600 text-white' 
                : saveStatus === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري الحفظ...</span>
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                <span>تم الحفظ</span>
              </>
            ) : saveStatus === 'error' ? (
              <>
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span>خطأ في الحفظ</span>
              </>
            ) : (
              <>
                <Cog6ToothIcon className="w-5 h-5" />
                <span>حفظ الإعدادات</span>
              </>
            )}
          </button>
          
          {/* Title */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">إعدادات النظام</h1>
            <p className="text-gray-600 font-cairo">تخصيص وإدارة جميع جوانب النظام</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-br ${tab.color} text-white shadow-lg scale-105`
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium font-cairo">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Points System Tab */}
        {activeTab === 'points' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <TrophyIcon className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات نظام النقاط</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 font-cairo">نقاط الأنشطة الدينية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      نقاط القداسات والصلوات الكنسية
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.liturgyPoints}
                      onChange={(e) => handleConfigChange('pointsSystem', 'liturgyPoints', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      نقاط الصلوات الشخصية
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.prayerPoints}
                      onChange={(e) => handleConfigChange('pointsSystem', 'prayerPoints', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 font-cairo">نقاط التعلم والخدمة</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                      نقاط إكمال الدروس
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.lessonPoints}
                      onChange={(e) => handleConfigChange('pointsSystem', 'lessonPoints', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                      نقاط الخدمة المجتمعية
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.servicePoints}
                      onChange={(e) => handleConfigChange('pointsSystem', 'servicePoints', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-4 font-cairo">نقاط المكافآت</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                      مكافأة الإنجازات
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.achievementBonus}
                      onChange={(e) => handleConfigChange('pointsSystem', 'achievementBonus', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-2 text-right font-cairo">
                      مكافأة الحضور المتتالي (يومياً)
                    </label>
                    <input
                      type="number"
                      value={config.pointsSystem.streakBonus}
                      onChange={(e) => handleConfigChange('pointsSystem', 'streakBonus', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Points Preview */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-lg font-bold text-amber-900 mb-4 font-cairo">معاينة نظام النقاط</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">⛪</div>
                  <div className="text-lg font-bold text-amber-600">{config.pointsSystem.liturgyPoints}</div>
                  <div className="text-sm text-gray-600 font-cairo">قداس/صلاة كنسية</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">🙏</div>
                  <div className="text-lg font-bold text-amber-600">{config.pointsSystem.prayerPoints}</div>
                  <div className="text-sm text-gray-600 font-cairo">صلاة شخصية</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">📚</div>
                  <div className="text-lg font-bold text-amber-600">{config.pointsSystem.lessonPoints}</div>
                  <div className="text-sm text-gray-600 font-cairo">درس مكتمل</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">❤️</div>
                  <div className="text-lg font-bold text-amber-600">{config.pointsSystem.servicePoints}</div>
                  <div className="text-sm text-gray-600 font-cairo">خدمة مجتمعية</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academic Settings Tab */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">الإعدادات الأكاديمية</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 font-cairo">السنة الأكاديمية الحالية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                      السنة الأكاديمية
                    </label>
                    <input
                      type="text"
                      value={config.academicSettings.currentAcademicYear}
                      onChange={(e) => handleConfigChange('academicSettings', 'currentAcademicYear', e.target.value)}
                      className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                        تاريخ البداية
                      </label>
                      <input
                        type="date"
                        value={config.academicSettings.termStartDate}
                        onChange={(e) => handleConfigChange('academicSettings', 'termStartDate', e.target.value)}
                        className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-2 text-right font-cairo">
                        تاريخ النهاية
                      </label>
                      <input
                        type="date"
                        value={config.academicSettings.termEndDate}
                        onChange={(e) => handleConfigChange('academicSettings', 'termEndDate', e.target.value)}
                        className="w-full px-4 py-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-cairo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-lg font-bold text-indigo-900 mb-4 font-cairo">فترة التسجيل</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                        بداية التسجيل
                      </label>
                      <input
                        type="date"
                        value={config.academicSettings.registrationPeriod.start}
                        onChange={(e) => handleNestedConfigChange('academicSettings', 'registrationPeriod', 'start', e.target.value)}
                        className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                        نهاية التسجيل
                      </label>
                      <input
                        type="date"
                        value={config.academicSettings.registrationPeriod.end}
                        onChange={(e) => handleNestedConfigChange('academicSettings', 'registrationPeriod', 'end', e.target.value)}
                        className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                        نسبة النجاح الافتراضية (%)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={config.academicSettings.defaultPassPercentage}
                        onChange={(e) => handleConfigChange('academicSettings', 'defaultPassPercentage', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                        عدد محاولات الإعادة
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={config.academicSettings.maxRetakeAttempts}
                        onChange={(e) => handleConfigChange('academicSettings', 'maxRetakeAttempts', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Settings Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <ClockIcon className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات الحضور</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 font-cairo">قواعد الحضور</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      حد التأخير (دقيقة)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={config.attendanceSettings.lateThresholdMinutes}
                      onChange={(e) => handleConfigChange('attendanceSettings', 'lateThresholdMinutes', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2 text-right font-cairo">
                      فترة السماح للحضور (دقيقة)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={config.attendanceSettings.attendanceGracePeriod}
                      onChange={(e) => handleConfigChange('attendanceSettings', 'attendanceGracePeriod', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-900 mb-4 font-cairo">الإعدادات التلقائية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-700 mb-2 text-right font-cairo">
                      تحديد الغياب تلقائياً بعد (ساعة)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={config.attendanceSettings.autoMarkAbsentAfterHours}
                      onChange={(e) => handleConfigChange('attendanceSettings', 'autoMarkAbsentAfterHours', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right font-cairo"
                    />
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-end space-x-3 space-x-reverse cursor-pointer">
                      <span className="text-sm font-medium text-emerald-700 font-cairo">الغياب بعذر يحتاج موافقة</span>
                      <input
                        type="checkbox"
                        checked={config.attendanceSettings.excusedRequiresApproval}
                        onChange={(e) => handleConfigChange('attendanceSettings', 'excusedRequiresApproval', e.target.checked)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <BellIcon className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات الإشعارات</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-4 font-cairo">أنواع الإشعارات</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.notificationSettings.emailNotifications}
                        onChange={(e) => handleConfigChange('notificationSettings', 'emailNotifications', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <EnvelopeIcon className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-gray-900 font-cairo">إشعارات البريد الإلكتروني</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">إرسال إشعارات عبر البريد الإلكتروني</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.notificationSettings.smsNotifications}
                        onChange={(e) => handleConfigChange('notificationSettings', 'smsNotifications', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-lg">📱</span>
                          <span className="font-medium text-gray-900 font-cairo">رسائل SMS</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">إرسال رسائل نصية قصيرة</p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.notificationSettings.pushNotifications}
                        onChange={(e) => handleConfigChange('notificationSettings', 'pushNotifications', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <BellIcon className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-gray-900 font-cairo">الإشعارات الفورية</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">إشعارات المتصفح والتطبيق</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-lg font-bold text-indigo-900 mb-4 font-cairo">إعدادات التوقيت</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                      إرسال التذكيرات قبل (ساعة)
                    </label>
                    <select
                      value={config.notificationSettings.reminderHours}
                      onChange={(e) => handleConfigChange('notificationSettings', 'reminderHours', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                    >
                      <option value={1}>ساعة واحدة</option>
                      <option value={2}>ساعتان</option>
                      <option value={6}>6 ساعات</option>
                      <option value={12}>12 ساعة</option>
                      <option value={24}>24 ساعة</option>
                      <option value={48}>48 ساعة</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-2 text-right font-cairo">
                      تكرار الملخص الدوري
                    </label>
                    <select
                      value={config.notificationSettings.digestFrequency}
                      onChange={(e) => handleConfigChange('notificationSettings', 'digestFrequency', e.target.value)}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right font-cairo"
                    >
                      <option value="daily">يومي</option>
                      <option value="weekly">أسبوعي</option>
                      <option value="monthly">شهري</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Settings Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <ServerIcon className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات النظام</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-red-900 mb-4 font-cairo">الأمان والوصول</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.systemSettings.maintenanceMode}
                        onChange={(e) => handleConfigChange('systemSettings', 'maintenanceMode', e.target.checked)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-lg">🔧</span>
                          <span className="font-medium text-gray-900 font-cairo">وضع الصيانة</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">منع الوصول للمستخدمين العاديين</p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.systemSettings.allowRegistration}
                        onChange={(e) => handleConfigChange('systemSettings', 'allowRegistration', e.target.checked)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <UserGroupIcon className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-gray-900 font-cairo">السماح بالتسجيل</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">السماح للمستخدمين الجدد بالتسجيل</p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.systemSettings.requireEmailVerification}
                        onChange={(e) => handleConfigChange('systemSettings', 'requireEmailVerification', e.target.checked)}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <EnvelopeIcon className="w-5 h-5 text-red-600" />
                          <span className="font-medium text-gray-900 font-cairo">تأكيد البريد الإلكتروني</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">طلب تأكيد البريد عند التسجيل</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
                <h3 className="text-lg font-bold text-rose-900 mb-4 font-cairo">إعدادات الجلسة</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-rose-700 mb-2 text-right font-cairo">
                      انتهاء الجلسة (دقيقة)
                    </label>
                    <select
                      value={config.systemSettings.sessionTimeout}
                      onChange={(e) => handleConfigChange('systemSettings', 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-right font-cairo"
                    >
                      <option value={30}>30 دقيقة</option>
                      <option value={60}>ساعة واحدة</option>
                      <option value={120}>ساعتان</option>
                      <option value={240}>4 ساعات</option>
                      <option value={480}>8 ساعات</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-rose-700 mb-2 text-right font-cairo">
                      الحد الأقصى لحجم الملف (MB)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={config.systemSettings.maxFileSize}
                      onChange={(e) => handleConfigChange('systemSettings', 'maxFileSize', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backup Settings Tab */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <ShieldCheckIcon className="w-6 h-6 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900 font-cairo">إعدادات النسخ الاحتياطي</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-cairo">النسخ التلقائي</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <label className="flex items-center justify-between cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.backupSettings.autoBackup}
                        onChange={(e) => handleConfigChange('backupSettings', 'autoBackup', e.target.checked)}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <div className="text-right">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-900 font-cairo">تفعيل النسخ التلقائي</span>
                        </div>
                        <p className="text-sm text-gray-600 font-cairo">نسخ احتياطي تلقائي للبيانات</p>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                      تكرار النسخ الاحتياطي
                    </label>
                    <select
                      value={config.backupSettings.backupFrequency}
                      onChange={(e) => handleConfigChange('backupSettings', 'backupFrequency', e.target.value)}
                      disabled={!config.backupSettings.autoBackup}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-right font-cairo disabled:bg-gray-100"
                    >
                      <option value="daily">يومي</option>
                      <option value="weekly">أسبوعي</option>
                      <option value="monthly">شهري</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                      فترة الاحتفاظ (يوم)
                    </label>
                    <input
                      type="number"
                      min="7"
                      max="365"
                      value={config.backupSettings.retentionDays}
                      onChange={(e) => handleConfigChange('backupSettings', 'retentionDays', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 text-right font-cairo"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 font-cairo">حالة النسخ الاحتياطي</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-600 font-cairo">نشط</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 font-cairo">آخر نسخة احتياطية</span>
                    </div>
                    <p className="text-gray-600 font-cairo text-right">
                      {config.backupSettings.lastBackup ? 
                        new Date(config.backupSettings.lastBackup).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 
                        'لم يتم إجراء نسخ احتياطي بعد'
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors font-medium font-cairo">
                      نسخ احتياطي الآن
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-medium font-cairo flex items-center justify-center space-x-2 space-x-reverse">
                      <DocumentArrowDownIcon className="w-4 h-4" />
                      <span>تحميل</span>
                    </button>
                  </div>

                  <div className="bg-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircleIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800 font-cairo">
                        النظام يعمل بشكل طبيعي
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-xl font-bold text-amber-900 mb-4 text-right font-cairo">ملخص الإعدادات الحالية</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-amber-600 mb-1">{config.pointsSystem.liturgyPoints}</div>
            <div className="text-sm text-gray-600 font-cairo">نقاط القداس</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">{config.academicSettings.defaultPassPercentage}%</div>
            <div className="text-sm text-gray-600 font-cairo">نسبة النجاح</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">{config.attendanceSettings.lateThresholdMinutes}</div>
            <div className="text-sm text-gray-600 font-cairo">دقائق التأخير</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">{config.notificationSettings.reminderHours}</div>
            <div className="text-sm text-gray-600 font-cairo">ساعات التذكير</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;