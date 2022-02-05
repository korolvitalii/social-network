import React, { ChangeEvent, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../../redux/actions/ChatActions';
import { Wrapper } from './styles';

interface FormValuesInterface {
  messageText: string;
}

const AddMessageForm: React.FC = () => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValuesInterface> = (): void => {
    dispatch(sendMessage(message));
    setMessage('');
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setMessage(event.currentTarget.value);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMessageForm;
