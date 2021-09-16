import { authApi } from '../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERRORS = 'SET_AUTH_ERRORS';

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

type authErrors = {
  type: typeof SET_AUTH_ERRORS;
  payload: {
    errors: Array<string>;
  };
};

export type ActionsType = SetUserDataType | authErrors;

export const setUserData = (
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
});

export const authErrors = (errors: Array<string>): ActionsType => ({
  type: SET_AUTH_ERRORS,
  payload: {
    errors,
  },
});

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authApi.authMe();
  const { email, id, login } = response.data.data;
  if (response.data.resultCode === 0) {
    dispatch(setUserData(id, email, login, true));
  }
};

export const loginAction = (loginData: any) => async (dispatch: any) => {
  const response = await authApi.login(loginData);
  if (response.data.resultCode === 0) {
    dispatch(authErrors([]));
    dispatch(getAuthUserData());
  } else {
    dispatch(authErrors(response.data.messages));
  }
};

export const logoutAction = () => async (dispatch: any) => {
  const response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};
