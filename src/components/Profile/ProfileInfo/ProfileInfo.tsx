import React from 'react';
import classes from './ProfileInfo.module.css';

import homelogo from '../../../assets/images/home-logo1.jpg';
import { UserProfileType } from '../../../types/types';
import ProfileStatus from '../ProfileStatus';

type ProfileInfoProps = {
  profile: UserProfileType;
};

const ProfileInfo: React.FC<ProfileInfoProps> = (props) => {
  const { profile } = props;
  return (
    <div className={classes.profileInfo}>
      <div className={classes.description}>
        <div>
          <img
            className={classes.avatarPhoto}
            src={profile?.photos?.large ? profile.photos.large : ''}
            alt=''
          />
        </div>
        <div>
          <ProfileStatus />
        </div>
        <div className={classes.profileDescription}>
          <h1>Fullname: {profile?.fullName}</h1>
          <h3>About Me: {profile?.aboutMe}</h3>
          <div>{profile?.contacts?.facebook}</div>
          <div>{profile?.contacts?.github}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileInfo;
