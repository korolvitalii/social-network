import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getUserProfile, getUserStatus } from '../../redux/actions/ProfileActions';
import classes from './Profile.module.css';
import { UserType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';

type MatchParams = {
  id: string;
};

type PropsType = {
  currentUser: UserType;
  status: string;
};

const Profile: React.FC<PropsType> = ({ currentUser, status }) => {
  let match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile(match));
    dispatch(getUserStatus(match));
  }, [dispatch, match]);

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo profile={currentUser} status={status} dispatch={dispatch} />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
