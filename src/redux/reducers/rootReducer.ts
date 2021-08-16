import { combineReducers } from 'redux';
import { posts } from './ProfilePage';
import { messages } from './MessagesPage';

const rootReducer = combineReducers({ profilePage: posts, messagesPage: messages });

export default rootReducer;
