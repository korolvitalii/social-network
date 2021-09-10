import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Dialog.module.css';

type PropsType = {
  name: string;
  id: number;
};

const Dialog: React.FC<PropsType> = ({ id, name }) => {
  const path = '/dialogs/' + id;
  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default Dialog;
