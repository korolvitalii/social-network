import { ActionsType, UserType } from '../../types/types';

const CHANGE_FLAG = 'CHANGE_FLAG';
const SET_USERS = 'SET_USERS';
const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT';
const SET_PAGES_COUNT = 'SET_PAGES_COUNT';
const TOGGLE_IS_FETCH_DATA = 'TOGGLE_IS_FETCH_DATA';

const initialState = {
  users: [] as Array<UserType>,
  totalCount: 0 as number,
  pageSize: 10 as number,
  pagesCount: 10 as number,
  isFetch: true as boolean,
};

export const users = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_USERS: {
      const newUsers = action.payload.items;
      return { ...state, users: newUsers };
    }
    case CHANGE_FLAG: {
      // debugger;
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
    default:
      return state;
  }
};
