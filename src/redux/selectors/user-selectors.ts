import { AppStateType } from '../reducers/rootReducer';

export const selectUsersFromState = (state: AppStateType) => state.usersPage.users;

export const selectPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const selectIsFollowingProgress = (state: AppStateType) => {
  return state.usersPage.isFollowingProgress;
};

export const selectPagesCount = (state: AppStateType) => {
  return state.usersPage.pagesCount;
};

export const selectIsFetch = (state: AppStateType) => {
  return state.usersPage.isFetch;
};

export const selectTerm = (state: AppStateType) => {
  return state.usersPage.filters.term;
};

export const selectShowFriends = (state: AppStateType) => {
  return state.usersPage.filters.showFriends;
};
