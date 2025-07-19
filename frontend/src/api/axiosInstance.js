import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change to your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('lazydo_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error adding auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      try {
        await AsyncStorage.removeItem('lazydo_token');
        await AsyncStorage.removeItem('lazydo_user');
      } catch (storageError) {
        console.error('Error clearing auth data:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (updates) => api.put('/auth/profile', updates),
};

// Task API endpoints
export const taskAPI = {
  getTasks: (filters = {}) => api.get('/tasks', { params: filters }),
  getTask: (taskId) => api.get(`/tasks/${taskId}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (taskId, updates) => api.put(`/tasks/${taskId}`, updates),
  deleteTask: (taskId) => api.delete(`/tasks/${taskId}`),
  acceptTask: (taskId) => api.post(`/tasks/${taskId}/accept`),
  updateTaskStatus: (taskId, status) => api.put(`/tasks/${taskId}/status`, { status }),
  getPostedTasks: () => api.get('/tasks/posted'),
  getAcceptedTasks: () => api.get('/tasks/accepted'),
};

export default api; 