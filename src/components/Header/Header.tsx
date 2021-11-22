import React from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../../assets/images/app-logo.png';

import Logout from '../Login/Logout';
import { Logo } from './Header styled';
import HeaderContainer from './HeaderContainer';

type PropsType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean | null;
};

const Header: React.FC<PropsType> = ({ isAuth }): React.ReactElement => {
  const handleClick = () => {
    return <Redirect to='/profile' />;
  };
  return (
    <HeaderContainer>
      <Logo src={logo} alt='' onClick={handleClick} />
      <div>{isAuth && <Logout />}</div>
    </HeaderContainer>
  );
};

export default Header;
