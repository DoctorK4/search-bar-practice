import axios from 'axios';

const BASE_URL = 'https://api.clinicaltrialskorea.com/api/v1';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
