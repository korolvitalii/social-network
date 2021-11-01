// import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes } from '../reducers/rootReducer';
import { getAuthUserData } from './AuthActions';

const INITIALIZED_SUCCESS = 'SN/APPACTIONS/INITIALIZED_SUCCESS';

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),
};

// export const initializeApp = (): ThunkType => async (dispatch) => {
//   try {

//     dispatch(actions.initializedSuccess());
//     dispatch(getAuthUserData());
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       dispatch(errorActions.setError(err.message));
//     }
//   }
// }; bug ---> after success login show error

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export type ActionsType = InferActionsTypes<typeof actions>;
// type ThunkType = BaseThunkType<ActionsType>;
