import { ActionsType } from '../../types/types';

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
