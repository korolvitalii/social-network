import { apiUsers } from '../../api/api';

const CHANGE_FLAG = 'CHANGE_FLAG';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'TOGGLE_IS_FETCH_DATA';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

export type PostType = {
  id: number;
  message: string;
  likeCount: number;
};

export type MessageType = {
  id: number;
  text: string;
};

export type DialogType = {
  id: number;
  name: string;
};

export type UserType = {
  name: string;
  id: number;
  uniqueUrlName: null | string;
  photos: {
    small: undefined | string;
    large: undefined | string;
  };
  status: null | string;
  followed: boolean;
};

type ServerData = {
  items: Array<UserType>;
  totalCount: number;
  error: null | string;
};

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

// export const toggleFollowUnfollow = (id: number): ActionsType => ({
//   type: CHANGE_FLAG,
//   payload: {
//     userId: id,
//   },
// });

// export const setUsers = (items: Array<UserType>): ActionsType => ({
//   type: SET_USERS,
//   payload: {
//     items: items,
//   },
// });

// export const getTotalCount = (totalCount: number): ActionsType => ({
//   type: GET_TOTAL_COUNT,
//   payload: {
//     totalCount,
//   },
// });

// export const setPagesCount = (totalCount: number, pageSize: number): ActionsType => ({
//   type: SET_PAGES_COUNT,
//   payload: {
//     totalCount,
//     pageSize,
//   },
// });

// export const isFetchData = (isFetch: boolean): ActionsType => ({
//   type: TOGGLE_IS_FETCH_DATA,
//   payload: {
//     isFetch,
//   },
// });

// export const toggleFollowingProgress = (isFollowingProgress: boolean): ActionsType => ({
//   type: TOGGLE_FOLLOWING_PROGRESS,
//   payload: {
//     isFollowingProgress,
//   },
// });

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: any) => {
  dispatch(actions.isFetchData(true));
  apiUsers.getUsers(currentPage, pageSize).then((response: ServerData) => {
    dispatch(actions.setUsers(response.items));
    dispatch(actions.getTotalCount(response.totalCount));
    dispatch(actions.setPagesCount(response.totalCount, pageSize));
    dispatch(actions.isFetchData(false));
  });
};

export const followUserAction = (id: number) => (dispatch: any) => {
  apiUsers.follow(id).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(actions.toggleFollowUnfollow(id));
      dispatch(actions.toggleFollowingProgress(false));
    }
  });
};

export const unfollowUserAction = (id: number) => (dispatch: any) => {
  apiUsers.unfollow(id).then((response: any) => {
    dispatch(actions.toggleFollowUnfollow(id));
    dispatch(actions.toggleFollowingProgress(false));
  });
};

export type ActionsTypes = typeof actions;
