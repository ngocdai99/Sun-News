import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loadingProfile: false,
  dataProfile: null,
};

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    loadProfile: state => {
      state.loadingProfile = true;
      state.error = '';
    },

    loadProfileFulfilled: (state, action) => {
      state.loadingProfile = false;
      state.dataProfile = action.payload.data;
    },

    loadProfileRejected: (state, action) => {
      state.loadingProfile = false;
      state.error = action.payload.error;
    },
  },
});

export const {loadProfile, loadProfileFulfilled, loadProfileRejected} =
  profileSlice.actions;
export default profileSlice;
