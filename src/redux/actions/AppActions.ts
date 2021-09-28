import { ThunkAction } from 'redux-thunk';
import { AppStateType, InferActionsTypes } from '../reducers/rootReducer';
import { getAuthUserData } from './AuthActions';
import { actions as errorActions } from '../actions/ErrorsActions';

const INITIALIZED_SUCCESS = 'SN/APPACTIONS/INITIALIZED_SUCCESS';

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
};

export const initializeApp = (): ThunkType => async (dispatch) => {
  try {
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
  } catch (err: unknown) {
    if (err instanceof Error) {
      dispatch(errorActions.setError(err.message));
    }
  }
};

export type ActionsType = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;
