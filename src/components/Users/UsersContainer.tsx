import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetch } from '../../redux/selectors/user-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

const UsersPage: React.FC = () => {
  const isFetch = useSelector(getIsFetch);

  return (
    <>
      <h1>Users</h1>
      {isFetch && <Preloader />}
      <Users />
    </>
  );
};

export default UsersPage;
