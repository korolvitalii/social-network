import { actions } from '../redux/actions/AuthActions';
import { AuthReducer } from '../redux/reducers/AuthReducer';

const state = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  authErrors: [],
  captcha: null,
};

it('after action setUserData user data should be correct', () => {
  const action = actions.setUserData(2, 'blabla@bla.bla', 'blabla', true);
  const newState = AuthReducer(state, action);
  expect(newState.id).toBe(2);
  expect(newState.email).toBe('blabla@bla.bla');
  expect(newState.login).toBe('blabla');
});

it('after action setCaptcha captcha url should be correct', () => {
  const action = actions.setCaptcha('captcha.url');
  const newState = AuthReducer(state, action);
  expect(newState.captcha).toBe('captcha.url');
});
