import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { RootStateType } from '../../types/types';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const { isAuth } = useSelector((state: RootStateType) => state.auth);
  return <div>{isAuth ? <Redirect to='/profile' /> : <LoginForm />}</div>;
};

export default Login;
