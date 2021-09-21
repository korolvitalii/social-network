import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reducers/rootReducer';
import classes from './Sitebar.module.css';

const Sitebar: React.FC = () => {
  const { friends } = useSelector((state: AppStateType) => state.profilePage);
  const friendElements = friends.map((friend) => {
    return (
      <div className='sitebarFriend' key={friend}>
        <img
          className={classes.imgFriend}
          src='https://www.pngitem.com/pimgs/m/80-800194_transparent-users-icon-png-flat-user-icon-png.png'
          alt=''
        />
        <div>{friend}</div>
      </div>
    );
  });

  return (
    <div className={classes.sitebar}>
      <h3>Friends</h3>
      <div className={classes.items}>{friendElements}</div>
    </div>
  );
};

export default Sitebar;
