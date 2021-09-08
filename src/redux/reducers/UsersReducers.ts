import { UserType } from '../../types/types';
import { ActionsType } from '../actions/UsersActions';

const CHANGE_FLAG = 'CHANGE_FLAG';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'TOGGLE_IS_FETCH_DATA';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
  users: [] as Array<UserType>,
  totalCount: 0 as number,
  pageSize: 10 as number,
  pagesCount: 10 as number,
  isFetch: true as boolean,
  isFollowingProgress: false as boolean,
};

export const UsersReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.payload.items };
    }
    case CHANGE_FLAG: {
      const updateUsers = state.users.map((user) => {
        if (user.id === action.payload.userId) {
          user.followed = !user.followed;
        }
        return user;
      });
      return { ...state, users: updateUsers };
    }
    case GET_TOTAL_COUNT: {
      return { ...state, totalCount: action.payload.totalCount };
    }
    case SET_PAGES_COUNT: {
      const {
        payload: { totalCount, pageSize },
      } = action;
      const pagesCount = Math.ceil(totalCount / pageSize);
      return { ...state, pagesCount };
    }
    case TOGGLE_IS_FETCH_DATA: {
      return { ...state, isFetch: action.payload.isFetch };
    }
    case TOGGLE_FOLLOWING_PROGRESS: {
      return { ...state, isFollowingProgress: action.payload.isFollowingProgress };
    }
    default:
      return state;
  }
};

export type initialStateType = typeof initialState;
