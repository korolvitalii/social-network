import { AppStateType } from '../reducers/rootReducer';

export const selectAuth = (state: AppStateType) => state.auth;

export const selectAuthUserId = (state: AppStateType) => selectAuth(state).id;
