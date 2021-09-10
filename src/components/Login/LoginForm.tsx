import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginAction } from '../../redux/actions/AuthActions';
import classes from './LoginForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};

type PropsType = {
  dispatch?: any;
  authErrors?: Array<string>;
};

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});

const LoginForm: React.FC<PropsType> = ({ dispatch, authErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      captcha: false,
    };
    dispatch(loginAction(requestData));
  };

  const authErrorsMessage = authErrors?.map((error) => <span>{error}</span>);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <input placeholder='Email' className={classes.input} {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type='password'
        className={classes.input}
        placeholder='Password'
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <div>
        <input type='checkbox' data-testid='login_form_checkbox' {...register('rememberMe')} />
        <span>Remember Me</span>
      </div>
      <div>{authErrors?.length !== 0 && authErrorsMessage}</div>
      <input className={classes.submit} type='submit' />
    </form>
  );
};

export default LoginForm;
