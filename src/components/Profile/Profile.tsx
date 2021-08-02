import React from 'react';
import classes from './Profile.module.css';

import homelogo from '../../assets/images/home-image.png';
import profilelogo from '../../assets/images/profile-logo.jpg';
import MyPosts from './MyPosts/MyPosts';

type Props = {};

const Content: React.FC = (props: Props) => {
  return (
    <div className={classes.content}>
      <div>
        <img className={classes.homelogo} src={homelogo} alt='' />
      </div>
      <div>
        <img src={profilelogo} alt='' />
      </div>
      <MyPosts />
    </div>
  );
};

export default Content;
