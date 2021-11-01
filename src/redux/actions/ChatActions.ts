import { chatApi, ChatMessageType, StatusType } from '../../api/chat-api';
import { BaseThunkType, InferActionsTypes } from '../reducers/rootReducer';
import { actions as errorActions } from '../actions/ErrorsActions';
import { Dispatch } from 'redux';

const MESSAGE_RECEVIED = 'SN/CHATACTIONS/MESSAGE_RECEVIED';
const REMOVE_MESSAGES = 'SN/CHATACTIONS/REMOVE_MESSAGES';
const STATUS_CHANGED = 'SN/CHATACTIONS/STATUS_CHANGED';

export const actions = {
  messageRecevied: (messages: ChatMessageType[]) =>
    ({
      type: MESSAGE_RECEVIED,
      payload: {
        messages,
      },
    } as const),
  clearMessageInStore: () =>
    ({
      type: REMOVE_MESSAGES,
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: STATUS_CHANGED,
      payload: {
        status,
      },
    } as const),
};

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let statusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (newMessageHandler === null) {
    newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(actions.messageRecevied(messages));
    };
  }

  return newMessageHandler;
};

const statusChangeStatus = (dispatch: Dispatch) => {
  if (statusChangedHandler === null) {
    statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return statusChangedHandler;
};

export const startMessageListening = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe('messagesReceived', newMessageHandlerCreator(dispatch));
  chatApi.subscribe('statusChanged', statusChangeStatus(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe('messagesReceived', newMessageHandlerCreator(dispatch));
  chatApi.unsubscribe('statusChanged', statusChangeStatus(dispatch));
  chatApi.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chatApi.sendMessage(message);
  };

export type ActionsTypes = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export type ActionsType = InferActionsTypes<typeof actions>;
