import newsService from '~/services/newsService';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

export const getPosts = createAsyncThunk(
  'fetchData/getPosts',
  async (_, thunkAPI) => {
    try {
      const response = await newsService.getPosts();

      return response.data;
    } catch (error: any) {
      console.log('get posts', error?.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Lỗi khi tải posts',
      );
    }
  },
);

export const getCategories = createAsyncThunk(
  'fetchData/categories',
  async (_, thunkAPI) => {
    try {
      const response = await newsService.getCategories();
      console.log('get categories', response.data);
      return response.data;
    } catch (error: any) {
      console.log('get categories', error?.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Lỗi khi tải danh mục',
      );
    }
  },
);

export const getTags = createAsyncThunk(
  'fetchData/tags',
  async (_, thunkAPI) => {
    try {
      const response = await newsService.getTags();
      console.log('get tags', response.data);
      return response.data;
    } catch (error: any) {
      console.log('get tags', error?.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Lỗi khi tải tags',
      );
    }
  },
);
