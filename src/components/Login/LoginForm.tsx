import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { loginAction } from '../../redux/actions/AuthActions';
import classes from './LoginForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  alpha,
  Avatar,
  Checkbox,
  InputBase,
  styled,
  Typography,
  Box,
  Button,
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

type PropsType = {
  authErrors?: Array<string>;
  captcha: string | null;
  dispatch: any;
};

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    margin: '2px 0',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const LoginForm: React.FC<PropsType> = ({ authErrors, captcha, dispatch }) => {
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
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Controller
              render={({ field }) => <BootstrapInput {...field} placeholder='Email address' />}
              name='email'
              control={control}
            />
            {errors.email && <span className={classes.error}>{errors.email.message}</span>}
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
            {errors.password && <span className={classes.error}>{errors.password.message}</span>}
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
            <div className={classes.error}>{authErrors?.length !== 0 && authErrorsMessage}</div>
            <div>
              {captcha && <img src={captcha} alt='captcha' />}
              {captcha && <input {...register('captcha', { required: true })} />}
            </div>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
