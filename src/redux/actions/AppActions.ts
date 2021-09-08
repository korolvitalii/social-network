import { getAuthUserData } from './AuthActions';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type authErrors = {
  type: typeof INITIALIZED_SUCCESS;
};

export type ActionsType = authErrors;

export const actions = {
  initializedSuccess: (): authErrors => ({ type: INITIALIZED_SUCCESS }),
};

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};
