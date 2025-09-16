import React, { useState, useEffect } from 'react';
import { 
  ClipboardDocumentCheckIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  PhotoIcon,
  PhoneIcon,
  FunnelIcon,
  TrophyIcon,
  StarIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import { DeaconRecord, ReviewRecordRequest, DeaconBalance } from '../../types/approval';
import { deaconRecordsApi, balancesApi } from '../../services/approvalApi';
import { usersApi } from '../../services/userApi';
import { User } from '../../types/user';

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
  const [users, setUsers] = useState<User[]>([]);
  const [balances, setBalances] = useState<DeaconBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<DeaconRecord | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [adjustedPoints, setAdjustedPoints] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approved' | 'rejected' | 'needs_revision'>('approved');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deaconFilter, setDeaconFilter] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recordsData, usersData, balancesData] = await Promise.all([
        deaconRecordsApi.getAll(),
        usersApi.getByRole('deacon'),
        balancesApi.getAll()
      ]);
      setRecords(recordsData);
      setUsers(usersData);
      setBalances(balancesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewRecord = async () => {
    if (!selectedRecord) return;
    
    try {
      const reviewData: ReviewRecordRequest = {
        recordId: selectedRecord.id,
        status: reviewAction,
        reviewNotes,
        adjustedPoints: adjustedPoints || undefined
      };
      
      await deaconRecordsApi.review(reviewData);
      setShowReviewModal(false);
      setSelectedRecord(null);
      setReviewNotes('');
      setAdjustedPoints(null);
      loadData(); // Reload to get updated data
    } catch (error) {
      console.error('Error reviewing record:', error);
    }
  };

  const openReviewModal = (record: DeaconRecord, action: 'approved' | 'rejected' | 'needs_revision') => {
    setSelectedRecord(record);
    setReviewAction(action);
    setAdjustedPoints(record.pointsRequested);
    setShowReviewModal(true);
  };

  const getRecordTypeLabel = (type: string) => {
    switch (type) {
      case 'liturgy': return 'قداس/صلاة';
      case 'prayer': return 'صلاة شخصية';
      case 'personal_study': return 'دراسة شخصية';
      case 'community_service': return 'خدمة مجتمعية';
      default: return type;
    }
  };

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'liturgy': return '⛪';
      case 'prayer': return '🙏';
      case 'personal_study': return '📚';
      case 'community_service': return '🤝';
      default: return '📋';
    }
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'liturgy': return 'bg-green-100 text-green-800 border-green-200';
      case 'prayer': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal_study': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'community_service': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'needs_revision': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'معتمد';
      case 'rejected': return 'مرفوض';
      case 'needs_revision': return 'يحتاج مراجعة';
      case 'pending': return 'في الانتظار';
      default: return status;
    }
  };

  const getDeaconBalance = (deaconId: string) => {
    return balances.find(b => b.deaconId === deaconId);
  };

  const getDeaconName = (deaconId: string) => {
    const deacon = users.find(u => u.id === deaconId);
    return deacon ? `${deacon.firstName} ${deacon.lastName}` : 'غير معروف';
  };

  const filteredRecords = records.filter(record => {
    if (statusFilter !== 'all' && record.status !== statusFilter) return false;
    if (typeFilter !== 'all' && record.type !== typeFilter) return false;
    if (deaconFilter !== 'all' && record.deaconId !== deaconFilter) return false;
    return true;
  });

  const pendingCount = records.filter(r => r.status === 'pending').length;
  const approvedCount = records.filter(r => r.status === 'approved').length;
  const rejectedCount = records.filter(r => r.status === 'rejected').length;
  const needsRevisionCount = records.filter(r => r.status === 'needs_revision').length;

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
        <div className="flex items-center justify-between mb-6">
          {/* Right side - Title & Description */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900 font-cairo">مراجعة سجلات الشمامسة</h1>
            <p className="text-gray-600 font-cairo">مراجعة واعتماد سجلات الأنشطة لمنح النقاط</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ClockIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{pendingCount}</div>
            <p className="text-sm text-blue-800 font-cairo">في الانتظار</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{approvedCount}</div>
            <p className="text-sm text-green-800 font-cairo">معتمد</p>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{needsRevisionCount}</div>
            <p className="text-sm text-yellow-800 font-cairo">يحتاج مراجعة</p>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600 mb-1">{rejectedCount}</div>
            <p className="text-sm text-red-800 font-cairo">مرفوض</p>
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
              حالة السجل
            </label>
            <Select
              value={statusFilter ? { value: statusFilter, label: getStatusLabel(statusFilter) } : null}
              onChange={(option) => setStatusFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: '-- جميع الحالات --' },
                { value: 'pending', label: 'في الانتظار' },
                { value: 'approved', label: 'معتمد' },
                { value: 'rejected', label: 'مرفوض' },
                { value: 'needs_revision', label: 'يحتاج مراجعة' }
              ]}
              styles={customSelectStyles}
              placeholder="-- اختر الحالة --"
              isSearchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              نوع النشاط
            </label>
            <Select
              value={typeFilter ? { value: typeFilter, label: getRecordTypeLabel(typeFilter) } : null}
              onChange={(option) => setTypeFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: '-- جميع الأنواع --' },
                { value: 'liturgy', label: 'قداس/صلاة' },
                { value: 'prayer', label: 'صلاة شخصية' },
                { value: 'personal_study', label: 'دراسة شخصية' },
                { value: 'community_service', label: 'خدمة مجتمعية' }
              ]}
              styles={customSelectStyles}
              placeholder="-- اختر النوع --"
              isSearchable={false}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
              الشماس
            </label>
            <Select
              value={deaconFilter ? { value: deaconFilter, label: getDeaconName(deaconFilter) } : null}
              onChange={(option) => setDeaconFilter(option ? option.value : 'all')}
              options={[
                { value: 'all', label: '-- جميع الشمامسة --' },
                ...users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))
              ]}
              styles={customSelectStyles}
              placeholder="-- اختر الشماس --"
              isSearchable={true}
            />
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const deacon = users.find(u => u.id === record.deaconId);
              const balance = getDeaconBalance(record.deaconId);
              
              return (
                <div
                  key={record.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${getStatusColor(record.status)}`}
                >
                  <div className="flex items-start justify-between">
                    {/* Left side - Actions */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {record.status === 'pending' && (
                        <>
                          <button
                            onClick={() => openReviewModal(record, 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>اعتماد</span>
                          </button>
                          
                          <button
                            onClick={() => openReviewModal(record, 'needs_revision')}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                          >
                            <PencilIcon className="w-4 h-4" />
                            <span>مراجعة</span>
                          </button>
                          
                          <button
                            onClick={() => openReviewModal(record, 'rejected')}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 space-x-reverse font-medium shadow-lg hover:scale-105"
                          >
                            <XCircleIcon className="w-4 h-4" />
                            <span>رفض</span>
                          </button>
                        </>
                      )}
                      
                      {record.status !== 'pending' && (
                        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                      )}
                    </div>

                    {/* Center - Record Details */}
                    <div className="flex-1 text-right mx-6">
                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRecordTypeColor(record.type)}`}>
                            {getRecordTypeIcon(record.type)} {getRecordTypeLabel(record.type)}
                          </span>
                          <span className="text-sm text-gray-500 font-cairo">
                            {new Date(record.date).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 font-cairo">
                          {record.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-700 font-cairo mb-4 leading-relaxed">
                        {record.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <MapPinIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-cairo">{record.location}</span>
                        </div>
                        
                        {record.duration && (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 font-cairo">{record.duration} دقيقة</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <TrophyIcon className="w-4 h-4 text-amber-500" />
                          <span className="text-gray-600 font-cairo">{record.pointsRequested} نقطة</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-cairo">
                            {new Date(record.submittedAt).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                      </div>
                      
                      {record.evidence && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-3">
                          <h4 className="font-semibold text-gray-900 font-cairo mb-2 text-right">الأدلة:</h4>
                          <div className="space-y-2 text-sm">
                            {record.evidence.witnessName && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <UserIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 font-cairo">الشاهد: {record.evidence.witnessName}</span>
                              </div>
                            )}
                            {record.evidence.witnessContact && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <PhoneIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 font-cairo">التواصل: {record.evidence.witnessContact}</span>
                              </div>
                            )}
                            {record.evidence.photos && record.evidence.photos.length > 0 && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <PhotoIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 font-cairo">صور: {record.evidence.photos.length} صورة</span>
                              </div>
                            )}
                            {record.evidence.documents && record.evidence.documents.length > 0 && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 font-cairo">مستندات: {record.evidence.documents.length} مستند</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {record.notes && (
                        <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <h4 className="font-semibold text-blue-900 font-cairo mb-2 text-right">ملاحظات الشماس:</h4>
                          <p className="text-blue-800 font-cairo text-right">{record.notes}</p>
                        </div>
                      )}
                      
                      {record.reviewNotes && (
                        <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-200">
                          <h4 className="font-semibold text-amber-900 font-cairo mb-2 text-right">ملاحظات المراجع:</h4>
                          <p className="text-amber-800 font-cairo text-right">{record.reviewNotes}</p>
                          {record.reviewedAt && (
                            <p className="text-xs text-amber-700 font-cairo mt-2">
                              تمت المراجعة في: {new Date(record.reviewedAt).toLocaleDateString('ar-EG')}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right side - Deacon Info & Balance */}
                    <div className="text-right">
                      <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
                        <div className="flex items-center space-x-3 space-x-reverse mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="text-right">
                            <h4 className="font-bold text-gray-900 font-cairo">
                              {getDeaconName(record.deaconId)}
                            </h4>
                            <p className="text-sm text-gray-600 font-cairo">شماس</p>
                          </div>
                        </div>
                        
                        {balance && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-amber-600">{balance.totalPoints}</span>
                              <span className="text-sm text-gray-600 font-cairo">إجمالي النقاط</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-green-100 rounded-lg p-2 text-center">
                                <div className="font-bold text-green-800">{balance.liturgyPoints}</div>
                                <div className="text-green-700 font-cairo">قداسات</div>
                              </div>
                              <div className="bg-blue-100 rounded-lg p-2 text-center">
                                <div className="font-bold text-blue-800">{balance.prayerPoints}</div>
                                <div className="text-blue-700 font-cairo">صلوات</div>
                              </div>
                              <div className="bg-purple-100 rounded-lg p-2 text-center">
                                <div className="font-bold text-purple-800">{balance.studyPoints}</div>
                                <div className="text-purple-700 font-cairo">دراسة</div>
                              </div>
                              <div className="bg-orange-100 rounded-lg p-2 text-center">
                                <div className="font-bold text-orange-800">{balance.servicePoints}</div>
                                <div className="text-orange-700 font-cairo">خدمة</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-3xl mb-2">{getRecordTypeIcon(record.type)}</div>
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
                {statusFilter === 'pending' ? 'لا توجد سجلات تحتاج للمراجعة' : 'لا توجد سجلات تطابق المرشحات المحددة'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircleIcon className="w-5 h-5 text-gray-500" />
              </button>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-900 font-cairo">مراجعة السجل</h2>
                <p className="text-gray-600 font-cairo">{selectedRecord.title}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Record Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 font-cairo">الشماس:</span>
                    <div className="font-semibold text-gray-900 font-cairo">
                      {getDeaconName(selectedRecord.deaconId)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-cairo">النوع:</span>
                    <div className="font-semibold text-gray-900 font-cairo">
                      {getRecordTypeLabel(selectedRecord.type)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-cairo">التاريخ:</span>
                    <div className="font-semibold text-gray-900 font-cairo">
                      {new Date(selectedRecord.date).toLocaleDateString('ar-EG')}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-cairo">النقاط المطلوبة:</span>
                    <div className="font-semibold text-amber-600 font-cairo">
                      {selectedRecord.pointsRequested} نقطة
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-right font-cairo">
                  قرار المراجعة *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    reviewAction === 'approved'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
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
                      <span className="text-sm font-medium text-gray-700 font-cairo">اعتماد</span>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    reviewAction === 'needs_revision'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
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
                      <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700 font-cairo">مراجعة</span>
                    </div>
                  </label>
                  
                  <label className={`cursor-pointer p-4 border-2 rounded-xl transition-all ${
                    reviewAction === 'rejected'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
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
                      <span className="text-sm font-medium text-gray-700 font-cairo">رفض</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Points Adjustment */}
              {reviewAction === 'approved' && (
                <div>
                  <label htmlFor="adjustedPoints" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                    تعديل النقاط (اختياري)
                  </label>
                  <input
                    type="number"
                    id="adjustedPoints"
                    value={adjustedPoints || ''}
                    onChange={(e) => setAdjustedPoints(e.target.value ? parseInt(e.target.value) : null)}
                    min="0"
                    max="200"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-right font-cairo"
                    placeholder={`النقاط الافتراضية: ${selectedRecord.pointsRequested}`}
                  />
                  <p className="text-xs text-gray-500 font-cairo mt-1 text-right">
                    اتركه فارغاً لاستخدام النقاط الافتراضية ({selectedRecord.pointsRequested} نقطة)
                  </p>
                </div>
              )}

              {/* Review Notes */}
              <div>
                <label htmlFor="reviewNotes" className="block text-sm font-medium text-gray-700 mb-2 text-right font-cairo">
                  ملاحظات المراجعة {reviewAction !== 'approved' ? '*' : '(اختياري)'}
                </label>
                <textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  required={reviewAction !== 'approved'}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-right font-cairo resize-none"
                  placeholder={
                    reviewAction === 'approved' ? 'ملاحظات إضافية (اختياري)...' :
                    reviewAction === 'rejected' ? 'يرجى توضيح سبب الرفض...' :
                    'يرجى توضيح ما يحتاج للمراجعة...'
                  }
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 space-x-reverse pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleReviewRecord}
                  disabled={reviewAction !== 'approved' && !reviewNotes.trim()}
                  className={`flex-1 px-6 py-3 text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                    reviewAction === 'approved' ? 'bg-green-600 hover:bg-green-700' :
                    reviewAction === 'rejected' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {reviewAction === 'approved' ? 'اعتماد السجل' :
                   reviewAction === 'rejected' ? 'رفض السجل' :
                   'طلب مراجعة'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordsApproval;