import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className='nav'>
      <a>Profile</a>
      <a>Messages</a>
      <a>News</a>
      <a>Music</a>
      <a>Settings</a>
    </nav>
  );
};

export default Navbar;
