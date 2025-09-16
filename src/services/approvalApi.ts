import { 
  DeaconRecord, 
  CreateDeaconRecordRequest, 
  ReviewRecordRequest,
  DeaconBalance,
  PointsTransaction
} from '../types/approval';

// Mock data for development
const mockDeaconRecords: DeaconRecord[] = [
  {
    id: '1',
    deaconId: '1',
    type: 'liturgy',
    title: 'قداس الأحد',
    description: 'حضور قداس الأحد في الكنيسة الكبرى',
    date: '2024-12-22',
    location: 'الكنيسة الكبرى',
    notes: 'خدمت في الشماسية وساعدت في التوزيع',
    evidence: {
      witnessName: 'الأب يوحنا',
      witnessContact: '01234567890'
    },
    pointsRequested: 50,
    status: 'pending',
    submittedAt: '2024-12-22T10:30:00Z',
    createdAt: '2024-12-22T10:30:00Z',
    updatedAt: '2024-12-22T10:30:00Z'
  },
  {
    id: '2',
    deaconId: '1',
    type: 'prayer',
    title: 'صلاة الصبح',
    description: 'صلاة الصبح اليومية في المنزل',
    date: '2024-12-21',
    duration: 20,
    location: 'المنزل',
    notes: 'صلاة تأملية مع قراءة المزامير',
    pointsRequested: 25,
    status: 'approved',
    reviewedBy: '2',
    reviewedAt: '2024-12-21T15:00:00Z',
    reviewNotes: 'ممتاز، استمر في المحافظة على الصلاة اليومية',
    submittedAt: '2024-12-21T08:00:00Z',
    createdAt: '2024-12-21T08:00:00Z',
    updatedAt: '2024-12-21T15:00:00Z'
  },
  {
    id: '3',
    deaconId: '4',
    type: 'community_service',
    title: 'خدمة المحتاجين',
    description: 'توزيع الطعام على الفقراء في المنطقة',
    date: '2024-12-20',
    duration: 180,
    location: 'منطقة شبرا',
    notes: 'شاركت مع فريق الخدمة في توزيع 50 وجبة',
    evidence: {
      photos: ['service1.jpg', 'service2.jpg'],
      witnessName: 'أبونا مرقس',
      witnessContact: '01098765432'
    },
    pointsRequested: 100,
    status: 'pending',
    submittedAt: '2024-12-20T18:00:00Z',
    createdAt: '2024-12-20T18:00:00Z',
    updatedAt: '2024-12-20T18:00:00Z'
  },
  {
    id: '6',
    deaconId: '1',
    type: 'personal_study',
    title: 'دراسة سفر المزامير',
    description: 'قراءة وحفظ 10 مزامير من سفر المزامير',
    date: '2024-12-18',
    duration: 90,
    location: 'المنزل',
    notes: 'حفظت المزامير 1-10 وكتبت تأملات',
    evidence: {
      witnessName: 'والدي داود إبراهيم',
      witnessContact: '01234567890'
    },
    pointsRequested: 50,
    status: 'approved',
    reviewedBy: '2',
    reviewedAt: '2024-12-18T20:00:00Z',
    reviewNotes: 'عمل ممتاز في الحفظ والتأمل',
    submittedAt: '2024-12-18T17:00:00Z',
    createdAt: '2024-12-18T17:00:00Z',
    updatedAt: '2024-12-18T20:00:00Z'
  },
  {
    id: '7',
    deaconId: '1',
    type: 'liturgy',
    title: 'قداس عيد الميلاد',
    description: 'حضور قداس عيد الميلاد المجيد',
    date: '2024-12-25',
    location: 'الكنيسة الكبرى',
    notes: 'شاركت في الترتيل والخدمة',
    evidence: {
      witnessName: 'الأب بولس',
      witnessContact: '01098765432',
      photos: ['christmas_mass1.jpg', 'christmas_mass2.jpg']
    },
    pointsRequested: 75,
    status: 'approved',
    reviewedBy: '2',
    reviewedAt: '2024-12-25T22:00:00Z',
    reviewNotes: 'مشاركة فعالة في القداس المقدس',
    submittedAt: '2024-12-25T20:00:00Z',
    createdAt: '2024-12-25T20:00:00Z',
    updatedAt: '2024-12-25T22:00:00Z'
  },
  {
    id: '8',
    deaconId: '1',
    type: 'community_service',
    title: 'زيارة دار المسنين',
    description: 'زيارة دار المسنين وقضاء وقت مع كبار السن',
    date: '2024-12-17',
    duration: 120,
    location: 'دار المسنين - مدينة نصر',
    notes: 'قرأت لهم من الكتاب المقدس وغنيت ترانيم',
    evidence: {
      witnessName: 'الأخت مريم - مديرة الدار',
      witnessContact: '01123456789',
      photos: ['elderly_visit1.jpg']
    },
    pointsRequested: 80,
    status: 'approved',
    reviewedBy: '2',
    reviewedAt: '2024-12-17T19:00:00Z',
    reviewNotes: 'خدمة رائعة ومؤثرة',
    submittedAt: '2024-12-17T16:00:00Z',
    createdAt: '2024-12-17T16:00:00Z',
    updatedAt: '2024-12-17T19:00:00Z'
  }
  {
    id: '4',
    deaconId: '5',
    type: 'personal_study',
    title: 'دراسة كتاب "حياة الصلاة"',
    description: 'قراءة ودراسة كتاب حياة الصلاة للقديس يوحنا ذهبي الفم',
    date: '2024-12-19',
    duration: 120,
    location: 'المنزل',
    notes: 'كتبت ملخص وتأملات شخصية',
    evidence: {
      documents: ['study_notes.pdf']
    },
    pointsRequested: 75,
    status: 'needs_revision',
    reviewedBy: '2',
    reviewedAt: '2024-12-19T20:00:00Z',
    reviewNotes: 'يرجى إرفاق الملخص المكتوب كدليل على الدراسة',
    submittedAt: '2024-12-19T16:00:00Z',
    createdAt: '2024-12-19T16:00:00Z',
    updatedAt: '2024-12-19T20:00:00Z'
  },
  {
    id: '5',
    deaconId: '6',
    type: 'liturgy',
    title: 'صلاة عشية',
    description: 'حضور صلاة عشية يوم الجمعة',
    date: '2024-12-20',
    location: 'الكنيسة الصغرى',
    notes: 'شاركت في القراءات',
    pointsRequested: 30,
    status: 'rejected',
    reviewedBy: '2',
    reviewedAt: '2024-12-20T22:00:00Z',
    reviewNotes: 'لم يتم التأكد من الحضور، يرجى إحضار شاهد',
    submittedAt: '2024-12-20T19:00:00Z',
    createdAt: '2024-12-20T19:00:00Z',
    updatedAt: '2024-12-20T22:00:00Z'
  }
];

const mockBalances: DeaconBalance[] = [
  {
    id: '1',
    deaconId: '1',
    totalPoints: 1480,
    liturgyPoints: 755,
    prayerPoints: 425,
    studyPoints: 200,
    servicePoints: 180,
    bonusPoints: 0,
    lastUpdated: '2024-12-25T22:00:00Z'
  }
];

const mockTransactions: PointsTransaction[] = [
  {
    id: '1',
    deaconId: '1',
    recordId: '2',
    type: 'earned',
    points: 25,
    reason: 'صلاة الصبح - معتمدة',
    approvedBy: '2',
    createdAt: '2024-12-21T15:00:00Z'
  },
  {
    id: '2',
    deaconId: '1',
    recordId: '6',
    type: 'earned',
    points: 50,
    reason: 'دراسة سفر المزامير - معتمدة',
    approvedBy: '2',
    createdAt: '2024-12-18T20:00:00Z'
  },
  {
    id: '3',
    deaconId: '1',
    recordId: '7',
    type: 'earned',
    points: 75,
    reason: 'قداس عيد الميلاد - معتمد',
    approvedBy: '2',
    createdAt: '2024-12-25T22:00:00Z'
  },
  {
    id: '4',
    deaconId: '1',
    recordId: '8',
    type: 'earned',
    points: 80,
    reason: 'زيارة دار المسنين - معتمدة',
    approvedBy: '2',
    createdAt: '2024-12-17T19:00:00Z'
  }
];

// Deacon Records API
export const deaconRecordsApi = {
  getAll: async (): Promise<DeaconRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDeaconRecords), 500);
    });
  },

  getPending: async (): Promise<DeaconRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pending = mockDeaconRecords.filter(r => r.status === 'pending');
        resolve(pending);
      }, 500);
    });
  },

  getByDeaconId: async (deaconId: string): Promise<DeaconRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = mockDeaconRecords.filter(r => r.deaconId === deaconId);
        resolve(records);
      }, 500);
    });
  },

  getByStatus: async (status: string): Promise<DeaconRecord[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const records = mockDeaconRecords.filter(r => r.status === status);
        resolve(records);
      }, 500);
    });
  },

  create: async (deaconId: string, data: CreateDeaconRecordRequest): Promise<DeaconRecord> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pointsMap = {
          liturgy: 50,
          prayer: 25,
          personal_study: 30,
          community_service: 75
        };

        const newRecord: DeaconRecord = {
          id: Math.random().toString(36).substr(2, 9),
          deaconId,
          ...data,
          pointsRequested: pointsMap[data.type],
          status: 'pending',
          submittedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        mockDeaconRecords.push(newRecord);
        resolve(newRecord);
      }, 500);
    });
  },

  review: async (data: ReviewRecordRequest): Promise<DeaconRecord> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDeaconRecords.findIndex(r => r.id === data.recordId);
        if (index !== -1) {
          mockDeaconRecords[index] = {
            ...mockDeaconRecords[index],
            status: data.status,
            reviewNotes: data.reviewNotes,
            reviewedBy: '2', // Current user ID
            reviewedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          // If approved, add points to balance
          if (data.status === 'approved') {
            const record = mockDeaconRecords[index];
            const pointsToAdd = data.adjustedPoints || record.pointsRequested;
            
            // Update balance
            const balanceIndex = mockBalances.findIndex(b => b.deaconId === record.deaconId);
            if (balanceIndex !== -1) {
              const balance = mockBalances[balanceIndex];
              balance.totalPoints += pointsToAdd;
              
              // Update category points
              switch (record.type) {
                case 'liturgy':
                  balance.liturgyPoints += pointsToAdd;
                  break;
                case 'prayer':
                  balance.prayerPoints += pointsToAdd;
                  break;
                case 'personal_study':
                  balance.studyPoints += pointsToAdd;
                  break;
                case 'community_service':
                  balance.servicePoints += pointsToAdd;
                  break;
              }
              
              balance.lastUpdated = new Date().toISOString();
            }

            // Add transaction
            const transaction: PointsTransaction = {
              id: Math.random().toString(36).substr(2, 9),
              deaconId: record.deaconId,
              recordId: record.id,
              type: 'earned',
              points: pointsToAdd,
              reason: `${record.title} - معتمد`,
              approvedBy: '2',
              createdAt: new Date().toISOString()
            };
            mockTransactions.push(transaction);
          }

          resolve(mockDeaconRecords[index]);
        } else {
          reject(new Error('Record not found'));
        }
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDeaconRecords.findIndex(r => r.id === id);
        if (index !== -1) {
          mockDeaconRecords.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Record not found'));
        }
      }, 500);
    });
  }
};

// Balances API
export const balancesApi = {
  getByDeaconId: async (deaconId: string): Promise<DeaconBalance | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balance = mockBalances.find(b => b.deaconId === deaconId);
        resolve(balance || null);
      }, 500);
    });
  },

  getAll: async (): Promise<DeaconBalance[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockBalances), 500);
    });
  }
};

// Transactions API
export const transactionsApi = {
  getByDeaconId: async (deaconId: string): Promise<PointsTransaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = mockTransactions.filter(t => t.deaconId === deaconId);
        resolve(transactions);
      }, 500);
    });
  },

  getAll: async (): Promise<PointsTransaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTransactions), 500);
    });
  }
};