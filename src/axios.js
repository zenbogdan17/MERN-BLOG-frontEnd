import axios from 'axios';

export const baseURL = 'https://blog-mern-zenbogdan.vercel.app';

const instance = axios.create({
  // baseURL: 'http://localhost:4444',
  baseURL: 'https://blog-mern-zenbogdan.vercel.app',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');

  return config;
});

export default instance;
