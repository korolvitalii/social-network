import { MessageType } from '../../types/types';
import { ActionsType } from '../actions/MessagesActions';

// const ADD_NEW_MESSAGE = 'SN/MESSAGEACTIONS/ADD_NEW_MESSAGE';
const FETCH_MESSAGES = 'SN/MESSAGESACTIONS/FETCH_MESSAGES';

const initialState = {
  messages: [] as MessageType[],
};

type InitialStateType = typeof initialState;

export const MessagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case FETCH_MESSAGES: {
      return { ...state, messages: action.payload.messages };
    }
    // case ADD_NEW_MESSAGE: {
    //   const messages = [...state.messages, action.payload.newMessage];
    //   return { ...state, messages };
    // }
    default:
      return state;
  }
};
