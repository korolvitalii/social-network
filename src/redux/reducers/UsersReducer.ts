import { UserType } from '../../types/types';
import { ActionsTypes } from '../actions/UsersActions';

const CHANGE_FLAG = 'SN/USERACTIONS/CHANGE_FLAG';
const SET_USERS = 'SN/USERACTIONS/SET_USERS';
const GET_TOTAL_COUNT = 'SN/USERACTIONS/GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SN/USERACTIONS/SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'SN/USERACTIONS/TOGGLE_IS_FETCH_DATA';
const TOGGLE_FOLLOWING_PROGRESS = 'SN/USERACTIONS/TOGGLE_FOLLOWING_PROGRESS';
const SET_TERM = 'SN/USERACTIONS/SET_TERM';
const TOGGLE_FRIEND = 'SN/USERACTIONS/TOGGLE_FRIEND';

const initialState = {
  users: [] as Array<UserType>,
  totalCount: 0 as number,
  pageSize: 10 as number,
  pagesCount: 10 as number,
  isFetch: true as boolean,
  isFollowingProgress: false as boolean,
  networkErrors: '' as string,
  filters: {
    term: '' as string,
    showFriends: false as boolean | string,
  },
};

export type InitialStateType = typeof initialState;

export const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
    case SET_TERM: {
      return {
        ...state,
        filters: { term: action.payload.term, showFriends: state.filters.showFriends },
      };
    }
    case TOGGLE_FRIEND: {
      return {
        ...state,
        filters: { term: state.filters.term, showFriends: action.payload.showFriends },
      };
    }
    default:
      return state;
  }
};
