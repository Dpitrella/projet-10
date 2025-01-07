import axios from 'axios';
import { getTokenFromCookie, setTokenCookie } from '../utils/tokenUtils';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

api.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/user/login', credentials);
  const { token } = response.data.body;
  setTokenCookie(token);
  return response.data;
};

export const getUserProfile = async () => {
  return api.post('/user/profile');
};

export const updateUserProfile = async (userData) => {
  return api.put('/user/profile', userData);
};

export default api;
