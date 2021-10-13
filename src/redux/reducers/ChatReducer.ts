import { ChatMessageType, StatusType } from '../../api/chat-api';
import { ActionsType } from '../actions/ChatActions';

const MESSAGE_RECEVIED = 'SN/CHATACTIONS/MESSAGE_RECEVIED';
const REMOVE_MESSAGES = 'SN/CHATACTIONS/REMOVE_MESSAGES';
const STATUS_CHANGED = 'SN/CHATACTIONS/STATUS_CHANGED';

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

export const ChatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case MESSAGE_RECEVIED: {
      return { ...state, messages: [...state.messages, ...action.payload.messages] };
    }
    case REMOVE_MESSAGES: {
      return { ...state, messages: [] };
    }
    case STATUS_CHANGED: {
      return { ...state, status: action.payload.status };
    }
    default:
      return state;
  }
};

type InitialStateType = typeof initialState;
