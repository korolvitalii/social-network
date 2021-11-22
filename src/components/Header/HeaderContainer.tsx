import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors/header';
import HeaderNav from './HeaderNav';

const HeaderContainer: React.FC = (): React.ReactElement => {
  const auth = useSelector(selectAuth);

  return <HeaderNav {...auth} />;
};

export default HeaderContainer;
