import { apiProfile } from '../../api/api';
import { PostType, UserProfileType } from '../../types/types';

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const REMOVE_POST = 'REMOVE_POST';

type AddNewPostType = {
  type: typeof ADD_NEW_POST;
  payload: {
    newPost: PostType;
  };
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  payload: {
    user: UserProfileType;
  };
};

type SetUserStatusType = {
  type: typeof SET_USER_STATUS;
  payload: {
    status: string;
  };
};

type RemovePost = {
  type: typeof REMOVE_POST;
  payload: {
    id: number;
  };
};

export type ActionsType = AddNewPostType | SetUserProfileType | SetUserStatusType | RemovePost;

export const actions = {
  addNewPost: (newPost: PostType): ActionsType => ({
    type: ADD_NEW_POST,
    payload: {
      newPost: newPost,
    },
  }),
  removePost: (id: number): ActionsType => ({
    type: REMOVE_POST,
    payload: {
      id,
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

export const updateUserStatus = (status: string) => (dispatch: any) => {
  apiProfile.updateUserStatus(status).then((data) => {
    if (data.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  });
};

export const getUserProfile = (match: any) => (dispatch: any) => {
  apiProfile.getUserProfile(match).then((response: any) => {
    dispatch(actions.setUserProfile(response.data));
  });
};
