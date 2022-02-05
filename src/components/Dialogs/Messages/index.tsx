import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, uniqueId } from 'lodash';
import { Box, List, Typography } from '@mui/material';
import { getListOfMessages } from '../../../redux/actions/DialogsActions';
import { AppStateType } from '../../../redux/reducers/rootReducer';
import Message from '../Message';
import { Wrapper } from './styles';

interface MessagesPropsInterface {
  currentUserId: number;
}

export const Messages: React.FC<MessagesPropsInterface> = React.memo(({ currentUserId }) => {
  const dispatch = useDispatch();
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const messages = useSelector((state: AppStateType) => state.dialogs.userMessages);
  const updateDialogMessages = useSelector((state: AppStateType) => state.dialogs.isUpdate);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getListOfMessages(currentUserId));
    const interval = setInterval(() => {
      dispatch(getListOfMessages(currentUserId));
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId, updateDialogMessages]);

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  return (
    <Wrapper>
      <List>
        {messages && !isEmpty(messages) ? (
          messages.map((message) => (
            <Message userName={message.senderName} message={message.body} key={uniqueId()} />
          ))
        ) : (
          <Typography>Chat is empty</Typography>
        )}
        <Box component='div' ref={messagesAnchorRef} onScroll={scrollHandler}></Box>
      </List>
    </Wrapper>
  );
});
