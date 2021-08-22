import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../components/Dialogs/Dialog';
import classes from './Dialogs.module.css';
import Message from '../components/Message/Message';
import { MessageType, RootStateType } from '../types/types';
import { addNewMessage, updateNewMessageText } from '../redux/actions/MessagesActions';

const Messages: React.FC = () => {
  const { dialogs, messages, newMessageText } = useSelector(
    (state: RootStateType) => state.messagesPage,
  );
  const dispatch = useDispatch();
  const dialogsElements = dialogs.map(({ name, id }) => <Dialog name={name} id={id} key={id} />);
  const messageElements = messages.map(({ text, id }) => <Message text={text} id={id} key={id} />);

  const onClickButton = (): void => {
    const message = { id: 1, text: newMessageText };
    dispatch(addNewMessage(message));
  };
  const onNewMessageTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = e.target.value;
    dispatch(updateNewMessageText(text));
  };

  return (
    <div>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>{dialogsElements}</div>
        <div className={classes.messages}>{messageElements}</div>
      </div>
      <div>
        <textarea value={newMessageText} onChange={onNewMessageTextChange}></textarea>
        <button onClick={onClickButton}>Send</button>
      </div>
    </div>
  );
};

export default Messages;