import { actions } from '../redux/actions/MessagesActions';
import { MessageType } from '../types/types';
import { MessagesReducer } from '../redux/reducers/MessagesReducer';

const state = {
  messages: [
    { id: '1', text: 'hello' },
    { id: '2', text: 'hi' },
    { id: '3', text: 'yo' },
    { id: '4', text: 'bye' },
  ],
  dialogs: [
    { id: 1, name: 'roxy' },
    { id: 1, name: 'adam' },
    { id: 1, name: 'ben' },
    { id: 1, name: 'shem' },
    { id: 1, name: 'rich' },
    { id: 1, name: 'unknown' },
  ],
  newMessageText: '',
};

it('length of message should be incremented', () => {
  const message: MessageType = { id: '9999', text: 'New message text!' };
  const action = actions.addNewMessage(message);
  const newState = MessagesReducer(state, action);
  expect(newState.messages.length).toBe(5);
});

it('new message text should be correct', () => {
  const message: MessageType = { id: '9999', text: 'New message text!' };
  const action = actions.addNewMessage(message);
  const newState = MessagesReducer(state, action);
  expect(newState.messages[4].text).toBe('New message text!');
});
