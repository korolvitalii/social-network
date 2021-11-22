import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/AuthActions';
import { ErrorContainer } from './LoginForm styled';

const Logout: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutAction());
  };

  return (
    <ErrorContainer>
      <Button variant='outlined' onClick={handleClick}>
        Logout
      </Button>
    </ErrorContainer>
  );
};

export default Logout;
