import { ResultCodesEnum } from '../../api/api';
import { DialogMessageType, dialogsApi, DialogType } from '../../api/dialogs-api';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';

const SET_ALL_DIALOGS = 'SN/DIALOGS/SET_ALL_DIALOGS';
const SET_MESSAGE = 'SN/DIALOGS/SET_MESSAGE';
const SET_USER_MESSAGES = 'SN/DIALOGS/SET_USER_MESSAGES';
const START_CHATTING = 'SN/DIALOGS/START_CHATTING';
const UPDATE_DIALOG_MESSAGES = 'SN/DIALOGS/UPDATE_DIALOG_MESSAGES';

export const actions = {
  setAllDialogs: (dialogs: DialogType[]) =>
    ({
      type: SET_ALL_DIALOGS,
      payload: {
        dialogs,
      },
    } as const),
  setUserMessages: (messages: DialogMessageType[]) =>
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
  startChatting: (id: number) =>
    ({
      type: START_CHATTING,
      payload: {
        id,
      },
    } as const),
  updateDialogMessages: (isUpdate: boolean) =>
    ({
      type: UPDATE_DIALOG_MESSAGES,
      payload: {
        isUpdate,
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
        dispatch(actions.setUserMessages(response.items));
      }
    } catch {
      console.error('some error');
    }
  };

export const sendMessage =
  (userId: number, message: { body: string }): ThunkType =>
  async () => {
    try {
      const response = await dialogsApi.sendMessage(userId, message);
      debugger;
      if (response.resultCode === ResultCodesEnum.Success) {
        await getAllDialogs();
      }
    } catch {
      console.error('some error');
    }
  };

export const startChattingThunk =
  (userId: number): ThunkType =>
  async () => {
    try {
      await dialogsApi.startChatting(userId);
    } catch {
      console.log('error');
    }
  };
export type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
