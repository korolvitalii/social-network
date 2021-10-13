import React from 'react';
import withAuthRedirect from '../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const DialogsPage: React.FC = () => {
  return <Dialogs />;
};

const ChatPageWithRedirect = withAuthRedirect(DialogsPage);

export default ChatPageWithRedirect;
