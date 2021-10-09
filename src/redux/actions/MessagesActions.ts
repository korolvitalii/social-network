import { MessageType } from '../../types/types';
import { InferActionsTypes } from '../reducers/rootReducer';

// const ADD_NEW_MESSAGE = 'SN/MESSAGEACTIONS/ADD_NEW_MESSAGE';
const FETCH_MESSAGES = 'SN/MESSAGESACTIONS/FETCH_MESSAGES';

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  fetchMessages: (messages: MessageType[]) =>
    ({
      type: FETCH_MESSAGES,
      payload: {
        messages,
      },
    } as const),
  // addNewMessage: (newMessage: MessageType) => ({
  //   type: ADD_NEW_MESSAGE,
  //   payload: {
  //     newMessage,
  //   },
  // }),
};
