import axios from 'axios';

import { env } from '@/lib/env';

const api = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    console.log('Request headers:', config.headers);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    console.log('Response headers:', response.headers);
    return response;
  },
  function (error) {
    console.error('Response error:', error.response?.data);
    return Promise.reject(error);
  },
);

export default api;
