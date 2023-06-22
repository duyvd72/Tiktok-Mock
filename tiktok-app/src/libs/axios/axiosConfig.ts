import axios from 'axios';
import { getAccessToken } from '../../utils/accessTokenLS';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken() as string;
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers != null) {
    request.headers.Authorization = accessHeader;
  }
  return request;
});

export default axiosInstance;
