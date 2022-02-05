import { AppStateType } from '../reducers/rootReducer';

export const selectInit = (state: AppStateType) => state.app.initialized;
