import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { alpha, styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
import classes from './MessageForm.module.css';

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

type FormValues = {
  messageText: string;
};

type PropsTypes = {
  wsChannel: WebSocket;
};

const MessageForm: React.FC<PropsTypes> = ({ wsChannel }) => {
  const { control, handleSubmit } = useForm();

  // const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = () => {
    wsChannel.send(message);
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
          <RedditTextField
            {...field}
            label='Write your message'
            id='reddit-input'
            variant='filled'
            style={{ marginTop: 11 }}
            onChange={inputChange}
            value={message}
          />
        )}
      />
      <Button variant='contained' type='submit' endIcon={<SendIcon />}>
        Send
      </Button>
    </form>
  );
};

export default MessageForm;
