import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../redux/actions/ChatActions';
import classes from './MessageForm.module.css';

type FormValues = {
  messageText: string;
};

const MessageForm = () => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = () => {
    dispatch(sendMessage(message));
    setMessage('');
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  return (
    <Box sx={{ width: '600px' }}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='messageText'
          control={control}
          render={({ field }) => (
            <TextField
              id='outlined-multiline-static'
              label='Write message'
              multiline
              rows={4}
              fullWidth
              size='medium'
              sx={{ marginBottom: '10px' }}
              onChange={inputChange}
            />
          )}
        />
        <Button variant='contained' type='submit' endIcon={<SendIcon />}>
          Send
        </Button>
      </form>
    </Box>
  );
};

export default MessageForm;
