import { authApi } from '../../api/api';

export type SetUserDataType = {
  type: typeof SET_USER_DATA;
  payload: {
    userData: {
      id: number;
      email: string;
      login: string;
    };
  };
};

export type ActionsType = SetUserDataType;
const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (id: number, email: string, login: string): ActionsType => ({
  type: SET_USER_DATA,
  payload: {
    userData: {
      id,
      email,
      login,
    },
  },
});

export const authMeAction = () => (dispatch: any) => {
  authApi.authMe().then((response: any) => {
    const { email, id, login } = response.data.data;
    if (response.data.resultCode === 0) {
      dispatch(setUserData(id, email, login));
    }
  });
};
