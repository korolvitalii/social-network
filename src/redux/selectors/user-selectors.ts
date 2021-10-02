import { AppStateType } from '../reducers/rootReducer';

export const getUsersFromState = (state: AppStateType) => state.usersPage.users;

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

export const getTerm = (state: AppStateType) => {
  return state.usersPage.filters.term;
};

export const getShowFriends = (state: AppStateType) => {
  return state.usersPage.filters.showFriends;
};
