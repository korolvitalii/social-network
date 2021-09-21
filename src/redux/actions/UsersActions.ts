import { ThunkAction } from 'redux-thunk';
import { apiUsers } from '../../api/api';
import { UserType } from '../../types/types';
import { AppStateType } from '../reducers/rootReducer';

const CHANGE_FLAG = 'SN/USERACTIONS/CHANGE_FLAG';
const SET_USERS = 'SN/USERACTIONS/SET_USERS';
const GET_TOTAL_COUNT = 'SN/USERACTIONS/GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SN/USERACTIONS/SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'SN/USERACTIONS/TOGGLE_IS_FETCH_DATA';
const TOGGLE_FOLLOWING_PROGRESS = 'SN/USERACTIONS/TOGGLE_FOLLOWING_PROGRESS';

type ToggleFollowUnfollowType = {
  type: typeof CHANGE_FLAG;
  payload: {
    userId: number;
  };
};

type SetUsersType = {
  type: typeof SET_USERS;
  payload: {
    items: Array<UserType>;
  };
};

type GetTotalCountType = {
  type: typeof GET_TOTAL_COUNT;
  payload: {
    totalCount: number;
  };
};

type SetPagesCountType = {
  type: typeof SET_PAGES_COUNT;
  payload: {
    totalCount: number;
    pageSize: number;
  };
};

type ToggleIsFetchDataType = {
  type: typeof TOGGLE_IS_FETCH_DATA;
  payload: {
    isFetch: boolean;
  };
};

type ToggleFollowingProgressType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS;
  payload: {
    isFollowingProgress: boolean;
  };
};

export type ActionsType =
  | ToggleFollowUnfollowType
  | SetUsersType
  | GetTotalCountType
  | SetPagesCountType
  | ToggleIsFetchDataType
  | ToggleFollowingProgressType;

export const actions = {
  toggleFollowUnfollow: (id: number): ActionsType => ({
    type: CHANGE_FLAG,
    payload: {
      userId: id,
    },
  }),
  setUsers: (items: Array<UserType>): ActionsType => ({
    type: SET_USERS,
    payload: {
      items: items,
    },
  }),
  getTotalCount: (totalCount: number): ActionsType => ({
    type: GET_TOTAL_COUNT,
    payload: {
      totalCount,
    },
  }),
  setPagesCount: (totalCount: number, pageSize: number): ActionsType => ({
    type: SET_PAGES_COUNT,
    payload: {
      totalCount,
      pageSize,
    },
  }),
  isFetchData: (isFetch: boolean): ActionsType => ({
    type: TOGGLE_IS_FETCH_DATA,
    payload: {
      isFetch,
    },
  }),
  toggleFollowingProgress: (isFollowingProgress: boolean): ActionsType => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    payload: {
      isFollowingProgress,
    },
  }),
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.isFetchData(true));
      const response: any = await apiUsers.getUsers(currentPage, pageSize);
      dispatch(actions.setUsers(response.data.items));
      dispatch(actions.getTotalCount(response.data.totalCount));
      dispatch(actions.setPagesCount(response.data.totalCount, pageSize));
      dispatch(actions.isFetchData(false));
    } catch (error) {
      console.error(error);
    }
  };

export const followUserAction =
  (id: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await apiUsers.follow(id);
      if (response.data.resultCode === 0) {
        dispatch(actions.toggleFollowUnfollow(id));
        dispatch(actions.toggleFollowingProgress(false));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const unfollowUserAction =
  (id: number): ThunkType =>
  async (dispatch) => {
    try {
      await apiUsers.unfollow(id);
      dispatch(actions.toggleFollowUnfollow(id));
      dispatch(actions.toggleFollowingProgress(false));
    } catch (error) {
      console.error(error);
    }
  };

export type ActionsTypes = typeof actions;
