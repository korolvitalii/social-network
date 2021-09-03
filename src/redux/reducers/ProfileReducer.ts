import { PostType, UserProfileType } from '../../types/types';
import { ActionsType } from '../actions/ProfileActions';

const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = ' SET_USER_STATUS';

const initialState = {
  posts: [
    { id: '1', text: 'Hi, how are you?', likeCount: 12 },
    { id: '2', text: "It's my post!", likeCount: 10 },
    { id: '3', text: 'Some news', likeCount: 1 },
    { id: '4', text: 'SomePost', likeCount: 5 },
  ] as Array<PostType>,
  newPostText: '' as string,
  currentUser: 19229 as UserProfileType | number,
  friends: ['John', 'Jack', 'Stasy'] as Array<string>,
  status: '' as string,
};

export type InitialStateType = typeof initialState;

export const posts = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_NEW_POST: {
      const posts = [...state.posts, action.payload.newPost];
      return { ...state, posts };
    }
    case UPDATE_TEXT_NEW_POST: {
      return { ...state, ...action.payload };
    }
    case SET_USER_PROFILE: {
      return { ...state, currentUser: action.payload.user };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.payload.status };
    }
    default:
      return state;
  }
};
