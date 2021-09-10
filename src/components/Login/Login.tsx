import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { RootStateType } from '../../types/types';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, authErrors } = useSelector((state: RootStateType) => state.auth);
  return (
    <div>
      {isAuth ? (
        <Redirect to='/profile' />
      ) : (
        <LoginForm dispatch={dispatch} authErrors={authErrors} />
      )}
    </div>
  );
};

export default Login;
