import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

type PropsType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const Message: React.FC<PropsType> = ({ message, photo, userName }) => {
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
          }}>
          <Avatar alt={userName} src={photo} />
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
