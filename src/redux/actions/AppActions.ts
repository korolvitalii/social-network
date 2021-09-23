import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from '../reducers/rootReducer';
import { getAuthUserData } from './AuthActions';

const INITIALIZED_SUCCESS = 'SN/APPACTIONS/INITIALIZED_SUCCESS';

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
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
