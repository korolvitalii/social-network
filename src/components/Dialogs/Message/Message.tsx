import React from 'react';
import classes from './Message.module.css';

type PropsType = {
  id: string;
  text: string;
};

const Message: React.FC<PropsType> = ({ text }) => {
  return <div className={classes.message}>{text}</div>;
};

export default Message;
