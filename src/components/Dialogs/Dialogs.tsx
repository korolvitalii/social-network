import React from 'react';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import { InitialStateType } from '../../redux/reducers/MessagesReducer';
import MessageForm from './Message/MessageForm';

type PropsType = {
  messagePage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
  const {
    messagePage: { dialogs, messages },
  } = props;
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
