import { InferActionsTypes } from '../reducers/rootReducer';
import { getAuthUserData } from './AuthActions';

const INITIALIZED_SUCCESS = 'SN/APPACTIONS/INITIALIZED_SUCCESS';

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export type ActionsType = InferActionsTypes<typeof actions>;
// type ThunkType = BaseThunkType<ActionsType>;
