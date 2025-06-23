import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Tag } from '~/types/Type';
type ExploreState = {
  error: string,
  loading: boolean,
  loadingTags: boolean,
  dataTags: Tag[] | null,
  loadingCates: boolean,
  dataCates: any[] | null
}
const initialState: ExploreState = {
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

    searchTags: (state, action: PayloadAction<{keyword: string}>) => {
      state.loadingTags = true;
      state.error = '';
    },

    searchTagsFulfilled: (state, action) => {
      state.loadingTags = false;
      state.dataTags = action.payload.dataTags;
    },

    searchTagsRejected: (state, action) => {
      state.loadingTags = false;
      state.error = action.payload.error;
    },
  },
});
export const {
  loadExploreData,
  loadExploreDataFulfilled,
  loadExploreDataRejected,

  searchTags,
  searchTagsFulfilled,
  searchTagsRejected,
} = exploreSlice.actions;

export default exploreSlice;
