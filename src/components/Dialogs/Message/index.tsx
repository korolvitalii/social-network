import React from 'react';
import { Typography } from '@mui/material';
import { Wrapper } from './styles';

interface MessageInterfaceProps {
  message: string;
  userName: string;
}

const Message: React.FC<MessageInterfaceProps> = ({ message, userName }) => {
  return (
    <Wrapper>
      <Typography variant='subtitle1' component='div' className='text-username'>
        {userName}
      </Typography>
      <div className='message-body'>
        <Typography
          variant='subtitle2'
          color='black'
          gutterBottom
          component='span'
          sx={{ paddingLeft: 1 }}>
          {message}
        </Typography>
      </div>
    </Wrapper>
  );
};

export default Message;
