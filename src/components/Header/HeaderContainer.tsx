import React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reducers/rootReducer';
import Header from './Header';

const HeaderContainer: React.FC = () => {
  const { auth } = useSelector((state: AppStateType) => state);

  return <Header {...auth} />;
};

export default HeaderContainer;
