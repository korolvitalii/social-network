import { Button } from '@mui/material';
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
      <Button variant='outlined' onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
