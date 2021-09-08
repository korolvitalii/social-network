import { ActionsType } from '../actions/AuthActions';
const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERRORS = 'SET_AUTH_ERRORS';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
};

export const authReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload.userData, isAuth: action.payload.userData.isAuth };
    }
    case SET_AUTH_ERRORS: {
      return { ...state, authErrors: action.payload.errors };
    }
    default:
      return state;
  }
};
