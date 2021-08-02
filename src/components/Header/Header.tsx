import React from 'react';
import logo from '../../assets/images/logo.jpg';
import classes from './Header.module.css';

type Props = {};

const Header: React.FC = (props: Props) => {
  return (
    <header className={classes.header}>
      <img src={logo} alt='' />
    </header>
  );
};

export default Header;
