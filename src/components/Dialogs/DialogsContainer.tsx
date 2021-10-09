import React from 'react';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const ChatPage: React.FC = () => {
  return <Dialogs />;
};

const ChatPageWithRedirect = withAuthRedirect(ChatPage);

export default ChatPageWithRedirect;
