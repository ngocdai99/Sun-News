import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleApiError = (error: any) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);

    if (error.response.status === 401) {
      console.warn('Unauthorized access (401). Redirecting to login...');
      return {message: 'Unauthorized. Please log in again.', status: 401};
    }

    return error.response;
  } else if (error.request) {
    console.error('Request error:', error.request);
  } else {
    console.error('Error message:', error.message);
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
  try {
    const response = await api.post('/api/login', {email, password});
    return response;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const register = async (payload: any) => {
  try {
    const response = await api
      .post('/api/register', payload)
      .catch(handleApiError);
    return response;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const forgotPassword = async (payload: any) => {
  try {
    const response = await api
      .post('/api/forgot', payload)
      .catch(handleApiError);
    return response;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const checkTokenValidity = async () => {
  try {
    const response = await api.get('/api/check-token');
    return response;
  } catch (error: any) {
    return handleApiError(error);
  }
};
