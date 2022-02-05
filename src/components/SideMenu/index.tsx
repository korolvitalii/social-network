import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from './styles';

const SideMenu: React.FC = () => {
  return (
    <Nav>
      <NavLink to='/profile' activeClassName='active'>
        Profile
      </NavLink>
      <NavLink to='/developers' activeClassName='active'>
        Developers
      </NavLink>
      <NavLink to='/chat' activeClassName='active'>
        Chat
      </NavLink>
      <NavLink to='/dialogs' activeClassName='active'>
        Dialogs
      </NavLink>
    </Nav>
  );
};

export default SideMenu;
