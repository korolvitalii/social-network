import { Action, combineReducers } from 'redux';
import { ProfileReducer } from './ProfileReducer';
import { UsersReducer } from './UsersReducer';
import { AuthReducer } from './AuthReducer';
import { AppReducer } from './AppReducer';
import { ThunkAction } from 'redux-thunk';
import { ErrorsReducer } from './ErrorsReducer';
import { ChatReducer } from './ChatReducer';

const rootReducer = combineReducers({
  profilePage: ProfileReducer,
  usersPage: UsersReducer,
  auth: AuthReducer,
  app: AppReducer,
  errors: ErrorsReducer,
  chat: ChatReducer,
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
