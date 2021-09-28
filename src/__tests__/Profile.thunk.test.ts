import { ResponseType, ResultCodesEnum } from '../api/api';
import { profileApi } from '../api/profile-api';
import { actions, getUserStatus, updateUserStatus } from '../redux/actions/ProfileActions';
import { actions as errorActions } from '../redux/actions/ErrorsActions';

jest.mock('../api/profile-api');
const profileAPIMock = profileApi as jest.Mocked<typeof profileApi>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  profileAPIMock.getUserStatus.mockClear();
  profileAPIMock.updateUserStatus.mockClear();
});

const statusReponse = 'New status!';

test('success get status', async () => {
  profileAPIMock.getUserStatus.mockReturnValue(Promise.resolve(statusReponse));
  const thunk = getUserStatus(1);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserStatus(statusReponse));
});

const failUpdateStatusResponse: ResponseType = {
  resultCode: 1,
  messages: ['Something wrong'],
  data: {},
};

test('wrong status with max symbols', async () => {
  profileAPIMock.updateUserStatus.mockReturnValue(Promise.resolve(failUpdateStatusResponse));
  const thunk = updateUserStatus('some status with 300 symbols');

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    errorActions.setError(failUpdateStatusResponse.messages[0]),
  );
});

const successUpdateStatusResponse = {
  resultCode: 0,
  message: [],
  data: {},
};

test('success update status', async () => {
  profileAPIMock.updateUserStatus.mockReturnValue(Promise.resolve(successUpdateStatusResponse));
  const thunk = updateUserStatus('some status');

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setUserStatus('some status'));
});
