import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import LoginForm from '../../components/Login';
import { selectAuth } from '../../redux/selectors/auth-selectros';

const Login: React.FC = () => {
  const { isAuth, authErrors, captcha } = useSelector(selectAuth);
  return (
    <>
      {isAuth ? (
        <Redirect to='/profile' />
      ) : (
        <LoginForm authErrors={authErrors} captcha={captcha} />
      )}
    </>
  );
};

export default Login;
