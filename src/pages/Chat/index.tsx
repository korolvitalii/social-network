import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialogs from '../../components/Chat/Chat';
import AddMessageForm from '../../components/Chat/AddMessageForm';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {
  actions,
  startMessageListening,
  stopMessagesListening,
} from '../../redux/actions/ChatActions';
import { Wrapper } from './styles';

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
    <Wrapper>
      <Dialogs />
      <AddMessageForm />
    </Wrapper>
  );
};

const ChatPageWithRedirect = withAuthRedirect(ChatPage);

export default ChatPageWithRedirect;
