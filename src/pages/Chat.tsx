import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import withAuthRedirect from '../hoc/withAuthRedirect';
import {
  actions,
  startMessageListening,
  stopMessagesListening,
} from '../redux/actions/ChatActions';
import Dialogs from '../components/Chat/Chat';
import MessageForm from '../components/Chat/Message/MessageForm';
import { Box } from '@mui/system';

const ChatPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessageListening());
    return () => {
      dispatch(stopMessagesListening());
      dispatch(actions.clearMessageInStore());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
      <Dialogs />
      <Box sx={{ marginRight: 'auto' }}>
        <MessageForm />
      </Box>
    </Box>
  );
};

const ChatPageWithRedirect = withAuthRedirect(ChatPage);

export default ChatPageWithRedirect;
