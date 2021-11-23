import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

const Navbar: React.FC = (): React.ReactElement => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' activeClassName={classes.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/developers' activeClassName={classes.activeLink}>
          Developers
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/chat' activeClassName={classes.activeLink}>
          Chat
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' activeClassName={classes.activeLink}>
          Dialogs
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
