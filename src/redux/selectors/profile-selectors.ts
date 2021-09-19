import { AppStateType } from '../reducers/rootReducer';

export const getCurrentUser = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const getAuthUserId = (state: AppStateType) => {
  return state.auth.id;
};

export const getStatus = (state: AppStateType) => {
  return state.profilePage.status;
};

export const getPosts = (state: AppStateType) => {
  return state.profilePage.posts;
};

export const getFormErrors = (state: AppStateType) => {
  return state.profilePage.userInfoFormErrors;
};
