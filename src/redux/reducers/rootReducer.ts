import { Action, combineReducers } from 'redux';
import { ProfileReducer } from './ProfileReducer';
import { MessagesReducer } from './MessagesReducer';
import { UsersReducer } from './UsersReducers';
import { AuthReducer } from './AuthReducer';
import { AppReducer } from './AppReducers';
import { ThunkAction } from 'redux-thunk';
import { ErrorsReducer } from './ErrorsReducer';

const rootReducer = combineReducers({
  profilePage: ProfileReducer,
  messagesPage: MessagesReducer,
  usersPage: UsersReducer,
  auth: AuthReducer,
  app: AppReducer,
  errors: ErrorsReducer,
});

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType

export type AppStateType = ReturnType<RootReducerType>;

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;

export default rootReducer;
