import axios from 'axios';

import { env } from '@/lib/env';

const api = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});

export default api;
