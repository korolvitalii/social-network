import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../../redux/reducers/rootReducer';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const { isAuth, authErrors, captcha } = useSelector((state: AppStateType) => state.auth);
  return (
    <div>
      {isAuth ? (
        <Redirect to='/profile' />
      ) : (
        <LoginForm authErrors={authErrors} captcha={captcha} />
      )}
    </div>
  );
};

export default Login;
