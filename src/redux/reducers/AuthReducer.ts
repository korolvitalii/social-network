import { ActionsType } from '../../types/types';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean,
};

export const authReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload.userData, isAuth: true };
    }
    default:
      return state;
  }
};
