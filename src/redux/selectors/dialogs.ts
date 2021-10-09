import { AppStateType } from '../reducers/rootReducer';

// export const getDialogs = (state: AppStateType) => {
//   return state.messagesPage.dialogs;
// };

export const getMessages = (state: AppStateType) => {
  return state.messagesPage.messages;
};
