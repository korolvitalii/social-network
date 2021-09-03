import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import MyPosts from '../MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { getUserProfile, getUserStatus } from '../../redux/actions/ProfileActions';
import classes from './Profile.module.css';
import { InitialStateType } from '../../redux/reducers/ProfileReducer';

type MatchParams = {
  id: string;
};

type PropsType = {
  profilePage: InitialStateType;
};

const Profile: React.FC<PropsType> = (props) => {
  let match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispatch = useDispatch();
  const { currentUser, status } = props.profilePage;
  useEffect(() => {
    dispatch(getUserProfile(match));
    dispatch(getUserStatus(match));
  }, [dispatch, match]);

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo profile={currentUser} status={status} />
      <MyPosts />
    </div>
  );
};

export default Profile;
