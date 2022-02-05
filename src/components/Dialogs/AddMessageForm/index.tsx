import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { actions, sendMessage } from '../../../redux/actions/DialogsActions';
import { Wrapper } from './styles';
import Button from '@mui/material/Button';

interface FormValuesInterface {
  messageText: string;
}

interface AddMessageFormInterface {
  currentUserId: number;
}

const AddMessageForm: React.FC<AddMessageFormInterface> = ({ currentUserId }) => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<FormValuesInterface> = () => {
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
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-body'>
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
          <Button variant='contained' type='submit' endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddMessageForm;
