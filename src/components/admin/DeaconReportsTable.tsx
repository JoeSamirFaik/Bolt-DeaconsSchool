import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  TrophyIcon, 
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  FireIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User } from '../../types/user';
import { DeaconBalance } from '../../types/approval';
import { usersApi } from '../../services/userApi';
import { balancesApi } from '../../services/approvalApi';
import { levelsApi } from '../../services/lmsApi';
import { Level } from '../../types/lms';
import DeaconDetailedReport from './DeaconDetailedReport';

const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '48px',
    border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
    borderRadius: '12px',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
    '&:hover': {
      borderColor: '#f59e0b'
    },
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif'
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f59e0b' 
      : state.isFocused 
        ? '#fef3c7' 
        : 'white',
    color: state.isSelected ? 'white' : '#374151',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const,
    '&:hover': {
      backgroundColor: state.isSelected ? '#f59e0b' : '#fef3c7'
    }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#374151',
    fontSize: '14px',
    fontFamily: 'Cairo, sans-serif',
    textAlign: 'right' as const
  })
};

interface DeaconWithStats extends User {
  balance?: DeaconBalance;
  rank: number;
  attendanceRate: number;
  currentStreak: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  lastActivity: string;
}

const DeaconReportsTable: React.FC = () => {
  const [deacons, setDeacons] = useState<DeaconWithStats[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeacon, setSelectedDeacon] = useState<DeaconWithStats | null>(null);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  
  // Filters and sorting
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'points' | 'attendance' | 'lessons' | 'streak'>('points');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [deaconsData, balancesData, levelsData] = await Promise.all([
        usersApi.getByRole('deacon'),
        balancesApi.getAll(),
        levelsApi.getAll()
      ]);

      // Combine deacon data with stats
      const deaconsWithStats: DeaconWithStats[] = deaconsData.map((deacon, index) => {
        const balance = balancesData.find(b => b.deaconId === deacon.id);
        
        // Mock additional stats - in real app, these would come from APIs
        const mockStats = {
          attendanceRate: Math.floor(Math.random() * 30) + 70, // 70-100%
          currentStreak: Math.floor(Math.random() * 15) + 1, // 1-15 days
          completedLessons: Math.floor(Math.random() * 20) + 5, // 5-25 lessons
          totalLessons: 30,
          averageScore: Math.floor(Math.random() * 25) + 75, // 75-100%
          lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        };

        return {
          ...deacon,
          balance,
          rank: 0, // Will be calculated after sorting
          ...mockStats
        };
      });

      // Sort by total points and assign ranks
      const sortedDeacons = deaconsWithStats
        .sort((a, b) => (b.balance?.totalPoints || 0) - (a.balance?.totalPoints || 0))
        .map((deacon, index) => ({ ...deacon, rank: index + 1 }));

      setDeacons(sortedDeacons);
      setLevels(levelsData);
    } catch (error) {
      console.error('Error loading deacon reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (deacon: DeaconWithStats) => {
    setSelectedDeacon(deacon);
    setShowDetailedReport(true);
  };

  const handleSort = (field: 'points' | 'attendance' | 'lessons' | 'streak') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortedAndFilteredDeacons = () => {
    let filtered = deacons.filter(deacon => {
      // Level filter
      if (levelFilter !== 'all' && deacon.deaconInfo?.currentLevel !== levelFilter) {
        return false;
      }
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          deacon.firstName.toLowerCase().includes(searchLower) ||
          deacon.lastName.toLowerCase().includes(searchLower) ||
          deacon.email.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'points':
          aValue = a.balance?.totalPoints || 0;
          bValue = b.balance?.totalPoints || 0;
          break;
        case 'attendance':
          aValue = a.attendanceRate;
          bValue = b.attendanceRate;
          break;
        case 'lessons':
          aValue = a.completedLessons;
          bValue = b.completedLessons;
          break;
        case 'streak':
          aValue = a.currentStreak;
          bValue = b.currentStreak;
          break;
        default:
          aValue = a.balance?.totalPoints || 0;
          bValue = b.balance?.totalPoints || 0;
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-amber-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-amber-500';
    return 'from-blue-100 to-indigo-100';
  };

  const getPerformanceColor = (value: number, type: 'percentage' | 'score') => {
    if (type === 'percentage' || type === 'score') {
      if (value >= 90) return 'text-green-600 bg-green-50';
      if (value >= 80) return 'text-blue-600 bg-blue-50';
      if (value >= 70) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  const filteredAndSortedDeacons = getSortedAndFilteredDeacons();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل تقارير الشمامسة...</p>
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
        <div className="text-right">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 font-cairo">تقارير الشمامسة التفصيلية</h1>
          <p className="text-gray-600 font-cairo text-sm sm:text-base hidden sm:block">عرض شامل لأداء جميع الشمامسة مرتبين حسب النقاط</p>
        </div>
      </div>

      {/* Top Performers Summary */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {filteredAndSortedDeacons.slice(0, 3).map((deacon, index) => (
          <div key={deacon.id} className={`bg-gradient-to-br ${getRankColor(index + 1)} rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="text-right">
                <h3 className="text-lg sm:text-xl font-bold font-cairo mb-1">
                  {deacon.firstName} {deacon.lastName}
                </h3>
                <p className="text-xs sm:text-sm opacity-90 font-cairo">
                  {levels.find(l => l.id === deacon.deaconInfo?.currentLevel)?.name || 'غير محدد'}
                </p>
              </div>
              <div className="text-2xl sm:text-4xl">{getRankIcon(index + 1)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold">{deacon.balance?.totalPoints || 0}</div>
                <div className="text-xs opacity-75 font-cairo">نقطة</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold">{deacon.attendanceRate}%</div>
                <div className="text-xs opacity-75 font-cairo">حضور</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse mb-4">
          <FunnelIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 font-cairo">تصفية وترتيب البيانات</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              البحث
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث بالاسم أو البريد الإلكتروني..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              المستوى
            </label>
            <Select
              value={levelFilter !== 'all' ? { value: levelFilter, label: levels.find(l => l.id === levelFilter)?.name } : { value: 'all', label: 'جميع المستويات' }}
              onChange={(option) => setLevelFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع المستويات' },
                ...levels.map(level => ({ value: level.id, label: level.name }))
              ]}
              styles={customSelectStyles}
              placeholder="اختر المستوى"
              isSearchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              ترتيب حسب
            </label>
            <Select
              value={{ value: sortBy, label: 
                sortBy === 'points' ? 'النقاط' :
                sortBy === 'attendance' ? 'نسبة الحضور' :
                sortBy === 'lessons' ? 'الدروس المكتملة' :
                'أيام الحضور المتتالية'
              }}
              onChange={(option) => setSortBy(option ? option.value as any : 'points')}
              options={[
                { value: 'points', label: 'النقاط' },
                { value: 'attendance', label: 'نسبة الحضور' },
                { value: 'lessons', label: 'الدروس المكتملة' },
                { value: 'streak', label: 'أيام الحضور المتتالية' }
              ]}
              styles={customSelectStyles}
              placeholder="اختر طريقة الترتيب"
              isSearchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              اتجاه الترتيب
            </label>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base"
            >
              {sortOrder === 'desc' ? (
                <>
                  <ArrowDownIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-cairo">تنازلي (الأعلى أولاً)</span>
                </>
              ) : (
                <>
                  <ArrowUpIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-cairo">تصاعدي (الأقل أولاً)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Deacons Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile: Card View */}
        <div className="block sm:hidden p-4">
          <div className="space-y-4">
            {filteredAndSortedDeacons.map((deacon, index) => {
              const currentLevel = levels.find(l => l.id === deacon.deaconInfo?.currentLevel);
              
              return (
                <div key={deacon.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <button
                      onClick={() => handleViewReport(deacon)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105 text-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>عرض</span>
                    </button>
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-600">
                        {deacon.firstName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <span className="text-2xl">{getRankIcon(deacon.rank)}</span>
                      <h3 className="text-lg font-bold text-gray-900 font-cairo">
                        {deacon.firstName} {deacon.lastName}
                      </h3>
                    </div>
                    <p className="text-gray-600 font-cairo text-sm mb-2">
                      {deacon.email}
                    </p>
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 text-xs rounded-full font-medium">
                      {currentLevel?.name || 'غير محدد'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Points Breakdown */}
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-purple-600">{deacon.balance?.totalPoints || 0}</span>
                        <span className="text-xs text-gray-600 font-cairo">إجمالي النقاط</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        <div className="bg-green-100 text-green-800 px-1 py-1 rounded text-center font-medium">
                          {deacon.balance?.liturgyPoints || 0}
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-1 py-1 rounded text-center font-medium">
                          {deacon.balance?.prayerPoints || 0}
                        </div>
                        <div className="bg-purple-100 text-purple-800 px-1 py-1 rounded text-center font-medium">
                          {deacon.balance?.studyPoints || 0}
                        </div>
                        <div className="bg-red-100 text-red-800 px-1 py-1 rounded text-center font-medium">
                          {deacon.balance?.servicePoints || 0}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-green-50 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-green-600">{deacon.attendanceRate}%</div>
                        <div className="text-xs text-gray-600 font-cairo">حضور</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-blue-600">{deacon.completedLessons}/{deacon.totalLessons}</div>
                        <div className="text-xs text-gray-600 font-cairo">دروس</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-orange-600">{deacon.currentStreak}</div>
                        <div className="text-xs text-gray-600 font-cairo">يوم</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 font-cairo">
                      آخر نشاط: {new Date(deacon.lastActivity).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredAndSortedDeacons.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد نتائج</h3>
              <p className="text-gray-500 font-cairo">
                {searchTerm ? `لا يوجد شمامسة تطابق البحث "${searchTerm}"` : 'لا يوجد شمامسة في هذا المستوى'}
              </p>
            </div>
          )}
        </div>
        
        {/* Desktop: Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  التقرير التفصيلي
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => handleSort('streak')}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {sortBy === 'streak' && (
                      sortOrder === 'desc' ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowUpIcon className="w-3 h-3" />
                    )}
                    <span>أيام متتالية</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => handleSort('lessons')}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {sortBy === 'lessons' && (
                      sortOrder === 'desc' ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowUpIcon className="w-3 h-3" />
                    )}
                    <span>الدروس</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => handleSort('attendance')}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {sortBy === 'attendance' && (
                      sortOrder === 'desc' ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowUpIcon className="w-3 h-3" />
                    )}
                    <span>نسبة الحضور</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={() => handleSort('points')}
                >
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {sortBy === 'points' && (
                      sortOrder === 'desc' ? <ArrowDownIcon className="w-3 h-3" /> : <ArrowUpIcon className="w-3 h-3" />
                    )}
                    <span>النقاط</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  المستوى
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  الترتيب
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider font-cairo">
                  الشماس
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedDeacons.map((deacon, index) => {
                const currentLevel = levels.find(l => l.id === deacon.deaconInfo?.currentLevel);
                
                return (
                  <tr key={deacon.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    {/* Detailed Report Button */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewReport(deacon)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>عرض التقرير</span>
                      </button>
                    </td>

                    {/* Current Streak */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FireIcon className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-gray-900 font-cairo">
                          {deacon.currentStreak} يوم
                        </span>
                      </div>
                    </td>

                    {/* Lessons Progress */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-16">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300"
                              style={{ width: `${(deacon.completedLessons / deacon.totalLessons) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-cairo">
                          {deacon.completedLessons}/{deacon.totalLessons}
                        </span>
                        <BookOpenIcon className="w-4 h-4 text-blue-500" />
                      </div>
                    </td>

                    {/* Attendance Rate */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(deacon.attendanceRate, 'percentage')}`}>
                          {deacon.attendanceRate}%
                        </span>
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      </div>
                    </td>

                    {/* Total Points */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-center font-medium">
                            {deacon.balance?.liturgyPoints || 0}
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-center font-medium">
                            {deacon.balance?.prayerPoints || 0}
                          </div>
                          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-center font-medium">
                            {deacon.balance?.studyPoints || 0}
                          </div>
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-center font-medium">
                            {deacon.balance?.servicePoints || 0}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900 font-cairo">
                            {deacon.balance?.totalPoints || 0}
                          </div>
                          <div className="text-xs text-gray-500 font-cairo">إجمالي النقاط</div>
                        </div>
                        <TrophyIcon className="w-5 h-5 text-amber-500" />
                      </div>
                    </td>

                    {/* Current Level */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <AcademicCapIcon className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-900 font-cairo">
                          {currentLevel?.name || 'غير محدد'}
                        </span>
                      </div>
                    </td>

                    {/* Rank */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-2xl">{getRankIcon(deacon.rank)}</span>
                        <span className="text-sm font-bold text-gray-900 font-cairo">
                          المركز {deacon.rank}
                        </span>
                      </div>
                    </td>

                    {/* Deacon Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-amber-600">
                            {deacon.firstName.charAt(0)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 font-cairo">
                            {deacon.firstName} {deacon.lastName}
                          </div>
                          <div className="text-xs text-gray-500 font-cairo">{deacon.email}</div>
                          <div className="text-xs text-gray-400 font-cairo">
                            آخر نشاط: {new Date(deacon.lastActivity).toLocaleDateString('ar-EG')}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredAndSortedDeacons.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد نتائج</h3>
              <p className="text-gray-500 font-cairo">
                {searchTerm ? `لا يوجد شمامسة تطابق البحث "${searchTerm}"` : 'لا يوجد شمامسة في هذا المستوى'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <UserIcon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1">{filteredAndSortedDeacons.length}</div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">إجمالي الشمامسة</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <TrophyIcon className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1">
            {Math.round(filteredAndSortedDeacons.reduce((sum, d) => sum + (d.balance?.totalPoints || 0), 0) / filteredAndSortedDeacons.length) || 0}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">متوسط النقاط</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-1">
            {Math.round(filteredAndSortedDeacons.reduce((sum, d) => sum + d.attendanceRate, 0) / filteredAndSortedDeacons.length) || 0}%
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">متوسط الحضور</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <FireIcon className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
          </div>
          <div className="text-lg sm:text-2xl font-bold text-orange-600 mb-1">
            {Math.max(...filteredAndSortedDeacons.map(d => d.currentStreak), 0)}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-cairo">أطول سلسلة حضور</p>
        </div>
      </div>

      {/* Detailed Report Modal */}
      {showDetailedReport && selectedDeacon && (
        <DeaconDetailedReport
          deacon={selectedDeacon}
          onClose={() => {
            setShowDetailedReport(false);
            setSelectedDeacon(null);
          }}
        />
      )}
    </div>
  );
};

export default DeaconReportsTable;