import React from 'react';
import { NavLink } from 'react-router-dom';
import { DialogType, MessageType } from '../../AppLoader';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message';

type PropsType = {
  dialogs: Array<DialogType>;
  message: Array<MessageType>;
};

const Dialogs: React.FC<PropsType> = (props) => {
  const { dialogs, message } = props;
  const dialogsElements = dialogs.map(({ name, id }) => <Dialog name={name} id={id} />);
  const messageElements = message.map(({ text, id }) => <Message text={text} id={id} />);
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>{messageElements}</div>
    </div>
  );
};

export default Dialogs;
