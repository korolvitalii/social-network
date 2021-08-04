import React from 'react';
import classes from './ProfileInfo.module.css';

import profilelogo from '../../assets/images/profile-logo.jpg';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo';

type Props = {};

const Profile: React.FC = (props: Props) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};

export default Profile;
