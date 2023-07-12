import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:4444',
  baseURL: 'https://mern-blog.up.railway.app',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');

  return config;
});

export default instance;
