import { AppStateType } from '../reducers/rootReducer';

export const selectCurrentUser = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const selectAuthUserId = (state: AppStateType) => {
  return state.auth.id;
};

export const selectStatus = (state: AppStateType) => {
  return state.profilePage.status;
};

export const selectPosts = (state: AppStateType) => {
  return state.profilePage.posts;
};

export const selectFormErrors = (state: AppStateType) => {
  return state.profilePage.userInfoFormErrors;
};

export const selectErrors = (state: AppStateType) => {
  return state.errors.errors;
};

export const selectIsFetchProfile = (state: AppStateType) => {
  return state.profilePage.isFetchProfile;
};

export const selectIsLoadPhoto = (state: AppStateType) => {
  return state.profilePage.isLoadPhoto;
};

export const selectEditProfileDataMode = (state: AppStateType) =>
  state.profilePage.editProfileDataMode;
