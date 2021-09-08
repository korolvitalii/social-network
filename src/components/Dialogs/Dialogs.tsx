import React from 'react';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import MessageForm from './Message/MessageForm';
import { DialogType, MessageType } from '../../types/types';

type PropsType = {
  dialogs: Array<DialogType>;
  messages: Array<MessageType>;
};

const Dialogs: React.FC<PropsType> = (props) => {
  const { dialogs, messages } = props;
  const dialogsElements = dialogs.map(({ name, id }) => <Dialog name={name} id={id} key={id} />);
  const messageElements = messages.map(({ text, id }) => <Message text={text} id={id} key={id} />);

  return (
    <div>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>{dialogsElements}</div>
        <div className={classes.messages}>{messageElements}</div>
      </div>
      <div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Dialogs;
