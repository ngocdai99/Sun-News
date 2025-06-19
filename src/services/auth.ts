import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleApiError = (error: any) => {
  if (error.response) {
    console.log('Response data:', error.response.data);
    console.log('Response status:', error.response.status);

    if (error.response.status === 401) {
      console.log('Unauthorized access (401). Redirecting to login...');
      return {message: 'Unauthorized. Please log in again.', status: 401};
    }

    return error.response;
  } else if (error.request) {
    console.log('Request error:', error.request);
  } else {
    console.log('Error message:', error.message);
  }

  return null;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/api/login', {email, password});
  return response;
};

export const register = async (payload: any) => {
  const response = await api.post('/api/register', payload);
  return response;
};

export const forgotPassword = async (payload: any) => {
  const response = await api.post('/api/forgot', payload);
  return response;
};

export const checkTokenValidity = async () => {
  const response = await api.get('/api/check-token');
  return response;
};
