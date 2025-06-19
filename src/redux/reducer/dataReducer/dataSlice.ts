import {createSlice} from '@reduxjs/toolkit';
import {
  getCategories,
  getTags
} from './fetchData';

const initialState = {
  error: '',
  loading: false,
  loadingCategories: false,
  dataCategories: null,

  loadingTags: false,
  dataTags: null
};

const DataSlice = createSlice({
  name: 'fetchData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
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
      .addCase(getTags.pending, (state) => {
        state.loadingTags = true,
        state.error = ''
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loadingTags = false,
        state.error = action.payload as string
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loadingTags = false,
        state.dataTags = action.payload
      })
  },
});

export default DataSlice
