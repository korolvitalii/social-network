import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions/AuthActions';
import classes from './LoginForm.module.css';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
      captcha: false,
    };
    dispatch(loginAction(requestData));
  };
  debugger;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <input
        type='email'
        placeholder='Email'
        className={classes.input}
        {...(register('email'),
        {
          required: 'Please write correct email adress',
        })}
        required
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type='password'
        className={classes.input}
        placeholder='Password'
        {...register('password', {
          required: 'You must specify a password',
          minLength: {
            value: 8,
            message: 'Password must have at least 8 characters',
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type='checkbox' {...register('rememberMe')} />
      <button type='submit'>send</button>
    </form>
  );
}
// function App() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     alert(JSON.stringify(data));
//   }; // your form submit function which will invoke after successful validation

//   console.log(watch('example')); // you can watch individual input by pass the name of the input

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>First Name</label>
//       <input
//         {...register('firstName', {
//           required: true,
//           maxLength: 20,
//           pattern: /^[A-Za-z]+$/i,
//         })}
//       />
//       {errors?.firstName?.type === 'required' && <p>This field is required</p>}
//       {errors?.firstName?.type === 'maxLength' && <p>First name cannot exceed 20 characters</p>}
//       {errors?.firstName?.type === 'pattern' && <p>Alphabetical characters only</p>}
//       <label>Laste Name</label>
//       <input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />
//       {errors?.lastName?.type === 'pattern' && <p>Alphabetical characters only</p>}
//       <label>Age</label>a
//       <input {...register('age', { min: 18, max: 99 })} />
//       {errors.age && <p>You Must be older then 18 and younger then 99 years old</p>}
//       <input type='submit' />
//     </form>
//   );
// }
