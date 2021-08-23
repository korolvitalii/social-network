import { UserType, ActionsType } from '../../types/types';

const CHANGE_FLAG = 'CHANGE_FLAG';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'TOGGLE_IS_FETCH_DATA';

export const toggleFollowUnfollow = (id: number): ActionsType => ({
  type: CHANGE_FLAG,
  payload: {
    userId: id,
  },
});

export const setUsers = (items: Array<UserType>): ActionsType => ({
  type: SET_USERS,
  payload: {
    items: items,
  },
});

export const getTotalCount = (totalCount: number): ActionsType => ({
  type: GET_TOTAL_COUNT,
  payload: {
    totalCount,
  },
});

export const setPagesCount = (totalCount: number, pageSize: number): ActionsType => ({
  type: SET_PAGES_COUNT,
  payload: {
    totalCount,
    pageSize,
  },
});

export const isFetchData = (isFetch: boolean): ActionsType => ({
  type: TOGGLE_IS_FETCH_DATA,
  payload: {
    isFetch,
  },
});
