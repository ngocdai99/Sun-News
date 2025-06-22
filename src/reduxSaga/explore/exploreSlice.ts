import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  loadingTags: false,
  dataTags: null,
  loadingCates: false,
  dataCates: null,
};

const exploreSlice = createSlice({
  name: 'exploreSlice',
  initialState,
  reducers: {
    loadExploreData: state => {
      state.loadingTags = true;
      state.loadingCates = true;
      state.error = '';
    },

    loadExploreDataFulfilled: (state, action) => {
      state.loadingTags = false;
      state.loadingCates = false;
      state.dataTags = action.payload.dataTags;
      state.dataCates = action.payload.dataCates;
    },

    loadExploreDataRejected: (state, action) => {
      state.loadingTags = false;
      state.loadingCates = false;
      state.error = action.payload;
    },
  },
});
export const {
  loadExploreData,
  loadExploreDataFulfilled,
  loadExploreDataRejected,
} = exploreSlice.actions;
export default exploreSlice;
