import { DialogType, MessageType } from '../../types/types';
import { ActionsType } from '../actions/MessagesActions';

const UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

const initialState = {
  messages: [
    { id: 1, text: 'hello' },
    { id: 2, text: 'hi' },
    { id: 3, text: 'yo' },
    { id: 4, text: 'bye' },
  ] as Array<MessageType>,
  dialogs: [
    { id: 1, name: 'roxy' },
    { id: 1, name: 'adam' },
    { id: 1, name: 'ben' },
    { id: 1, name: 'shem' },
    { id: 1, name: 'rich' },
    { id: 1, name: 'unknown' },
  ] as Array<DialogType>,
  newMessageText: '' as string,
};

export const messages = (state = initialState, action: ActionsType): typeof initialState => {
  switch (action.type) {
    case ADD_NEW_MESSAGE: {
      const messages = [...state.messages, action.payload.newMessage];
      return { ...state, messages };
    }
    case UPDATE_TEXT_NEW_MESSAGE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export type InitialStateType = typeof initialState;
