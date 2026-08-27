import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiService = {
  // Chat endpoints
  sendMessage: (conversationId: string, message: string, model: string) =>
    api.post('/chat/message', { conversationId, message, model }),

  getConversations: () => api.get('/chat/conversations'),

  createConversation: (title?: string) =>
    api.post('/chat/conversations', { title }),

  deleteConversation: (id: string) =>
    api.delete(`/chat/conversations/${id}`),

  updateConversation: (id: string, data: any) =>
    api.put(`/chat/conversations/${id}`, data),

  // Models
  getModels: () => api.get('/models'),

  // User
  getUserProfile: () => api.get('/user/profile'),

  updateUserProfile: (data: any) =>
    api.put('/user/profile', data),

  // Auth
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  logout: () => {
    localStorage.removeItem('auth_token');
    return Promise.resolve();
  },

  signup: (email: string, password: string, name: string) =>
    api.post('/auth/signup', { email, password, name }),
};

export default api;
