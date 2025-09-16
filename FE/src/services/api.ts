const API_BASE_URL = '/api';

// API client with automatic token handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('deacons_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async patch(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    apiClient.post('/auth/register', userData),
  
  getProfile: () =>
    apiClient.post('/auth/profile', {}),
};

// Users API
export const usersAPI = {
  getProfile: () =>
    apiClient.get('/users/profile'),
  
  updateProfile: (data: any) =>
    apiClient.patch('/users/profile', data),
  
  getUsers: () =>
    apiClient.get('/users'),
  
  getDeacons: () =>
    apiClient.get('/users/deacons'),
  
  getChildren: () =>
    apiClient.get('/users/children'),
};

// Lessons API
export const lessonsAPI = {
  getLessons: (stage?: string, level?: string) => {
    const params = new URLSearchParams();
    if (stage) params.append('stage', stage);
    if (level) params.append('level', level);
    const query = params.toString();
    return apiClient.get(`/lessons${query ? `?${query}` : ''}`);
  },
  
  getLesson: (id: string) =>
    apiClient.get(`/lessons/${id}`),
  
  createLesson: (data: any) =>
    apiClient.post('/lessons', data),
  
  updateLesson: (id: string, data: any) =>
    apiClient.patch(`/lessons/${id}`, data),
  
  deleteLesson: (id: string) =>
    apiClient.delete(`/lessons/${id}`),
};

// Progress API
export const progressAPI = {
  getMyProgress: () =>
    apiClient.get('/progress/my-progress'),
  
  getMyStats: () =>
    apiClient.get('/progress/my-stats'),
  
  getUserProgress: (userId: string) =>
    apiClient.get(`/progress/user/${userId}`),
  
  getUserStats: (userId: string) =>
    apiClient.get(`/progress/user/${userId}/stats`),
  
  getLessonProgress: (lessonId: string) =>
    apiClient.get(`/progress/lesson/${lessonId}`),
  
  createProgress: (data: any) =>
    apiClient.post('/progress', data),
  
  updateProgress: (id: string, data: any) =>
    apiClient.patch(`/progress/${id}`, data),
};

// Attendance API
export const attendanceAPI = {
  getMyAttendance: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return apiClient.get(`/attendance/my-attendance${query ? `?${query}` : ''}`);
  },
  
  getMyAttendanceStats: (startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return apiClient.get(`/attendance/my-stats${query ? `?${query}` : ''}`);
  },
  
  getUserAttendance: (userId: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return apiClient.get(`/attendance/user/${userId}${query ? `?${query}` : ''}`);
  },
  
  getUserAttendanceStats: (userId: string, startDate?: string, endDate?: string) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString();
    return apiClient.get(`/attendance/user/${userId}/stats${query ? `?${query}` : ''}`);
  },
  
  getSessionAttendance: (sessionId: string, date: string) =>
    apiClient.get(`/attendance/session/${sessionId}?date=${date}`),
  
  createAttendance: (data: any) =>
    apiClient.post('/attendance', data),
  
  updateAttendance: (id: string, data: any) =>
    apiClient.patch(`/attendance/${id}`, data),
};

// Notifications API
export const notificationsAPI = {
  getMyNotifications: () =>
    apiClient.get('/notifications/my-notifications'),
  
  getAllNotifications: () =>
    apiClient.get('/notifications'),
  
  getNotification: (id: string) =>
    apiClient.get(`/notifications/${id}`),
  
  markAsRead: (id: string) =>
    apiClient.patch(`/notifications/${id}/read`, {}),
  
  createNotification: (data: any) =>
    apiClient.post('/notifications', data),
  
  updateNotification: (id: string, data: any) =>
    apiClient.patch(`/notifications/${id}`, data),
  
  deleteNotification: (id: string) =>
    apiClient.delete(`/notifications/${id}`),
};