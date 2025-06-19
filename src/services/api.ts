import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


console.log('process.env.EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL);
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


api.interceptors.request.use(
  async (config: any) => {
    try {

      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: any) => {
    if (error.response) {

      console.error('API Error:', error.response.data);
    } else if (error.request) {

      console.error('Network Error:', error.message);
    } else {
      console.error('Unexpected Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;