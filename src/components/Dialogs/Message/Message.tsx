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
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, bgcolor: 'background.paper' }}>
            <Avatar alt={userName} src={photo} />
            <Typography variant='subtitle1' component='span'>
              {userName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography variant='subtitle2' color='black' gutterBottom component='span'>
              {message}
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Message;
