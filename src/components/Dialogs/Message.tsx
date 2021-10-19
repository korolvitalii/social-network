import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

type PropsType = {
  message: string;
  userName: string;
};

const Message: React.FC<PropsType> = ({ message, userName }) => {
  return (
    <div>
      <Box>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, bgcolor: 'background.paper' }}>
            <Typography variant='subtitle1' component='span' sx={{ color: 'lightskyblue' }}>
              {userName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant='subtitle2'
              color='black'
              gutterBottom
              component='span'
              sx={{ paddingLeft: 1 }}>
              {message}
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Message;
