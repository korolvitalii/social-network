import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/actions/ProfileActions';
import classes from './MyPostForm.module.css';
import { uniqueId } from 'lodash';

type FormValues = {
  postText: string;
};

export default function MessageForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const post = {
      id: Number(uniqueId()),
      text: data.postText,
      likeCount: 0,
    };
    dispatch(actions.addNewPost(post));
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className={classes.textarea}
        {...register('postText', { required: true, max: 200 })}
      />

      <button type='submit' className={classes.button}>
        Send
      </button>
    </form>
  );
}
