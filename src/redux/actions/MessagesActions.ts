import { ActionsType, MessageType } from '../../types/types';

const UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

export const updateNewMessageText = (newMessageText: string): ActionsType => ({
  type: UPDATE_TEXT_NEW_MESSAGE,
  payload: {
    newMessageText,
  },
});

export const addNewMessage = (newMessage: MessageType): ActionsType => ({
  type: ADD_NEW_MESSAGE,
  payload: {
    newMessage,
  },
});
