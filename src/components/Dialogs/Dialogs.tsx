import React, { LegacyRef } from 'react';
import { DialogType, MessageType } from '../../redux/state';
import Dialog from './Dialog';
import classes from './Dialogs.module.css';
import Message from './Message';

type PropsType = {
  dialogs: Array<DialogType>;
  message: Array<MessageType>;
};

const Dialogs: React.FC<PropsType> = (props) => {
  const messageRef: LegacyRef<HTMLTextAreaElement> = React.createRef();

  const { dialogs, message } = props;

  const dialogsElements = dialogs.map(({ name, id }) => <Dialog name={name} id={id} />);
  const messageElements = message.map(({ text, id }) => <Message text={text} id={id} />);

  const onClickButton = (): void => {
    console.log(messageRef.current?.value);
  };

  return (
    <div>
      <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>{dialogsElements}</div>
        <div className={classes.messages}>{messageElements}</div>
      </div>
      <div>
        <textarea ref={messageRef}></textarea>
        <button onClick={onClickButton}>Send</button>
      </div>
    </div>
  );
};

export default Dialogs;
