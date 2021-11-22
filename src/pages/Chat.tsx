import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialogs from '../components/Chat/Chat';
import MessageForm from '../components/Chat/Message/MessageForm';
import withAuthRedirect from '../hoc/withAuthRedirect';
import {
  actions,
  startMessageListening,
  stopMessagesListening,
} from '../redux/actions/ChatActions';
import { ChatPageWrapper, MessageFormWrapper } from './Chat styled';

const ChatPage: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessageListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.clearMessageInStore());
    };
  }, [dispatch]);

  return (
    <ChatPageWrapper>
      <Dialogs />
      <MessageFormWrapper>
        <MessageForm />
      </MessageFormWrapper>
    </ChatPageWrapper>
  );
};

const ChatPageWithRedirect = withAuthRedirect(ChatPage);

export default ChatPageWithRedirect;
