import api from './api';

const handleApiError = (error: any) => {
  if (error.response) {
    console.log('Response data:', error.response.data);
    console.log('Response status:', error.response.status);
    console.log('Response headers:', error.response.headers);
    return error.response;
  } else if (error.request) {
    console.log('Request error:', error.request);
  } else {
    console.log('Error message:', error.message);
  }
  return null;
};

const getPosts = async (queryString: string = '') => {
  try {
    console.log('queryString', queryString);
    const response = await api.get('/api/guest/posts', {params: queryString});
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

const getPostDetail = async (id: string) => {
  const response = await api
    .get(`/api/guest/posts/${id}`)
    .catch(handleApiError);
  return response;
};

const getPackages = async () => {
  const response = await api.get(`/api/packages`);
  return response;
};

const createPaymentSheet = async (payload: any) => {
  const response = await api
    .post(`/api/payment-sheet`, payload)
    .catch(handleApiError);
  return response;
};

const saveTransaction = async (payload: any) => {
  const response = await api
    .post(`/api/transactions`, payload)
    .catch(handleApiError);
  return response;
};

const getCurrentUser = async () => {
  const response = await api.get(`/api/current-user`);
  return response;
};

const deleteAccount = async () => {
  const response = await api
    .get(`/api/current-user-delete`)
    .catch(handleApiError);
  return response;
};

const getCategories = async (queryString: string = '') => {
  const response = await api
    .get('/api/guest/categories', {params: queryString})
    .catch(handleApiError);
  return response;
};
const getTags = async (queryString: string = '') => {
  const response = await api
    .get('/api/guest/tags', {params: queryString})
    .catch(handleApiError);
  return response;
};

const createSubscription = async (payload: any) => {
  const response = await api
    .post(`/api/subscriptions`, payload)
    .catch(handleApiError);
  return response;
};

const createPaymentGooglePaySheet = (payload: any) => {
  return api
    .post(`/api/payment-sheet-googlepay`, payload)
    .catch(handleApiError);
};

const getBookmarks = async () => {
  const response = await api.get(`/api/bookmarks`);
  return response;
};
const createBookmark = async (payload: any) => {
  const response = await api
    .post(`/api/bookmarks`, payload)
    .catch(handleApiError);
  return response;
};

const removeBookmark = async (id: string) => {
  const response = await api
    .delete(`/api/bookmarks/${id}`)
    .catch(handleApiError);
  return response;
};

const getSettings = async () => {
  const response = await api.get(`/api/guest/settings`);
  return response;
};

const getPrices = async () => {
  const response = await api.get(`/api/prices`);
  return response;
};

const newsService = {
  getPosts,
  getPostDetail,
  getPackages,
  createPaymentSheet,
  saveTransaction,
  getCurrentUser,
  getCategories,
  getTags,
  createSubscription,
  createPaymentGooglePaySheet,
  getBookmarks,
  createBookmark,
  removeBookmark,
  getSettings,
  deleteAccount,
  getPrices,
};

export default newsService;
