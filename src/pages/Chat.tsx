import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import withAuthRedirect from '../hoc/withAuthRedirect';
import {
  actions,
  startMessageListening,
  stopMessagesListening,
} from '../redux/actions/ChatActions';
import Dialogs from '../components/Chat/Chat';
import classes from './ChatPage.module.css';
import MessageForm from '../components/Chat/Message/MessageForm';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessageListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.clearMessageInStore());
    };
  }, []);

  return (
    <div className={classes.chatPageContainer}>
      <Dialogs />
      <MessageForm />
    </div>
  );
};

const ChatPageWithRedirect = withAuthRedirect(ChatPage);

export default ChatPageWithRedirect;
