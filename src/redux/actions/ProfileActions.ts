import { profileApi } from '../../api/api';
import { PhotosType, PostType, ProfileType } from '../../types/types';
import { BaseThunkType } from '../../redux/reducers/rootReducer';

const ADD_NEW_POST = 'ADD_NEW_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const REMOVE_POST = 'REMOVE_POST';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const SET_USER_INFO_FORM_ERRORS = 'SET_USER_INFO_FORM_ERRORS';

type AddNewPostType = {
  type: typeof ADD_NEW_POST;
  payload: {
    newPost: PostType;
  };
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  payload: {
    user: ProfileType;
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

type SetUserPhotoType = {
  type: typeof SET_USER_PHOTO;
  payload: {
    photos: PhotosType;
  };
};

type UpdateUserInfoType = {
  type: typeof UPDATE_USER_INFO;
  payload: {
    toUpdateProfile: ProfileType;
  };
};

type setUserInfoFormErrors = {
  type: typeof SET_USER_INFO_FORM_ERRORS;
  payload: {
    errors: Array<string>;
  };
};

export type ActionsType =
  | AddNewPostType
  | SetUserProfileType
  | SetUserStatusType
  | RemovePost
  | SetUserPhotoType
  | UpdateUserInfoType
  | setUserInfoFormErrors;

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
  setUserProfile: (user: ProfileType): ActionsType => ({
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
  setUserPhoto: (photos: PhotosType): ActionsType => ({
    type: SET_USER_PHOTO,
    payload: {
      photos,
    },
  }),
  setUserInfoFormErrors: (errors: Array<string>): ActionsType => ({
    type: SET_USER_INFO_FORM_ERRORS,
    payload: {
      errors,
    },
  }),
};

export const getUserStatus =
  (match: any): ThunkType =>
  async (dispatch: any) => {
    const response = await profileApi.getUserStatus(match);
    dispatch(actions.setUserStatus(response.data));
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.updateUserStatus(status);
    if (response.resultCode === 0) {
      dispatch(actions.setUserStatus(status));
    }
  };

export const getUserProfile =
  (match: any): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.getUserProfile(match);
    dispatch(actions.setUserProfile(response.data));
  };

export const uploadUserPhoto =
  (photo: any): ThunkType =>
  async (dispatch) => {
    const response = await profileApi.updateUserPhoto(photo);
    dispatch(actions.setUserPhoto(response.data.data.photos));
  };

export const undateUserProfileInfo =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileApi.updateProfile(profile);
    if (data.data.resultCode === 0) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(actions.setUserInfoFormErrors(data.data.messages));
    }
  };

type ThunkType = BaseThunkType<ActionsType>;
