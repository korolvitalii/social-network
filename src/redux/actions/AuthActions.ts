import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../../api/api';
import { authApi, securityApi } from '../../api/auth-api';
import { LoginDataType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';

const SET_USER_DATA = 'SN/AUTHACTIONS/SET_USER_DATA';
const SET_AUTH_ERRORS = 'SN/AUTHACTIONS/SET_AUTH_ERRORS';
const SET_CAPTCHA_URL = 'SN/AUTHACTIONS/SET_CAPTCHA_URL';

const actions = {
  setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
      type: SET_USER_DATA,
      payload: {
        userData: {
          id,
          email,
          login,
          isAuth,
        },
      },
    } as const),
  authErrors: (errors: Array<string>) =>
    ({
      type: SET_AUTH_ERRORS,
      payload: {
        errors,
      },
    } as const),
  setCaptcha: (captcha: string) =>
    ({
      type: SET_CAPTCHA_URL,
      payload: {
        captcha,
      },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  try {
    const response = await authApi.authMe();
    const { email, id, login } = response.data.data;
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserData(id, email, login, true));
    }
  } catch (error) {
    console.error(error);
  }
};

export const loginAction =
  (loginData: LoginDataType): ThunkType =>
  async (dispatch) => {
    try {
      const response = await authApi.login(loginData);
      if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.authErrors([]));
        dispatch(getAuthUserData());
      } else {
        if (response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
          dispatch(getCaptcha());
        }
        dispatch(actions.authErrors(response.data.messages));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const logoutAction = (): ThunkType => async (dispatch) => {
  try {
    const response = await authApi.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserData(null, null, null, false));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCaptcha = (): ThunkType => async (dispatch) => {
  try {
    const response = await securityApi.getCaptchaUrl();
    dispatch(actions.setCaptcha(response.data.url));
  } catch (error) {
    console.error(error);
  }
};

export type ActionsType = InferActionsTypes<typeof actions>;

type ThunkType = BaseThunkType<ActionsType>;
