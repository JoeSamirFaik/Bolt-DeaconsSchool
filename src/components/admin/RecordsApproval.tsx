import React, { useState, useEffect } from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  PhotoIcon,
  PhoneIcon,
  FunnelIcon,
  TrophyIcon,
  FireIcon,
  BookOpenIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { User } from '../../types/user';
import { DeaconRecord, DeaconBalance, ReviewRecordRequest } from '../../types/approval';
import { deaconRecordsApi, balancesApi } from '../../services/approvalApi';
import { usersApi } from '../../services/userApi';
import RecordReviewModal from './RecordReviewModal';

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

const RecordsApproval: React.FC = () => {
  const [records, setRecords] = useState<DeaconRecord[]>([]);
  const [deacons, setDeacons] = useState<User[]>([]);
  const [balances, setBalances] = useState<DeaconBalance[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deaconFilter, setDeaconFilter] = useState<string>('all');
  
  // Modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DeaconRecord | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recordsData, deaconsData, balancesData] = await Promise.all([
        deaconRecordsApi.getAll(),
        usersApi.getByRole('deacon'),
        balancesApi.getAll()
      ]);
      setRecords(recordsData);
      setDeacons(deaconsData);
      setBalances(balancesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewRecord = async (reviewData: ReviewRecordRequest) => {
    try {
      await deaconRecordsApi.review(reviewData);
      setShowReviewModal(false);
      setSelectedRecord(null);
      loadData(); // Reload to get updated data
    } catch (error) {
      console.error('Error reviewing record:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_revision':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'approved':
        return 'معتمد';
      case 'rejected':
        return 'مرفوض';
      case 'needs_revision':
        return 'يحتاج مراجعة';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'liturgy':
        return <span className="text-2xl">⛪</span>;
      case 'prayer':
        return <span className="text-2xl">🙏</span>;
      case 'personal_study':
        return <BookOpenIcon className="w-6 h-6 text-blue-600" />;
      case 'community_service':
        return <HeartIcon className="w-6 h-6 text-red-600" />;
      default:
        return <DocumentTextIcon className="w-6 h-6 text-gray-600" />;
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

  const getDeaconBalance = (deaconId: string) => {
    return balances.find(b => b.deaconId === deaconId);
  };

  const filteredRecords = records.filter(record => {
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    if (typeFilter !== 'all' && record.type !== typeFilter) return false;
    if (deaconFilter !== 'all' && record.deaconId !== deaconFilter) return false;
    return true;
  });

  const stats = {
    pending: records.filter(r => r.status === 'pending').length,
    approved: records.filter(r => r.status === 'approved').length,
    rejected: records.filter(r => r.status === 'rejected').length,
    needsRevision: records.filter(r => r.status === 'needs_revision').length
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-cairo">جاري تحميل سجلات الشمامسة...</p>
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
          <h1 className="text-2xl font-bold text-gray-900 font-cairo">مراجعة سجلات الشمامسة</h1>
          <p className="text-gray-600 font-cairo">مراجعة واعتماد أنشطة الشمامسة لإضافة النقاط</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-600 mb-1">{stats.pending}</p>
              <p className="text-sm text-gray-600 font-cairo">في الانتظار</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600 mb-1">{stats.approved}</p>
              <p className="text-sm text-gray-600 font-cairo">معتمد</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600 mb-1">{stats.rejected}</p>
              <p className="text-sm text-gray-600 font-cairo">مرفوض</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600 mb-1">{stats.needsRevision}</p>
              <p className="text-sm text-gray-600 font-cairo">يحتاج مراجعة</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 font-cairo">تصفية السجلات</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الحالة
            </label>
            <Select
              value={{ value: statusFilter, label: getStatusLabel(statusFilter) }}
              onChange={(option) => setStatusFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع الحالات' },
                { value: 'pending', label: 'في الانتظار' },
                { value: 'approved', label: 'معتمد' },
                { value: 'rejected', label: 'مرفوض' },
                { value: 'needs_revision', label: 'يحتاج مراجعة' }
              ]}
              styles={customSelectStyles}
              placeholder="اختر الحالة"
              isSearchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              نوع النشاط
            </label>
            <Select
              value={typeFilter ? { value: typeFilter, label: getTypeLabel(typeFilter) } : null}
              onChange={(option) => setTypeFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع الأنواع' },
                { value: 'liturgy', label: 'قداس/صلاة كنسية' },
                { value: 'prayer', label: 'صلاة شخصية' },
                { value: 'personal_study', label: 'دراسة شخصية' },
                { value: 'community_service', label: 'خدمة مجتمعية' }
              ]}
              styles={customSelectStyles}
              placeholder="اختر نوع النشاط"
              isSearchable={false}
              isClearable
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الشماس
            </label>
            <Select
              value={deaconFilter !== 'all' ? { 
                value: deaconFilter, 
                label: deacons.find(d => d.id === deaconFilter)?.firstName + ' ' + deacons.find(d => d.id === deaconFilter)?.lastName 
              } : null}
              onChange={(option) => setDeaconFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: 'جميع الشمامسة' },
                ...deacons.map(deacon => ({ 
                  value: deacon.id, 
                  label: `${deacon.firstName} ${deacon.lastName}` 
                }))
              ]}
              styles={customSelectStyles}
              placeholder="اختر الشماس"
              isSearchable={true}
              isClearable
            />
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-6">
            {filteredRecords.map((record) => {
              const deacon = deacons.find(d => d.id === record.deaconId);
              const balance = getDeaconBalance(record.deaconId);
              
              return (
                <div key={record.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    {/* Left side - Actions */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => {
                          setSelectedRecord(record);
                          setShowReviewModal(true);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse font-medium"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>مراجعة</span>
                      </button>
                      
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </div>

                    {/* Center - Record Details */}
                    <div className="flex-1 text-right mx-6">
                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 text-xs rounded-full font-medium">
                            +{record.pointsRequested} نقطة
                          </span>
                          <span className="text-sm text-gray-500 font-cairo">
                            {new Date(record.date).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 font-cairo">
                          {record.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 font-cairo mb-3 leading-relaxed">
                        {record.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-gray-600 font-cairo">{record.location}</span>
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        
                        {record.duration && (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-gray-600 font-cairo">{record.duration} دقيقة</span>
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-gray-600 font-cairo">
                            {new Date(record.submittedAt).toLocaleDateString('ar-EG')}
                          </span>
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      {/* Evidence */}
                      {record.evidence && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-3">
                          <h4 className="font-semibold text-gray-900 font-cairo mb-2 text-sm">الأدلة:</h4>
                          <div className="space-y-2 text-sm">
                            {record.evidence.witnessName && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="text-gray-600 font-cairo">
                                  {record.evidence.witnessName} - {record.evidence.witnessContact}
                                </span>
                                <UserIcon className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            {record.evidence.photos && record.evidence.photos.length > 0 && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="text-gray-600 font-cairo">
                                  {record.evidence.photos.length} صورة مرفقة
                                </span>
                                <PhotoIcon className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                            {record.evidence.documents && record.evidence.documents.length > 0 && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <span className="text-gray-600 font-cairo">
                                  {record.evidence.documents.length} مستند مرفق
                                </span>
                                <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Review Notes */}
                      {record.reviewNotes && (
                        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <h4 className="font-semibold text-blue-900 font-cairo mb-1 text-sm">ملاحظات المراجعة:</h4>
                          <p className="text-blue-800 font-cairo text-sm">{record.reviewNotes}</p>
                          {record.reviewedAt && (
                            <p className="text-xs text-blue-600 font-cairo mt-1">
                              تمت المراجعة في {new Date(record.reviewedAt).toLocaleDateString('ar-EG')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right side - Deacon Info & Balance */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                        {getTypeIcon(record.type)}
                      </div>
                      
                      <div className="text-right mb-4">
                        <h4 className="font-bold text-gray-900 font-cairo">
                          {deacon?.firstName} {deacon?.lastName}
                        </h4>
                        <p className="text-sm text-gray-600 font-cairo">{getTypeLabel(record.type)}</p>
                      </div>

                      {/* Deacon Balance */}
                      {balance && (
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-3 border border-purple-200">
                          <div className="text-center mb-2">
                            <div className="text-lg font-bold text-purple-600">{balance.totalPoints}</div>
                            <div className="text-xs text-gray-600 font-cairo">إجمالي النقاط</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-white/70 rounded p-1 text-center">
                              <div className="font-bold text-green-600">{balance.liturgyPoints}</div>
                              <div className="text-gray-600 font-cairo">قداسات</div>
                            </div>
                            <div className="bg-white/70 rounded p-1 text-center">
                              <div className="font-bold text-blue-600">{balance.prayerPoints}</div>
                              <div className="text-gray-600 font-cairo">صلوات</div>
                            </div>
                            <div className="bg-white/70 rounded p-1 text-center">
                              <div className="font-bold text-purple-600">{balance.studyPoints}</div>
                              <div className="text-gray-600 font-cairo">دراسة</div>
                            </div>
                            <div className="bg-white/70 rounded p-1 text-center">
                              <div className="font-bold text-red-600">{balance.servicePoints}</div>
                              <div className="text-gray-600 font-cairo">خدمة</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <ClipboardDocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 font-cairo">لا توجد سجلات</h3>
              <p className="text-gray-500 font-cairo">
                {statusFilter === 'pending' 
                  ? 'لا توجد سجلات في انتظار المراجعة' 
                  : 'لا توجد سجلات تطابق المرشحات المحددة'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRecord && (() => {
        const selectedDeacon = deacons.find(d => d.id === selectedRecord.deaconId);
        return selectedDeacon ? (
        <RecordReviewModal
          record={selectedRecord}
          deacon={selectedDeacon}
          balance={getDeaconBalance(selectedRecord.deaconId)}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedRecord(null);
          }}
          onReview={handleReviewRecord}
        />
        ) : null;
      })()}
    </div>
  );
};

export default RecordsApproval;