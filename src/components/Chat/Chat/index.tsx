import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Paper, Typography } from '@mui/material';
import { selectMessages } from '../../../redux/selectors/dialogs-selectors';
import { MessageType } from '../../../types/types';
import Message from '../Message';
import { Wrapper } from './styles';

const ChatContainer: React.FC = () => {
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
    <Wrapper>
      <Typography variant='h3' component='span'>
        Chat
      </Typography>
      <div>
        <div>
          <Paper className='chat-container'>
            {messages ? (
              messages.map((message: MessageType) => <Message {...message} key={uniqueId()} />)
            ) : (
              <Typography>Chat is empty</Typography>
            )}
            <div ref={messagesAnchorRef} onScroll={scrollHandler}></div>
          </Paper>
        </div>
      </div>
    </Wrapper>
  );
};
export default ChatContainer;
