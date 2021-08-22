import React from 'react';
import classes from './ProfileInfo.module.css';

import homelogo from '../../assets/images/home-logo1.jpg';
import { UserType } from '../../types/types';

type ProfileInfoProps = {
  user: UserType | null;
};

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const { user } = props;

  return (
    <div className={classes.profileInfo}>
      <div>
        <img className={classes.homelogo} src={homelogo} alt='' />
      </div>
      <div className={classes.description}>
        <div className={classes.avatarPhoto}>
          <img src={user?.photos?.large} alt='' />
        </div>
        <div>
          <h3>{user?.fullName}</h3>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileInfo;
