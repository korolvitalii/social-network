import React from 'react';
import classes from './Message.module.css';

type PropsType = {
  id: number;
  text: string;
};

const Message: React.FC<PropsType> = (props) => {
  const { text } = props;
  return <div className={classes.message}>{text}</div>;
};

export default Message;
