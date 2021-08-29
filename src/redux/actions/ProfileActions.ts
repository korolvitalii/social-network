import { apiProfile } from '../../api/api';
import { PostType, UserProfileType } from '../../types/types';

const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const SET_USER_PROFILE = ' SET_USER_PROFILE';

export type AddNewPostType = {
  type: typeof ADD_NEW_POST;
  payload: {
    newPost: PostType;
  };
};

export type UpdateNewPostTextType = {
  type: typeof UPDATE_TEXT_NEW_POST;
  payload: {
    newPostText: string;
  };
};

export type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  payload: {
    user: UserProfileType;
  };
};

export type ActionsType = AddNewPostType | UpdateNewPostTextType | SetUserProfileType;

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

export const setUserProfile = (user: UserProfileType): ActionsType => ({
  type: SET_USER_PROFILE,
  payload: {
    user,
  },
});

export const getUserProfile = (match: any) => (dispatch: any) => {
  apiProfile.getUserProfile(match).then((response: any) => {
    dispatch(setUserProfile(response.data));
  });
};
