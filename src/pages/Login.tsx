import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/reducers/rootReducer';
import LoginForm from '../components/Login/LoginForm';

const Login: React.FC = () => {
  const { isAuth, authErrors, captcha } = useSelector((state: AppStateType) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      {isAuth ? (
        <Redirect to='/profile' />
      ) : (
        <LoginForm authErrors={authErrors} captcha={captcha} dispatch={dispatch} />
      )}
    </div>
  );
};

export default Login;
