import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/actions/ProfileActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { getAuthUserId, getCurrentUser, getStatus } from '../../redux/selectors/profile-selectors';
import { PhotosType, PostType, ProfileType } from '../../types/types';

type MapStateToPropsType = {
  currentUser: ProfileType | null;
  status: string;
  authUserID: number | null;
};

type MapDispatchToPropsType = {
  addNewPost: (newPost: PostType) => void;
  removePost: (id: number) => void;
  setUserProfile: (user: ProfileType) => void;
  setUserStatus: (status: string) => void;
  setUserPhoto: (photos: PhotosType) => void;
  setUserInfoFormErrors: (errors: Array<string>) => void;
};
type OwnProps = {};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    currentUser: getCurrentUser(state),
    status: getStatus(state),
    authUserID: getAuthUserId(state),
  };
};

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnProps, AppStateType>(mapStateToProps, {
    ...actions,
  }),
  withAuthRedirect,
)(Profile);
