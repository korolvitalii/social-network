import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { actions, sendMessage } from '../../redux/actions/DialogsActions';
import { SendMessageFormWrapper, FormContainer, Form, SendButton } from './SendMessageForm.styled';

type FormValues = {
  messageText: string;
};

type PropsType = {
  currentUserId: number;
};

const SendMessageForm: React.FC<PropsType> = ({ currentUserId }): React.ReactElement => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValues> = () => {
    const messageObj = { body: message };
    dispatch(sendMessage(currentUserId, messageObj));
    dispatch(actions.updateDialogMessages(false));
    setMessage('');
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(actions.updateDialogMessages(true));
    setMessage(event.currentTarget.value);
  };

  return (
    <SendMessageFormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Controller
            name='messageText'
            control={control}
            render={({ field }) => (
              <TextField
                id='outlined-multiline-static'
                label='Write message'
                multiline
                rows={4}
                size='medium'
                onChange={inputChange}
                value={message}
                sx={{ marginBottom: '10px' }}
              />
            )}
          />
          <SendButton variant='contained' type='submit' endIcon={<SendIcon />}>
            Send
          </SendButton>
        </FormContainer>
      </Form>
    </SendMessageFormWrapper>
  );
};

export default SendMessageForm;
