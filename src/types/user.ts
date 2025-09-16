export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'deacon' | 'servant' | 'parent' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  
  // Deacon-specific fields
  deaconInfo?: {
    dateOfBirth: string;
    parentId?: string;
    currentLevel?: string;
    enrollmentDate: string;
    graduationDate?: string;
    notes?: string;
  };
  
  // Parent-specific fields
  parentInfo?: {
    phone: string;
    address: string;
    occupation?: string;
    children: string[]; // Array of deacon IDs
  };
  
  // Servant-specific fields
  servantInfo?: {
    specialization: string;
    assignedLevels: string[];
    phone: string;
  };
}

export interface LevelAssignment {
  id: string;
  deaconId: string;
  levelId: string;
  academicYear: string; // e.g., "2025-2026"
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  status: 'assigned' | 'in_progress' | 'completed' | 'failed';
  progress: number; // 0-100
  finalGrade?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicYear {
  id: string;
  year: string; // e.g., "2025-2026"
  startDate: string;
  endDate: string;
  isActive: boolean;
  registrationStartDate: string;
  registrationEndDate: string;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: 'deacon' | 'servant' | 'parent';
  deaconInfo?: {
    dateOfBirth: string;
    parentId?: string;
    enrollmentDate: string;
    notes?: string;
  };
  parentInfo?: {
    phone: string;
    address: string;
    occupation?: string;
  };
  servantInfo?: {
    specialization: string;
    assignedLevels: string[];
    phone: string;
  };
}

export interface CreateLevelAssignmentRequest {
  deaconId: string;
  levelId: string;
  academicYear: string;
  startDate: string;
  expectedEndDate: string;
  notes?: string;
}