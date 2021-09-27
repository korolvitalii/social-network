import usersRaw from './UsersRaw.json';
import { actions } from '../redux/actions/UsersActions';
import { UserType } from '../types/types';
import { InitialStateType, UsersReducer } from '../redux/reducers/UsersReducers';

let state: InitialStateType = {
  users: [],
  totalCount: 0,
  pageSize: 10,
  pagesCount: 10,
  isFetch: true,
  isFollowingProgress: false,
  errorToShow: [],
};

beforeEach(() => {
  state = {
    users: [
      {
        name: '2artemka4',
        id: 1,
        photos: {
          small: null,
          large: null,
        },
        status: null,
        followed: true,
      },
      {
        name: 'artem24',
        id: 2,
        photos: {
          small: null,
          large: null,
        },
        status: null,
        followed: false,
      },
      {
        name: 'AlexBalew',
        id: 3,
        photos: {
          small: null,
          large: null,
        },
        status: null,
        followed: true,
      },
      {
        name: 'testDeveloper',
        id: 4,
        photos: {
          small:
            'https://social-network.samuraijs.com/activecontent/images/users/19865/user-small.jpg?v=1',
          large:
            'https://social-network.samuraijs.com/activecontent/images/users/19865/user.jpg?v=1',
        },
        status: 'looking for a job',
        followed: false,
      },
    ],
    pageSize: 10,
    totalCount: 0,
    pagesCount: 1,
    isFetch: false,
    isFollowingProgress: false,
    errorToShow: [],
  };
});

it('length of users should be correct', () => {
  const users: Array<UserType> = usersRaw.items;
  const action = actions.setUsers(users);
  const newState = UsersReducer(state, action);
  expect(newState.users.length).toBe(10);
});

it('toggle follow/unfollow must work correct', () => {
  let newState = UsersReducer(state, actions.toggleFollowUnfollow(2));
  newState = UsersReducer(state, actions.toggleFollowUnfollow(1));
  expect(newState.users[1].followed).toBeTruthy();
  expect(newState.users[0].followed).toBeFalsy();
});
