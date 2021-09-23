import React, { ChangeEvent, useEffect } from 'react';
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
  const userId = match?.params.id ? Number(match.params.id) : authUserID;
  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [match?.params.id, dispatch, userId]);

  const savePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(uploadUserPhoto(e.target.files[0]));
    }
  };

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo
        profile={currentUser}
        status={status}
        savePhoto={savePhoto}
        isOwner={match?.params.id}
        formErrors={userInfoFormErrors}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
