import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetch } from '../redux/selectors/user-selectors';
import Preloader from '../components/common/Preloader/Preloader';
import Users from '../components/Developers/Users';

const UsersPage: React.FC = () => {
  const isFetch = useSelector(getIsFetch);

  return (
    <div>
      {isFetch && <Preloader />}
      <Box>
        <Typography variant='h3' component='span'>
          Developers
        </Typography>
      </Box>
      <Box>
        <Users />
      </Box>
    </div>
  );
};

export default UsersPage;
