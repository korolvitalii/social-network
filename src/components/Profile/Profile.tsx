import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getUserProfile, getUserStatus, uploadUserPhoto } from '../../redux/actions/ProfileActions';
import classes from './Profile.module.css';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { AppStateType } from '../../redux/reducers/rootReducer';

type MatchParams = {
  id: string;
};

type PropsType = {
  currentUser: ProfileType;
  status: string;
  authUserID: number;
  formErrors: Array<string>;
};

const Profile: React.FC<PropsType> = ({ currentUser, status, authUserID }) => {
  const { userInfoFormErrors } = useSelector((state: AppStateType) => state.profilePage);
  const match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispatch = useDispatch();
  const userId = match?.params.id ? match.params.id : authUserID;
  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [match?.params.id, dispatch, userId]);

  const savePhoto = (e: any) => {
    const photo = e.target.files[0];
    dispatch(uploadUserPhoto(photo));
  };

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo
        profile={currentUser}
        status={status}
        dispatch={dispatch}
        savePhoto={savePhoto}
        isOwner={match?.params.id}
        formErrors={userInfoFormErrors}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
