import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageWrapper } from './Message.styled';

type PropsType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Message: React.FC<PropsType> = ({
  message,
  photo,
  userName,
  userId,
}: PropsType): React.ReactElement => {
  const path = `/profile/${userId}`;

  return (
    <div>
      <MessageWrapper>
        <NavLink to={path}>
          <Avatar alt={userName} src={photo} />
        </NavLink>
        <Box sx={{ marginLeft: '5px' }}>
          <Typography variant='subtitle2' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
            {userName}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {message}
          </Typography>
        </Box>
      </MessageWrapper>
    </div>
  );
};

export default Message;
