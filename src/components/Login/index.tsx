import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Checkbox, Typography, Avatar, Stack } from '@mui/material';

import { loginAction } from '../../redux/actions/AuthActions';
import { Wrapper, Input } from './styles';

interface FormValuesInterface {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

interface LoginFormPropsInteface {
  authErrors?: Array<string>;
  captcha: string | null;
}

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: yup.string().max(255).required('Password is required'),
});

const LoginForm: React.FC<LoginFormPropsInteface> = ({ authErrors, captcha }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValuesInterface>({
    resolver: yupResolver(schema),
  });

  const authErrorsMessage = authErrors?.map((error) => <span key={error}>{error}</span>);

  const onSubmit: SubmitHandler<FormValuesInterface> = (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      captcha: data.captcha,
    };
    dispatch(loginAction(requestData));
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack alignItems='center'>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Controller
            render={({ field }) => <Input {...field} placeholder='Email address' />}
            name='email'
            control={control}
          />
          {errors.email && <span className='text-color-red'>{errors.email.message}</span>}
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder='Password' id='bootstrap-input' type='password' />
            )}
            name='password'
            control={control}
            defaultValue=''
          />
          {errors.password && <span className='text-color-red'>{errors.password.message}</span>}
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
          <div>{authErrors?.length !== 0 && authErrorsMessage}</div>
          <div>
            {captcha && <img src={captcha} alt='captcha' />}
            {captcha && <input {...register('captcha', { required: true })} />}
          </div>
          <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Stack>
      </form>
    </Wrapper>
  );
};

export default LoginForm;
