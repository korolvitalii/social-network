import { profileApi } from '../../api/profile-api';
import { PhotosType, PostType, ProfileType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from '../../redux/reducers/rootReducer';
import { ResultCodesEnum } from '../../api/api';
import { actions as errorActions } from '../actions/ErrorsActions';
import { arrayMessagesToStringMessage } from '../../helpers/helpers';

const ADD_NEW_POST = 'SN/PROFILEACTION/ADD_NEW_POST';
const SET_USER_PROFILE = 'SN/PROFILEACTION/SET_USER_PROFILE';
const SET_USER_STATUS = 'SN/PROFILEACTION/SET_USER_STATUS';
const REMOVE_POST = 'SN/PROFILEACTIONS/REMOVE_POST';
const SET_USER_PHOTO = 'SN/PROFILEACTIONS/SET_USER_PHOTO';
const SET_USER_INFO_FORM_ERRORS = 'SN/PROFILEACTIONS/SET_USER_INFO_FORM_ERRORS';
const IS_LOAD_PHOTO = 'SN/PROFILEACTIONS/IS_LOAD_PHOTO';
const TOGGLE_IS_FETCH_PROFILE = 'SN/PROFILEACTIONS/TOGGLE_IS_FETCH_PROFILE';

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
  isLoadPhoto: (isLoad: boolean) =>
    ({
      type: IS_LOAD_PHOTO,
      payload: {
        isLoad,
      },
    } as const),
  isFetchProfile: (isFetch: boolean) =>
    ({
      type: TOGGLE_IS_FETCH_PROFILE,
      payload: {
        isFetch,
      },
    } as const),
};

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.getUserStatus(userId);
      dispatch(actions.setUserStatus(response));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const response = await profileApi.updateUserStatus(status);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserStatus(status));
      } else {
        dispatch(errorActions.setError(arrayMessagesToStringMessage(response.messages)));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.isFetchProfile(false));
      const response = await profileApi.getUserProfile(userId);
      dispatch(actions.setUserProfile(response));
      dispatch(actions.isFetchProfile(true));
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const uploadUserPhoto =
  (photo: File): ThunkType =>
  async (dispatch) => {
    try {
      dispatch(actions.isLoadPhoto(false));
      const response = await profileApi.updateUserPhoto(photo);
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserPhoto(response.data.photos));
        dispatch(actions.isLoadPhoto(true));
      } else {
        dispatch(errorActions.setError(arrayMessagesToStringMessage(response.messages)));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export const undateUserProfileInfo =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    try {
      const userId = getState().auth.id;
      const response = await profileApi.updateProfile(profile);
      if (response.data.resultCode === ResultCodesEnum.Success) {
        if (userId !== null) {
          dispatch(getUserProfile(userId));
        } else {
          dispatch(errorActions.setError("userId can't be null"));
        }
      } else {
        dispatch(actions.setUserInfoFormErrors(response.data.messages));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        dispatch(errorActions.setError(err.message));
      }
    }
  };

export type ActionsType = InferActionsTypes<typeof actions & typeof errorActions>;
type ThunkType = BaseThunkType<ActionsType>;
