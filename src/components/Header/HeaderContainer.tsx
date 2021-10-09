import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reducers/rootReducer';
import HeaderNav from './HeaderNav';

const HeaderContainer: React.FC = () => {
  const { auth } = useSelector((state: AppStateType) => state);

  return <HeaderNav {...auth} />;
};

export default HeaderContainer;
