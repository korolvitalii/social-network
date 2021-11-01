import { ChatMessageType, StatusType } from '../api/chat-api';
import { actions } from '../redux/actions/ChatActions';
import { ChatReducer } from '../redux/reducers/ChatReducer';

const state = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const messsages = {
  message: 'string',
  photo: 'string',
  userId: 1,
  userName: 'string',
};

it('after action setUserData user data should be correct', () => {
  const action = actions.statusChanged('ready');
  const newState = ChatReducer(state, action);
  expect(newState.status).toBe('ready');
});

it('after set messages messages count should be correct', () => {
  const action = actions.messageRecevied([messsages, messsages, messsages]);
  const newState = ChatReducer(state, action);
  expect(newState.messages.length).toBe(3);
});

it('after action remove messages, messages count should be correct', () => {
  const firstAction = actions.messageRecevied([messsages, messsages, messsages]);
  const newState = ChatReducer(state, firstAction);
  const secondAction = actions.clearMessageInStore();
  const stateAfterActions = ChatReducer(newState, secondAction);
  expect(stateAfterActions.messages.length).toBe(0);
});
