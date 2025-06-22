// homeSlice.ts
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  error: '',
  dataPosts: null,
  loadingPosts: false,
};

const homeSlice = createSlice({
  name: 'homeSlice',
  initialState: initialState,
  reducers: {
    loadHomeData: state => {
      state.loadingPosts = true;
      state.error = '';
    },

    loadHomeDataFulfilled: (state, action) => {
      state.loadingPosts = false;
      state.dataPosts = action.payload.dataPosts;
    },

    loadHomeDataRejected: (state, action) => {
      state.loadingPosts = false;
      state.error = action.payload;
    },
  },
});

export const {loadHomeData, loadHomeDataFulfilled, loadHomeDataRejected} =
  homeSlice.actions;
export default homeSlice;
