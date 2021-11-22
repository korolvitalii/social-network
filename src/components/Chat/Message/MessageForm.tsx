import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../redux/actions/ChatActions';
import { FormBody, MessageFormWrapper, Form } from './MessageForm styled';

type FormValues = {
  messageText: string;
};

const MessageForm: React.FC = (): React.ReactElement => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = (): void => {
    dispatch(sendMessage(message));
    setMessage('');
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setMessage(event.currentTarget.value);
  };

  return (
    <MessageFormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormBody>
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
                value={message}
              />
            )}
          />
          <Button variant='contained' type='submit' endIcon={<SendIcon />} sx={{ width: '120px' }}>
            Send
          </Button>
        </FormBody>
      </Form>
    </MessageFormWrapper>
  );
};

export default MessageForm;
