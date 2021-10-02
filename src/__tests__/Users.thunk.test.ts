import { actions, followThunk, getUsers, unfollowThunk } from '../redux/actions/UsersActions';
import { apiUsers, GetUsersData } from '../api/users-api';
import { ResponseType, ResultCodesEnum } from '../api/api';
import usersRaw from './UsersRaw.json';

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

const FollowUnfollowReponse: ResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

const getUsersResponse: GetUsersData = {
  totalCount: 10,
  error: null,
  items: usersRaw.items,
};

test('success follow thunk', async () => {
  userAPIMock.follow.mockReturnValue(Promise.resolve(FollowUnfollowReponse));
  const thunk = followThunk(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowUnfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false));
});

test('success unfollow thunk', async () => {
  userAPIMock.unfollow.mockReturnValue(Promise.resolve(FollowUnfollowReponse));
  const thunk = unfollowThunk(1);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowUnfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false));
});

test('success getUsers thunk', async () => {
  userAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResponse));
  const thunk = getUsers(1, 10, '', false);

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(5);

  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.isFetchData(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setUsers(getUsersResponse.items));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.getTotalCount(getUsersResponse.totalCount),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(
    4,
    actions.setPagesCount(getUsersResponse.totalCount, 10),
  );
  expect(dispatchMock).toHaveBeenNthCalledWith(5, actions.isFetchData(false));
});
