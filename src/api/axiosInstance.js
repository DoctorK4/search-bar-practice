import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.clinicaltrialskorea.com/api/v1',
  headers: { 'Content-Type': 'application/json' },
});
