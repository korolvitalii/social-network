import usersRaw from './UsersRaw.json';
import { actions } from '../redux/actions/UsersActions';
import { ProfileType, UserType } from '../types/types';
import { UsersReducer } from '../redux/reducers/UsersReducers';

const state = {
  users: [],
  totalCount: 0,
  pageSize: 10,
  pagesCount: 10,
  isFetch: true,
  isFollowingProgress: false,
};

it('length of users should be correct', () => {
  const users: Array<UserType> = usersRaw.items;
  const action = actions.setUsers(users);
  const newState = UsersReducer(state, action);
  expect(newState.users.length).toBe(10);
});
