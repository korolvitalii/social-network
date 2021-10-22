import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../redux/actions/DialogsActions';
import classes from './SendMessageForm.module.css';

type FormValues = {
  messageText: string;
};

type PropsType = {
  currentUserId: number;
};

const SendMessageForm: React.FC<PropsType> = ({ currentUserId }) => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = () => {
    const messageObj = { body: message };
    dispatch(sendMessage(currentUserId, messageObj));
    setMessage('');
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='messageText'
        control={control}
        render={({ field }) => (
          <TextField
            id='outlined-multiline-static'
            label='Multiline'
            multiline
            rows={4}
            fullWidth
            size='medium'
            onChange={inputChange}
          />
        )}
      />
      <Button variant='contained' type='submit' endIcon={<SendIcon />}>
        Send
      </Button>
    </form>
  );
};

export default SendMessageForm;
