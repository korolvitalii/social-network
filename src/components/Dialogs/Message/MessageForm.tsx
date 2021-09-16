import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/actions/MessagesActions';
import classes from './MessageForm.module.css';
import { uniqueId } from 'lodash';

type FormValues = {
  messageText: string;
};

const MessageForm: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const message = {
      id: uniqueId(),
      text: data.messageText,
    };
    dispatch(actions.addNewMessage(message));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className={classes.textarea}
        {...register('messageText', { required: true, max: 200 })}
      />
      <button type='submit' className={classes.button}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;
