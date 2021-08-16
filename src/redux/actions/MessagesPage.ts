import { ActionsType, UPDATE_TEXT_NEW_MESSAGE } from '../../types/types';

export const UpdateNewMessageText = (newMessageText: string): ActionsType => ({
  type: UPDATE_TEXT_NEW_MESSAGE,
  payload: {
    newMessageText,
  },
});
