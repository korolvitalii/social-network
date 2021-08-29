import React from 'react';
import { useDispatch } from 'react-redux';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import { addNewMessage, updateNewMessageText } from '../../redux/actions/MessagesActions';
import { InitialStateType } from '../../redux/reducers/MessagesReducer';

type PropsType = {
  messagePage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
  const {
    messagePage: { dialogs, messages, newMessageText },
  } = props;
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

export default Dialogs;
