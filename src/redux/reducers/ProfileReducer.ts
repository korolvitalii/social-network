import { PostType, ProfileType } from '../../types/types';
import { ActionsType } from '../actions/ProfileActions';

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const REMOVE_POST = 'REMOVE_POST';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

const initialState = {
  posts: [
    { id: 1, text: 'Hi, how are you?', likeCount: 12 },
    { id: 2, text: "It's my post!", likeCount: 10 },
    { id: 3, text: 'Some news', likeCount: 1 },
    { id: 4, text: 'SomePost', likeCount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  friends: ['John', 'Jack', 'Stasy'] as Array<string>,
  status: '' as string,
};

export type InitialStateType = typeof initialState;

export const ProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_NEW_POST: {
      const posts = [...state.posts, action.payload.newPost];
      return { ...state, posts };
    }
    case REMOVE_POST: {
      const newPosts = state.posts.filter((post) => post.id !== action.payload.id);
      return { ...state, posts: newPosts };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.payload.user };
    }
    case SET_USER_STATUS: {
      return { ...state, status: action.payload.status };
    }
    case SET_USER_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.payload.photos } as ProfileType,
      };
    }
    case UPDATE_USER_INFO: {
      return { ...state, profile: action.payload.toUpdateProfile };
    }
    default:
      return state;
  }
};
