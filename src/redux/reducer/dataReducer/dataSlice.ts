import {createSlice} from '@reduxjs/toolkit';
import {getCategories, getTags, getPosts} from './fetchData';

const initialState = {
  error: '',
  loading: false,

  loadingPosts: false,
  dataPosts: null,

  loadingCategories: false,
  dataCategories: null,

  loadingTags: false,
  dataTags: null,
};

const DataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.loadingPosts = true;
        state.error = '';
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loadingPosts = false;
        state.error = action.payload as string;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loadingPosts = false;
        state.dataPosts = action.payload;
      })
      .addCase(getCategories.pending, state => {
        state.loadingCategories = true;
        state.error = '';
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.payload as string;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.dataCategories = action.payload;
      })
      .addCase(getTags.pending, state => {
        (state.loadingTags = true), (state.error = '');
      })
      .addCase(getTags.rejected, (state, action) => {
        (state.loadingTags = false), (state.error = action.payload as string);
      })
      .addCase(getTags.fulfilled, (state, action) => {
        (state.loadingTags = false), (state.dataTags = action.payload);
      });
  },
});

export default DataSlice;
