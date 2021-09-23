import { MessageType } from '../../types/types';
import { InferActionsTypes } from '../reducers/rootReducer';

const ADD_NEW_MESSAGE = 'SN/MESSAGEACTIONS/ADD_NEW_MESSAGE';

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  addNewMessage: (newMessage: MessageType) => ({
    type: ADD_NEW_MESSAGE,
    payload: {
      newMessage,
    },
  }),
};
