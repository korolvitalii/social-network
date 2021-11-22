import { AppStateType } from '../reducers/rootReducer';

export const selectMessages = (state: AppStateType) => state.chat.messages;
export const selectDialog = (state: AppStateType) => state.dialogs.dialogs;
