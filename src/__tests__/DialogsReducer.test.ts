import { actions } from '../redux/actions/DialogsActions';
import { dialogsReducer } from '../redux/reducers/DialogsReducer';

const dialog = {
  id: 1,
  userName: 'string',
  hasNewMessages: false,
  lastDialogActivityDate: '22',
  lastUserActivityDate: '22',
  newMessagesCount: 0,
  photos: {
    small: 'photo.img',
    large: 'photo.img',
  },
};

const message = {
  id: 'bd5fcbda-f2af-4c7f-a2e7-f80cdee66079',
  body: 'check rerender',
  translatedBody: null,
  addedAt: '2021-10-25T08:21:20.317',
  senderId: 19229,
  senderName: 'psyhologitech',
  recipientId: 1079,
  viewed: true,
};
const state = {
  dialogs: [dialog, dialog, dialog, dialog, dialog],
  message: '',
  userMessages: [],
  isUpdate: false,
};

it('after set all dialogs, dialogs count shoukd correct', () => {
  const dialogs = [dialog, dialog, dialog, dialog, dialog];
  const action = actions.setAllDialogs(dialogs);
  const newState = dialogsReducer(state, action);
  expect(Object.keys(newState.dialogs).length).toBe(10);
});

it('after set message, message should be correct', () => {
  const action = actions.setMessage('text message');
  const newState = dialogsReducer(state, action);
  expect(newState.message).toBe('text message');
});

it('after set user messages, messages should be correct', () => {
  const action = actions.setUserMessages([message, message, message]);
  const newState = dialogsReducer(state, action);
  expect(newState.userMessages.length).toBe(3);
  expect(newState.userMessages[0].body).toBe('check rerender');
});
