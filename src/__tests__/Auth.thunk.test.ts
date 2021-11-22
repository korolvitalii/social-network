import { authApi } from '../api/auth-api';
import { actions, getAuthUserData, loginAction } from '../redux/actions/AuthActions';

jest.mock('../api/auth-api');
const authAPIMock = authApi as jest.Mocked<typeof authApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  authAPIMock.authMe.mockClear();
  authAPIMock.login.mockClear();
});

const authResponse = {
  resultCode: 0,
  messages: [],
  data: {
    id: 2,
    email: 'blabla@bla.bla',
    login: 'blabla',
  },
};

const authResponseWithError = {
  resultCode: 1,
  messages: ['You are not autorhize'],
  data: {
    id: null,
    email: null,
    login: null,
  },
};

const loginResponse = {
  resultCode: 0,
  messages: [],
  data: {
    userId: 2,
  },
};
test('success get auth user data', async () => {
  authAPIMock.authMe.mockReturnValue(Promise.resolve(authResponse));
  const thunk = getAuthUserData();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.setUserData(2, 'blabla@bla.bla', 'blabla', true),
  );
});

test('success login', async () => {
  authAPIMock.login.mockReturnValue(Promise.resolve(loginResponse));
  const thunk = loginAction({
    email: 'blabla@mail',
    password: 'some password',
    rememberMe: false,
    captcha: undefined,
  });

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(2);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.authErrors([]));
});
