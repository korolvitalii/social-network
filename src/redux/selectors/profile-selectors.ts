import { AppStateType } from '../reducers/rootReducer';

export const getCurrentUser = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const getStatus = (state: AppStateType) => {
  return state.profilePage.status;
};

export const getPosts = (state: AppStateType) => {
  return state.profilePage.posts;
};
