import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logoutAction } from '../../redux/actions/AuthActions';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logoutAction());
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
