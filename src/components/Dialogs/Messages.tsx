import { List, Paper } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfMessages } from '../../redux/actions/DialogsActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import Message from './Message';

type PropsType = {
  currentUserId: number;
};

export const Messages: React.FC<PropsType> = React.memo(({ currentUserId }) => {
  console.log('>>>>>>Messages');
  const dispatch = useDispatch();
  const messages = useSelector((state: AppStateType) => state.dialogs.userMessages);
  useEffect(() => {
    dispatch(getListOfMessages(currentUserId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);
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
    <div>
      <Paper style={{ maxHeight: 300, width: 700, overflow: 'auto' }}>
        <List>
          {messages &&
            Object.keys(messages.items).map((key) => (
              <Message
                userName={messages.items[key].senderName}
                message={messages.items[key].body}
                key={uniqueId()}
              />
            ))}
          <div ref={messagesAnchorRef} onScroll={scrollHandler}></div>
        </List>
      </Paper>
    </div>
  );
});
