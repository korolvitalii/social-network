import { AppStateType } from '../reducers/rootReducer';

export const selectAuth = (state: AppStateType) => state.auth;
