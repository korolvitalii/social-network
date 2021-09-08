import { combineReducers } from 'redux';
import { ProfileReducer } from './ProfileReducer';
import { messages } from './MessagesReducer';
import { UsersReducer } from './UsersReducers';
import { authReducer } from './AuthReducer';
import { appReducer } from './AppReducers';

const rootReducer = combineReducers({
  profilePage: ProfileReducer,
  messagesPage: messages,
  usersPage: UsersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

export default rootReducer;
