import { InferActionsTypes } from '../reducers/rootReducer';

const SET_ERROR = 'SN/ERRORACTIONS/SET_ERROR';
const RESET_ERROR = 'SN/ERRORACTIONS/RESET_ERROR';

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  setError: (error: string) =>
    ({
      type: SET_ERROR,
      payload: {
        error,
      },
    } as const),
  resetError: () =>
    ({
      type: RESET_ERROR,
    } as const),
};
