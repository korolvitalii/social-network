import { AppStateType } from '../reducers/rootReducer';

export const selectUsersData = (state: AppStateType) => state.usersPage;

export const selectUsers = (state: AppStateType) => selectUsersData(state).users;

export const selectPageSize = (state: AppStateType) => selectUsersData(state).pageSize;

export const selectIsFollowingProgress = (state: AppStateType) =>
  selectUsersData(state).isFollowingProgress;

export const selectPagesCount = (state: AppStateType) => selectUsersData(state).pagesCount;

export const selectIsFetch = (state: AppStateType) => selectUsersData(state).isFetch;

export const selectTerm = (state: AppStateType) => selectUsersData(state).filters.term;

export const selectShowFriends = (state: AppStateType) =>
  selectUsersData(state).filters.showFriends;
