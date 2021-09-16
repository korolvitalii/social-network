import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/AuthActions';
import classes from './LoginForm.module.css';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutAction());
  };

  return (
    <div className={classes.logout}>
      <button type='button' onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
