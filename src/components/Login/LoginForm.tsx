import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { Dispatch } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { loginAction } from '../../redux/actions/AuthActions';
import {
  BootstrapInput,
  LockIconContainer,
  FormContainer,
  ErrorMessage,
  ErrorContainer,
} from './LoginForm styled';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

type PropsType = {
  authErrors?: Array<string>;
  captcha: string | null;
  dispatch: Dispatch<any>;
};

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});

const LoginForm: React.FC<PropsType> = ({ authErrors, captcha, dispatch }): React.ReactElement => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      captcha: data.captcha,
    };
    dispatch(loginAction(requestData));
  };

  const authErrorsMessage = authErrors?.map((error) => <span key={error}>{error}</span>);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          marginLeft: '200px',
        }}>
        <CssBaseline />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <LockIconContainer>
              <LockOutlinedIcon />
            </LockIconContainer>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Controller
              render={({ field }) => <BootstrapInput {...field} placeholder='Email address' />}
              name='email'
              control={control}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            <Controller
              render={({ field }) => (
                <BootstrapInput
                  {...field}
                  placeholder='Password'
                  id='bootstrap-input'
                  type='password'
                />
              )}
              name='password'
              control={control}
              defaultValue=''
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            <div>
              <Controller
                name='rememberMe'
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => <Checkbox data-testid='login_form_checkbox' {...field} />}
              />
              <span>Remember me</span>
            </div>
            <ErrorContainer>{authErrors?.length !== 0 && authErrorsMessage}</ErrorContainer>
            <div>
              {captcha && <img src={captcha} alt='captcha' />}
              {captcha && <input {...register('captcha', { required: true })} />}
            </div>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </FormContainer>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
