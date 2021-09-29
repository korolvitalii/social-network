import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/ProfileActions';
import { actions as errorAction } from '../../redux/actions/ErrorsActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import {
  getAuthUserId,
  getCurrentUser,
  getErrors,
  getStatus,
} from '../../redux/selectors/profile-selectors';
import { PhotosType, PostType, ProfileType } from '../../types/types';

type MapStateToPropsType = {
  currentUser: ProfileType | null;
  status: string;
  authUserID: number | null;
  errors: string;
};

type MapDispatchToPropsType = {
  addNewPost: (newPost: PostType) => void;
  removePost: (id: number) => void;
  setUserProfile: (user: ProfileType) => void;
  setUserStatus: (status: string) => void;
  setUserPhoto: (photos: PhotosType) => void;
  setUserInfoFormErrors: (errors: Array<string>) => void;
  resetError: () => void;
};

type OwnProps = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    currentUser: getCurrentUser(state),
    status: getStatus(state),
    authUserID: getAuthUserId(state),
    errors: getErrors(state),
  };
};

const mapDispatchToProps = {
  addNewPost: actions.addNewPost,
  removePost: actions.removePost,
  setUserProfile: actions.setUserProfile,
  setUserStatus: actions.setUserStatus,
  setUserPhoto: actions.setUserPhoto,
  setUserInfoFormErrors: actions.setUserInfoFormErrors,
  resetError: errorAction.resetError,
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthRedirect,
)(Profile);
