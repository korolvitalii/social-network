const UPDATE_TEXT_NEW_MESSAGE = 'UPDATE_TEXT_NEW_MESSAGE';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

export type MessageType = {
  id: number;
  text: string;
};

export type AddNewMessageType = {
  type: typeof ADD_NEW_MESSAGE;
  payload: {
    newMessage: MessageType;
  };
};

export type UpdateNewMessageTextType = {
  type: typeof UPDATE_TEXT_NEW_MESSAGE;
  payload: {
    newMessageText: string;
  };
};

export type ActionsType = AddNewMessageType | UpdateNewMessageTextType;

export const actions = {
  updateNewMessageText: (newMessageText: string): ActionsType => ({
    type: UPDATE_TEXT_NEW_MESSAGE,
    payload: {
      newMessageText,
    },
  }),
  addNewMessage: (newMessage: MessageType): ActionsType => ({
    type: ADD_NEW_MESSAGE,
    payload: {
      newMessage,
    },
  }),
};

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
