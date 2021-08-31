import { apiProfile } from '../../api/api';
import { PostType, UserProfileType } from '../../types/types';

const ADD_NEW_POST = 'ADD_NEW_POST';
const UPDATE_TEXT_NEW_POST = 'UPDATE_TEXT_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = ' SET_USER_STATUS';

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

export type SetUserStatusType = {
  type: typeof SET_USER_STATUS;
  payload: {
    status: string;
  };
};

export type ActionsType =
  | AddNewPostType
  | UpdateNewPostTextType
  | SetUserProfileType
  | SetUserStatusType;

export const actions = {
  addNewPost: (newPost: PostType): ActionsType => ({
    type: ADD_NEW_POST,
    payload: {
      newPost: newPost,
    },
  }),
  updateNewPostText: (text: string): ActionsType => ({
    type: UPDATE_TEXT_NEW_POST,
    payload: {
      newPostText: text,
    },
  }),
  setUserProfile: (user: UserProfileType): ActionsType => ({
    type: SET_USER_PROFILE,
    payload: {
      user,
    },
  }),
  setUserStatus: (status: string): ActionsType => ({
    type: SET_USER_STATUS,
    payload: {
      status,
    },
  }),
};

export const getUserStatus = (match: any) => (dispatch: any) => {
  apiProfile.getUserStatus(match).then((response: any) => {
    dispatch(actions.setUserStatus(response.data));
  });
};

export const getUserProfile = (match: any) => (dispatch: any) => {
  apiProfile.getUserProfile(match).then((response: any) => {
    dispatch(actions.setUserProfile(response.data));
  });
};
