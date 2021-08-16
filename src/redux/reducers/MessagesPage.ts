import { ActionsType, DialogType, MessageType, UPDATE_TEXT_NEW_MESSAGE } from '../../types/types';

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
};

export const messages = (state = initialState, action: ActionsType): typeof initialState => {
  switch (action.type) {
    // case ADD_NEW_POST: {
    //   // debugger;
    //   const posts = [...state.posts, action.payload.newPost];
    //   return { ...state, posts };
    // }
    case UPDATE_TEXT_NEW_MESSAGE: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
