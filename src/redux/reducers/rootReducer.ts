import { combineReducers } from 'redux';
import { posts } from './ProfileReducer';
import { messages } from './MessagesReducer';
import { users } from './UsersReducers';

const rootReducer = combineReducers({
  profilePage: posts,
  messagesPage: messages,
  usersPage: users,
});

export default rootReducer;
