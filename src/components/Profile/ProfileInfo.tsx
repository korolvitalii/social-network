import React from 'react';
import classes from './ProfileInfo.module.css';
import homelogo from '../../assets/images/home-logo1.jpg';

const ProfileInfo: React.FC = (props) => {
  return (
    <div className={classes.profileInfo}>
      <div>
        <img className={classes.homelogo} src={homelogo} alt='' />
      </div>
      <div className={classes.description}>ava + description </div>
    </div>
  );
};

export default ProfileInfo;
