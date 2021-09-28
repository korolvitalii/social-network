import { ActionsType } from '../actions/AuthActions';

const SET_USER_DATA = 'SN/AUTHACTIONS/SET_USER_DATA';
const SET_AUTH_ERRORS = 'SN/AUTHACTIONS/SET_AUTH_ERRORS';
const SET_CAPTCHA_URL = 'SN/AUTHACTIONS/SET_CAPTCHA_URL';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
  authErrors: [] as Array<string>,
  captcha: null as string | null,
};

type InitialStateType = typeof initialState;

export const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload.userData, isAuth: action.payload.userData.isAuth };
    }
    case SET_AUTH_ERRORS: {
      return { ...state, authErrors: action.payload.errors };
    }
    case SET_CAPTCHA_URL: {
      return { ...state, captcha: action.payload.captcha };
    }
    default:
      return state;
  }
};
