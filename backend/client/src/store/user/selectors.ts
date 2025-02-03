import { createSelector } from '@reduxjs/toolkit';
import { RootStateType } from '../createStore';

const currentUser = (state: RootStateType) => state.userSlice.currentUser;
const userLoading = (state: RootStateType) => state.userSlice.loading;
const userError = (state: RootStateType) => state.userSlice.error;

export const currentUserSelector = createSelector(
  currentUser,
  (state) => state
);
export const userLoadingSelector = createSelector(
  userLoading,
  (state) => state
);
export const userErrorSelector = createSelector(userError, (state) => state);
