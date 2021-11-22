import { List, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from '../../redux/selectors/dialogs';
import { MessageType } from '../../types/types';
import { ChatItems, ChatWrapper } from './Chat styled';
import Message from './Message/Message';

const ChatContainer: React.FC = (): React.ReactElement => {
  const messages = useSelector(selectMessages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  return (
    <ChatWrapper>
      <Typography variant='h3' component='span'>
        Chat
      </Typography>
      <div>
        <ChatItems>
          <List>
            {messages ? (
              messages.map((message: MessageType) => <Message {...message} key={uniqueId()} />)
            ) : (
              <Typography>Chat is empty</Typography>
            )}
            <div ref={messagesAnchorRef} onScroll={scrollHandler}></div>
          </List>
        </ChatItems>
      </div>
    </ChatWrapper>
  );
};
export default ChatContainer;
