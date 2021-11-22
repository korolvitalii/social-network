import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import { Nav, NavItem } from './Navbar.styled';

const Navbar: React.FC = (): React.ReactElement => {
  return (
    <Nav>
      <NavItem>
        <NavLink to='/profile' activeClassName={classes.activeLink}>
          Profile
        </NavLink>
      </NavItem>{' '}
      <NavItem>
        <NavLink to='/developers' activeClassName={classes.activeLink}>
          Developers
        </NavLink>
      </NavItem>{' '}
      <NavItem>
        <NavLink to='/chat' activeClassName={classes.activeLink}>
          Chat
        </NavLink>
      </NavItem>{' '}
      <NavItem>
        <NavLink to='/dialogs' activeClassName={classes.activeLink}>
          Dialogs
        </NavLink>
      </NavItem>{' '}
    </Nav>
  );
};

export default Navbar;
