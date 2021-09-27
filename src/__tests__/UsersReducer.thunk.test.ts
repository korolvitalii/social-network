import { actions, followUserAction, unfollowUserAction } from '../redux/actions/UsersActions';
import { apiUsers } from '../api/users-api';
import { ResponseType, ResultCodesEnum } from '../api/api';
import { AxiosResponse } from 'axios';

jest.mock('../api/users-api');
const userAPIMock = apiUsers as jest.Mocked<typeof apiUsers>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.follow.mockClear();
  userAPIMock.unfollow.mockClear();
});

const result: ResponseType = {
  resultCode: 0,
  message: [],
  data: {},
};

userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test('success follow thunk', async () => {
  userAPIMock.follow.mockReturnValue(Promise.resolve(result));
  const thunk = followUserAction(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(false));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowUnfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(true));
});

// test('success unfollow thunk', async () => {
//   const thunk = unfollow(1);

//   await thunk(dispatchMock, getStateMock, {});

//   expect(dispatchMock).toBeCalledTimes(3);
//   expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
//   expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
//   expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
// });
