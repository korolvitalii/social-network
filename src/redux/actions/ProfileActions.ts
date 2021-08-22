import {
  PostType,
  AddNewPostType,
  UpdateNewPostTextType,
  UserType,
  ActionsType,
} from '../../types/types';

const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const SET_USER_PROFILE = ' SET_USER_PROFILE';

export const addNewPost = (newPost: PostType): ActionsType => ({
  type: ADD_NEW_POST,
  payload: {
    newPost: newPost,
  },
});

export const updateNewPostText = (text: string): ActionsType => ({
  type: UPDATE_TEXT_NEW_POST,
  payload: {
    newPostText: text,
  },
});

export const setUserProfile = (user: UserType): ActionsType => ({
  type: SET_USER_PROFILE,
  payload: {
    user,
  },
});
