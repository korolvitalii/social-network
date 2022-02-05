import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import { selectIsFetch } from '../../redux/selectors/user-selectors';
import Preloader from '../../components/common/Preloader/Preloader';
import Users from '../../components/Users/Users';
import { Wrapper } from './styles';

const UsersPage: React.FC = () => {
  const isFetch = useSelector(selectIsFetch);

  return (
    <Wrapper>
      {isFetch && <Preloader />}
      <div className='container'>
        <Typography variant='h3' component='span'>
          Developers
        </Typography>
        <div>
          <Users />
        </div>
      </div>
    </Wrapper>
  );
};

export default UsersPage;
