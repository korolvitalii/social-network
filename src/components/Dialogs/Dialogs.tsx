import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/MessagesActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { MessageType } from '../../types/types';
import Message from './Message/Message';
import MessageForm from './Message/MessageForm';
import { uniqueId } from 'lodash';

const Dialogs: React.FC = (props) => {
  const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  const dispatch = useDispatch();
  const messages = useSelector((state: AppStateType) => state.messagesPage.messages);
  useEffect(() => {
    wsChannel.addEventListener('message', (e) => {
      dispatch(actions.fetchMessages(JSON.parse(e.data)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Typography variant='h3' component='span'>
        Chat
      </Typography>
      <div>
        {messages.map((message: MessageType) => (
          <Message {...message} key={uniqueId()} />
        ))}
      </div>
      <div>
        <MessageForm wsChannel={wsChannel} />
      </div>
    </div>
  );
};

export default Dialogs;
