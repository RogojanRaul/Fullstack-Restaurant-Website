import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInLoading: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    logInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  logInLoading,
  logInSuccess,
  logInError,
  updateUserError,
  updateUserSuccess,
  updateUserStart,
  deleteUserError,
  deleteUserSuccess,
  deleteUserStart,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
