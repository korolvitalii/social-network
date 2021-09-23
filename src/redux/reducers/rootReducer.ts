import { Action, combineReducers } from 'redux';
import { ProfileReducer } from './ProfileReducer';
import { MessagesReducer } from './MessagesReducer';
import { UsersReducer } from './UsersReducers';
import { authReducer } from './AuthReducer';
import { appReducer } from './AppReducers';
import { ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
  profilePage: ProfileReducer,
  messagesPage: MessagesReducer,
  usersPage: UsersReducer,
  auth: authReducer,
  app: appReducer,
});
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;
type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;

export default rootReducer;
