import { Box, List, Paper, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { MessageType } from '../../types/types';
import Message from './Message/Message';

const Dialogs: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <Box sx={{ marginLeft: '48px' }}>
      <Typography variant='h3' component='span'>
        Chat
      </Typography>
      <Box>
        <Paper style={{ maxHeight: 400, width: 900, overflow: 'auto' }}>
          <List>
            {messages ? (
              messages.map((message: MessageType) => <Message {...message} key={uniqueId()} />)
            ) : (
              <Typography>Chat is empty</Typography>
            )}
            <div ref={messagesAnchorRef} onScroll={scrollHandler}></div>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dialogs;
