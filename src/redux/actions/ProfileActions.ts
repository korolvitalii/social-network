import { profileApi } from '../../api/profile-api';
import { PhotosType, PostType, ProfileType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from '../../redux/reducers/rootReducer';
import { ResultCodesEnum } from '../../api/api';

const ADD_NEW_POST = 'SN/PROFILEACTION/ADD_NEW_POST';
const SET_USER_PROFILE = 'SN/PROFILEACTION/SET_USER_PROFILE';
const SET_USER_STATUS = 'SN/PROFILEACTION/SET_USER_STATUS';
const REMOVE_POST = 'SN/PROFILEACTIONS/REMOVE_POST';
const SET_USER_PHOTO = 'SN/PROFILEACTIONS/SET_USER_PHOTO';
// const UPDATE_USER_INFO = 'SN/PROFILEACTIONS/UPDATE_USER_INFO';
const SET_USER_INFO_FORM_ERRORS = 'SN/PROFILEACTIONS/SET_USER_INFO_FORM_ERRORS';

export type ActionsType = InferActionsTypes<typeof actions>;

export const actions = {
  addNewPost: (newPost: PostType) =>
    ({
      type: ADD_NEW_POST,
      payload: {
        newPost: newPost,
      },
    } as const),
  removePost: (id: number) =>
    ({
      type: REMOVE_POST,
      payload: {
        id,
      },
    } as const),
  setUserProfile: (user: ProfileType) =>
    ({
      type: SET_USER_PROFILE,
      payload: {
        user,
      },
    } as const),
  setUserStatus: (status: string) =>
    ({
      type: SET_USER_STATUS,
      payload: {
        status,
      },
    } as const),
  setUserPhoto: (photos: PhotosType) =>
    ({
      type: SET_USER_PHOTO,
      payload: {
        photos,
      },
    } as const),
  setUserInfoFormErrors: (errors: Array<string>) =>
    ({
      type: SET_USER_INFO_FORM_ERRORS,
      payload: {
        errors,
      },
    } as const),
};

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.getUserStatus(userId);
      dispatch(actions.setUserStatus(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.updateUserStatus(status);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserStatus(status));
      }
    } catch (error) {
      console.error(error);
    }
  };

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.getUserProfile(userId);
      dispatch(actions.setUserProfile(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const uploadUserPhoto =
  (photo: File): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.updateUserPhoto(photo);
      dispatch(actions.setUserPhoto(response.data.data.photos));
    } catch (error) {
      console.error(error);
    }
  };

export const undateUserProfileInfo =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

type ThunkType = BaseThunkType<ActionsType>;
