import { ThunkAction } from 'redux-thunk';
import { AppStateType } from '../reducers/rootReducer';
import { getAuthUserData } from './AuthActions';

const INITIALIZED_SUCCESS = 'SN/APPACTIONS/INITIALIZED_SUCCESS';

type authErrors = {
  type: typeof INITIALIZED_SUCCESS;
};

export type ActionsType = authErrors;

export const actions = {
  initializedSuccess: (): authErrors => ({ type: INITIALIZED_SUCCESS }),
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  try {
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
  } catch (error) {
    console.log(error);
  }
};
