import { DialogMessageType, DialogType } from '../../api/dialogs-api';
import { ActionsType } from '../actions/DialogsActions';

const SET_ALL_DIALOGS = 'SN/DIALOGS/SET_ALL_DIALOGS';
const SET_MESSAGE = 'SN/DIALOGS/SET_MESSAGE';
const SET_USER_MESSAGES = 'SN/DIALOGS/SET_USER_MESSAGES';
const UPDATE_DIALOG_MESSAGES = 'SN/DIALOGS/UPDATE_DIALOG_MESSAGES';

const initialState = {
  dialogs: [] as DialogType[],
  message: null as string | null,
  userMessages: [] as DialogMessageType[],
  isUpdate: false as boolean,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (state = initialState, actions: ActionsType): InitialStateType => {
  switch (actions.type) {
    case SET_ALL_DIALOGS: {
      return { ...state, dialogs: [...state.dialogs, ...actions.payload.dialogs] };
    }
    case SET_MESSAGE: {
      return { ...state, message: actions.payload.message };
    }
    case SET_USER_MESSAGES: {
      return { ...state, userMessages: actions.payload.messages };
    }
    case UPDATE_DIALOG_MESSAGES: {
      return { ...state, isUpdate: actions.payload.isUpdate };
    }
    default:
      return state;
  }
};
