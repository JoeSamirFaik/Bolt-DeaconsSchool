export interface DeaconRecord {
  id: string;
  deaconId: string;
  type: 'liturgy' | 'prayer' | 'personal_study' | 'community_service';
  title: string;
  description: string;
  date: string;
  duration?: number; // in minutes
  location: string;
  notes?: string;
  evidence?: {
    photos?: string[];
    documents?: string[];
    witnessName?: string;
    witnessContact?: string;
  };
  pointsRequested: number;
  status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeaconRecordRequest {
  type: 'liturgy' | 'prayer' | 'personal_study' | 'community_service';
  title: string;
  description: string;
  date: string;
  duration?: number;
  location: string;
  notes?: string;
  evidence?: {
    photos?: string[];
    documents?: string[];
    witnessName?: string;
    witnessContact?: string;
  };
}

export interface ReviewRecordRequest {
  recordId: string;
  status: 'approved' | 'rejected' | 'needs_revision';
  reviewNotes?: string;
  adjustedPoints?: number;
}

export interface DeaconBalance {
  id: string;
  deaconId: string;
  totalPoints: number;
  liturgyPoints: number;
  prayerPoints: number;
  studyPoints: number;
  servicePoints: number;
  bonusPoints: number;
  lastUpdated: string;
}

export interface PointsTransaction {
  id: string;
  deaconId: string;
  recordId?: string;
  type: 'earned' | 'bonus' | 'penalty' | 'adjustment';
  points: number;
  reason: string;
  approvedBy?: string;
  createdAt: string;
}