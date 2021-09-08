import { AppStateType } from '../reducers/rootReducer';

export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getIsFollowingProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingProgress;
};

export const getPagesCount = (state: AppStateType) => {
  return state.usersPage.pagesCount;
};

export const getIsFetch = (state: AppStateType) => {
  return state.usersPage.isFetch;
};
