import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { NavLink } from 'react-router-dom';

type PropsType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Message: React.FC<PropsType> = ({ message, photo, userName, userId }) => {
  const onRedirectUserPage = () => {
    console.log('click');
  };
  const path = `/profile/${userId}`;

  return (
    <div>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: 1,
            bgcolor: 'background.paper',
          }}
          onClick={onRedirectUserPage}>
          <NavLink to={path}>
            <Avatar alt={userName} src={photo} />
          </NavLink>
          <Box sx={{ marginLeft: '5px' }}>
            <Typography
              variant='subtitle2'
              gutterBottom
              component='div'
              sx={{ fontWeight: 'bold' }}>
              {userName}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {message}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Message;
