export interface ChildNote {
  id: string;
  deaconId: string;
  teacherId: string;
  title: string;
  content: string;
  category: 'academic' | 'behavioral' | 'spiritual' | 'general';
  priority: 'low' | 'medium' | 'high';
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChildNoteFormData {
  deaconId: string;
  title: string;
  content: string;
  category: 'academic' | 'behavioral' | 'spiritual' | 'general';
  priority: 'low' | 'medium' | 'high';
  isPrivate: boolean;
}