import { ResultCodesEnum } from '../../api/api';
import { dialogsApi } from '../../api/dialogs-api';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';
import { actions as errorActions } from './ErrorsActions';

const SET_ALL_DIALOGS = 'SN/DIALOGS/SET_ALL_DIALOGS';
const SET_MESSAGE = 'SN/DIALOGS/SET_MESSAGE';
const SET_USER_MESSAGES = 'SN/DIALOGS/SET_USER_MESSAGES';

const actions = {
  setAllDialogs: (dialogs: any) =>
    ({
      type: SET_ALL_DIALOGS,
      payload: {
        dialogs,
      },
    } as const),
  setUserMessages: (messages: any) =>
    ({
      type: SET_USER_MESSAGES,
      payload: {
        messages,
      },
    } as const),
  setMessage: (message: string) =>
    ({
      type: SET_MESSAGE,
      payload: {
        message,
      },
    } as const),
};

export const getAllDialogs = (): ThunkType => async (dispatch) => {
  try {
    const response = await dialogsApi.getAllDialogs();
    if (response) {
      dispatch(actions.setAllDialogs(response));
    }
  } catch {
    console.error('some error');
  }
};

export const getListOfMessages =
  (id: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await dialogsApi.getListOfMessage(id, 1, 10);
      if (response) {
        dispatch(actions.setUserMessages(response));
      }
    } catch {
      console.error('some error');
    }
  };

export const sendMessage =
  (userId: number, message: any): ThunkType =>
  async (dispatch) => {
    try {
      const response = await dialogsApi.sendMessage(userId, message);
      if (response.resultCode === ResultCodesEnum.Success) {
        debugger;
        const newResponse = await getAllDialogs();

        dispatch(actions.setAllDialogs(newResponse));
      }
    } catch {
      console.error('some error');
    }
  };

export type ActionsType = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = BaseThunkType<ActionsType>;
