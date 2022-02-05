import { AppStateType } from '../reducers/rootReducer';

export const selectProfile = (state: AppStateType) => state.profilePage;

export const selectCurrentUser = (state: AppStateType) => selectProfile(state).profile;

export const selectStatus = (state: AppStateType) => selectProfile(state).status;

export const selectPosts = (state: AppStateType) => selectProfile(state).posts;

export const selectFormErrors = (state: AppStateType) => selectProfile(state).userInfoFormErrors;

export const selectErrors = (state: AppStateType) => state.errors.errors;

export const selectIsFetchProfile = (state: AppStateType) => selectProfile(state).isFetchProfile;

export const selectIsLoadPhoto = (state: AppStateType) => selectProfile(state).isLoadPhoto;

export const selectEditProfileDataMode = (state: AppStateType) =>
  selectProfile(state).editProfileDataMode;
