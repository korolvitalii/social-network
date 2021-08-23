import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import MyPosts from '../components/MyPosts/MyPosts';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import { setUserProfile } from '../redux/actions/ProfileActions';
import { RootStateType, UserProfileType } from '../types/types';
import classes from './Profile.module.css';

type MatchParams = {
  id: string;
};

const Profile: React.FC = () => {
  let match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispath = useDispatch();
  const { currentUser } = useSelector((state: RootStateType) => state.profilePage);
  // debugger;
  useEffect(() => {
    axios
      .get<UserProfileType>(
        `https://social-network.samuraijs.com/api/1.0/profile/${match?.params.id}`,
      )
      .then((response) => {
        dispath(setUserProfile(response.data));
      });
  }, [dispath, match?.params.id]);

  return (
    <div className={classes.profileContainer}>
      <ProfileInfo profile={currentUser} />
      <MyPosts />
    </div>
  );
};

export default Profile;
