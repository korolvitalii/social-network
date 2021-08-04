import React from 'react';
import { NavLink } from 'react-router-dom';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message';

type PropsType = {};

const Dialogs: React.FC = (props) => {
  const dialogsData = [
    { id: 1, name: 'Roksi' },
    { id: 2, name: 'Max' },
    { id: 3, name: 'John' },
    { id: 4, name: 'Andrey' },
    { id: 5, name: 'Tom' },
    { id: 6, name: 'Jerry' },
    { id: 7, name: 'Ben' },
  ];
  const messageData = [
    { id: 1, text: 'hello' },
    { id: 2, text: 'hi' },
    { id: 3, text: 'yo' },
    { id: 4, text: 'bye' },
  ];
  const dialogsElements = dialogsData.map(({ name, id }) => <Dialog name={name} id={id} />);
  const messageElements = messageData.map(({ text, id }) => <Message text={text} id={id} />);
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>{messageElements}</div>
    </div>
  );
};

export default Dialogs;
