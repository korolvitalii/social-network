import { MessageType } from '../../types/types';

const ADD_NEW_MESSAGE = 'SN/MESSAGEACTIONS/ADD_NEW_MESSAGE';

export type AddNewMessageType = {
  type: typeof ADD_NEW_MESSAGE;
  payload: {
    newMessage: MessageType;
  };
};

export type ActionsType = AddNewMessageType;

export const actions = {
  addNewMessage: (newMessage: MessageType): ActionsType => ({
    type: ADD_NEW_MESSAGE,
    payload: {
      newMessage,
    },
  }),
};
