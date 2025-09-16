import React, { useState, useEffect } from 'react';
import SettingsHeader from './settings/SettingsHeader';
import SettingsTabs from './settings/SettingsTabs';
import PointsSystemSettings from './settings/PointsSystemSettings';
import AcademicSettings from './settings/AcademicSettings';
import AttendanceSettings from './settings/AttendanceSettings';
import NotificationSettings from './settings/NotificationSettings';
import SystemSecuritySettings from './settings/SystemSecuritySettings';
import BackupSettings from './settings/BackupSettings';
import SettingsSummary from './settings/SettingsSummary';

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'points':
        return (
          <PointsSystemSettings
            config={config.pointsSystem}
            onChange={(field, value) => handleConfigChange('pointsSystem', field, value)}
          />
        );
      case 'academic':
        return (
          <AcademicSettings
            config={config.academicSettings}
            onChange={(field, value) => handleConfigChange('academicSettings', field, value)}
            onNestedChange={(nestedField, field, value) => handleNestedConfigChange('academicSettings', nestedField, field, value)}
          />
        );
      case 'attendance':
        return (
          <AttendanceSettings
            config={config.attendanceSettings}
            onChange={(field, value) => handleConfigChange('attendanceSettings', field, value)}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            config={config.notificationSettings}
            onChange={(field, value) => handleConfigChange('notificationSettings', field, value)}
          />
        );
      case 'system':
        return (
          <SystemSecuritySettings
            config={config.systemSettings}
            onChange={(field, value) => handleConfigChange('systemSettings', field, value)}
          />
        );
      case 'backup':
        return (
          <BackupSettings
            config={config.backupSettings}
            onChange={(field, value) => handleConfigChange('backupSettings', field, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SettingsHeader
        onSave={handleSave}
        loading={loading}
        saveStatus={saveStatus}
      />

      {/* Tabs */}
      <SettingsTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as any)}
      />

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {renderTabContent()}
      </div>

      {/* Summary */}
      <SettingsSummary config={config} />
    </div>
  );
};

export default SystemSettings;