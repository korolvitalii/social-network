import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetch } from '../redux/selectors/user-selectors';
import Preloader from '../components/common/Preloader/Preloader';
import Users from '../components/Developers/Developers';

const UsersPage: React.FC = (): React.ReactElement => {
  const isFetch = useSelector(getIsFetch);

  return (
    <div>
      {isFetch && <Preloader />}
      <div>
        <Typography variant='h3' component='span'>
          Developers
        </Typography>
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default UsersPage;
