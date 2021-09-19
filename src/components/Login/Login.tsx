import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { RootStateType } from '../../types/types';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, authErrors, captcha } = useSelector((state: RootStateType) => state.auth);
  return (
    <div>
      {isAuth ? (
        <Redirect to='/profile' />
      ) : (
        <LoginForm dispatch={dispatch} authErrors={authErrors} captcha={captcha} />
      )}
    </div>
  );
};

export default Login;
