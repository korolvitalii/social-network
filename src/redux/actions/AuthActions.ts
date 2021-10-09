import { ResultCodeForCaptchaEnum, ResultCodesEnum } from '../../api/api';
import { authApi, securityApi } from '../../api/auth-api';
import { arrayMessagesToStringMessage } from '../../helpers/helpers';
import { actions as errorActions } from '../actions/ErrorsActions';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';

const SET_USER_DATA = 'SN/AUTHACTIONS/SET_USER_DATA';
const SET_AUTH_ERRORS = 'SN/AUTHACTIONS/SET_AUTH_ERRORS';
const SET_CAPTCHA_URL = 'SN/AUTHACTIONS/SET_CAPTCHA_URL';

export const actions = {
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
    const { email, id, login } = response.data;
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserData(id, email, login, true));
    } else {
      dispatch(errorActions.setError(arrayMessagesToStringMessage(response.messages)));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(errorActions.setError(err.message));
    }
  }
};

export const loginAction =
  (loginData: any): ThunkType =>
  async (dispatch) => {
    try {
      const response = await authApi.login(loginData);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.authErrors([]));
        dispatch(getAuthUserData());
      } else {
        if (response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
          dispatch(getCaptcha());
        } else {
          dispatch(actions.authErrors(response.messages));
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const logoutAction = (): ThunkType => async (dispatch) => {
  try {
    const response = await authApi.logout();
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserData(null, null, null, false));
    } else {
      dispatch(errorActions.setError(arrayMessagesToStringMessage(response.messages)));
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(errorActions.setError(err.message));
    }
  }
};

export const getCaptcha = (): ThunkType => async (dispatch) => {
  try {
    const response = await securityApi.getCaptchaUrl();
    dispatch(actions.setCaptcha(response.url));
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(errorActions.setError(err.message));
    }
  }
};

export type ActionsType = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = BaseThunkType<ActionsType>;
