import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import classes from './Header.module.css';

type PropsType = {
  id: number;
  login: string;
  email: string;
  isAuth: boolean;
};

const Header: React.FC<PropsType> = (props) => {
  const { isAuth } = props;
  return (
    <header className={classes.header}>
      <img src={logo} alt='' />
      <div className={classes.login}>
        {!isAuth && <NavLink to='/loginRegistrationPage'>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;
