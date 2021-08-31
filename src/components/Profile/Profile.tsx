import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import MyPosts from '../MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getUserProfile, getUserStatus } from '../../redux/actions/ProfileActions';
import { RootStateType } from '../../types/types';
import classes from './Profile.module.css';

type MatchParams = {
  id: string;
};

const Profile: React.FC = () => {
  let match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispatch = useDispatch();
  const { currentUser, status } = useSelector((state: RootStateType) => state.profilePage);
  useEffect(() => {
    dispatch(getUserProfile(match));
    dispatch(getUserStatus(match));
  }, []);

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo profile={currentUser} status={status} />
      <MyPosts />
    </div>
  );
};

export default Profile;
