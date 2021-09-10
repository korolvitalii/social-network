import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import classes from './Header.module.css';

import { Logout } from '../Login/Logout';

type PropsType = {
  id: number;
  login: string;
  email: string;
  isAuth: boolean;
};

const Header: React.FC<PropsType> = ({ isAuth }) => {
  const handleClick = () => {
    return <Redirect to='/profile' />;
  };
  return (
    <header className={classes.header}>
      <img src={logo} alt='' onClick={handleClick} />
      <div>
        {!isAuth ? (
          <NavLink to='/login'>
            <div className={classes.login}>
              <button type='button'></button>
            </div>
          </NavLink>
        ) : (
          <Logout />
        )}
      </div>
    </header>
  );
};

export default Header;
