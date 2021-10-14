import { ActionsType } from '../actions/DialogsActions';

const SET_ALL_DIALOGS = 'SN/DIALOGS/SET_ALL_DIALOGS';
const SET_MESSAGE = 'SN/DIALOGS/SET_MESSAGE';

const initialState = {
  dialogs: [] as any,
  message: null as string | null,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (state = initialState, actions: ActionsType) => {
  switch (actions.type) {
    case SET_ALL_DIALOGS: {
      return { ...state, dialogs: { ...state.dialogs, ...actions.payload.dialogs } };
    }
    case SET_MESSAGE: {
      return { ...state, message: actions.payload.message };
    }
    default:
      return state;
  }
};
