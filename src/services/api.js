// src/services/api.js
import axios from 'axios';
const token = localStorage.getItem('access_token');

const api = axios.create({
  baseURL: 'https://digitstage.online/api', // adapte à ton cas
  headers: {
    Accept: 'application/json',
    Authorization :`Bearer ${token}`

  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
