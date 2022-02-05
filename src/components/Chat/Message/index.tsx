import { Avatar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrapper } from './styles';

interface MessagePropsInterface {
  message: string;
  photo: string;
  userId: number;
  userName: string;
}

const Message: React.FC<MessagePropsInterface> = ({ message, photo, userName, userId }) => {
  const path = `/profile/${userId}`;

  return (
    <Wrapper>
      <Link to={path} className='avatar-username-block'>
        <Avatar alt={userName} src={photo} />
        <Typography variant='subtitle1' gutterBottom className='text-username'>
          {userName}
        </Typography>
      </Link>
      <Typography component='div' className='text-message'>
        {message}
      </Typography>
    </Wrapper>
  );
};

export default Message;
