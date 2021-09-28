import { ResultCodesEnum } from '../../api/api';
import { apiUsers } from '../../api/users-api';
import { UserType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';
import { actions as errorActions } from '../actions/ErrorsActions';

const CHANGE_FLAG = 'SN/USERACTIONS/CHANGE_FLAG';
const SET_USERS = 'SN/USERACTIONS/SET_USERS';
const GET_TOTAL_COUNT = 'SN/USERACTIONS/GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SN/USERACTIONS/SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'SN/USERACTIONS/TOGGLE_IS_FETCH_DATA';
const TOGGLE_FOLLOWING_PROGRESS = 'SN/USERACTIONS/TOGGLE_FOLLOWING_PROGRESS';

export const actions = {
  toggleFollowUnfollow: (id: number) =>
    ({
      type: CHANGE_FLAG,
      payload: {
        userId: id,
      },
    } as const),
  setUsers: (items: Array<UserType>) =>
    ({
      type: SET_USERS,
      payload: {
        items: items,
      },
    } as const),
  getTotalCount: (totalCount: number) =>
    ({
      type: GET_TOTAL_COUNT,
      payload: {
        totalCount,
      },
    } as const),
  setPagesCount: (totalCount: number, pageSize: number) =>
    ({
      type: SET_PAGES_COUNT,
      payload: {
        totalCount,
        pageSize,
      },
    } as const),
  isFetchData: (isFetch: boolean) =>
    ({
      type: TOGGLE_IS_FETCH_DATA,
      payload: {
        isFetch,
      },
    } as const),
  toggleFollowingProgress: (isFollowingProgress: boolean) =>
    ({
      type: TOGGLE_FOLLOWING_PROGRESS,
      payload: {
        isFollowingProgress,
      },
    } as const),
};

export const getUsers =
  (currentPage: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.isFetchData(true));
      const response = await apiUsers.getUsers(currentPage, pageSize);
      if (!response.error) {
        dispatch(actions.setUsers(response.items));
        dispatch(actions.getTotalCount(response.totalCount));
        dispatch(actions.setPagesCount(response.totalCount, pageSize));
        dispatch(actions.isFetchData(false));
      } else {
        dispatch(errorActions.setError(response.error));
        dispatch(actions.isFetchData(false));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const followUserAction =
  (id: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await apiUsers.follow(id);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.toggleFollowingProgress(true));
        dispatch(actions.toggleFollowUnfollow(id));
        dispatch(actions.toggleFollowingProgress(false));
      } else {
        // dispatch(errorActions.setError(response.message));
        dispatch(actions.toggleFollowingProgress(false));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const unfollowUserAction =
  (id: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await apiUsers.unfollow(id);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.toggleFollowingProgress(true));
        dispatch(actions.toggleFollowUnfollow(id));
        dispatch(actions.toggleFollowingProgress(false));
      } else {
        // dispatch(actions.setError(response.message));
        dispatch(actions.toggleFollowingProgress(false));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export type ActionsTypes = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = BaseThunkType<ActionsTypes>;
