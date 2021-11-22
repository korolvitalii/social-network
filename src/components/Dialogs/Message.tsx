import { Typography } from '@mui/material';
import React from 'react';
import { MessageContainer, MessageBody } from './Message styled';

type PropsType = {
  message: string;
  userName: string;
};

const Message: React.FC<PropsType> = ({ message, userName }): React.ReactElement => {
  return (
    <div>
      <MessageContainer>
        <Typography variant='subtitle1' component='span' sx={{ color: 'lightskyblue' }}>
          {userName}
        </Typography>
      </MessageContainer>
      <MessageBody>
        <Typography
          variant='subtitle2'
          color='black'
          gutterBottom
          component='span'
          sx={{ paddingLeft: 1 }}>
          {message}
        </Typography>
      </MessageBody>
    </div>
  );
};

export default Message;
