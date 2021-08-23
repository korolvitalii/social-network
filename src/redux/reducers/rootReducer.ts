import { combineReducers } from 'redux';
import { posts } from './ProfileReducer';
import { messages } from './MessagesReducer';
import { users } from './UsersReducers';
import { authReducer } from './AuthReducer';

const rootReducer = combineReducers({
  profilePage: posts,
  messagesPage: messages,
  usersPage: users,
  auth: authReducer,
});

export default rootReducer;
