import { authApi, securityApi } from '../../api/api';

const SET_USER_DATA = 'SN/AUTHACTIONS/SET_USER_DATA';
const SET_AUTH_ERRORS = 'SN/AUTHACTIONS/SET_AUTH_ERRORS';
const SET_CAPTCHA_URL = 'SN/AUTHACTIONS/SET_CAPTCHA_URL';

export type SetUserDataType = {
  type: typeof SET_USER_DATA;
  payload: {
    userData: {
      id: number | null;
      email: string | null;
      login: string | null;
      isAuth: boolean;
    };
  };
};

type AuthErrorsType = {
  type: typeof SET_AUTH_ERRORS;
  payload: {
    errors: Array<string>;
  };
};

type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL;
  payload: {
    captcha: string;
  };
};

export type ActionsType = SetUserDataType | AuthErrorsType | SetCaptchaUrlType;

const actions = {
  setUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ): ActionsType => ({
    type: SET_USER_DATA,
    payload: {
      userData: {
        id,
        email,
        login,
        isAuth,
      },
    },
  }),
  authErrors: (errors: Array<string>): ActionsType => ({
    type: SET_AUTH_ERRORS,
    payload: {
      errors,
    },
  }),
  setCaptcha: (captcha: string): ActionsType => ({
    type: SET_CAPTCHA_URL,
    payload: {
      captcha,
    },
  }),
};

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authApi.authMe();
  const { email, id, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(id, email, login, true));
  }
};

export const loginAction = (loginData: any) => async (dispatch: any) => {
  const response = await authApi.login(loginData);
  if (response.data.resultCode === 0) {
    dispatch(actions.authErrors([]));
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha());
    }
    dispatch(actions.authErrors(response.data.messages));
  }
};

export const logoutAction = () => async (dispatch: any) => {
  const response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setUserData(null, null, null, false));
  }
};

export const getCaptcha = () => async (dispatch: any) => {
  const response = await securityApi.getCaptchaUrl();
  dispatch(actions.setCaptcha(response.data.url));
};
