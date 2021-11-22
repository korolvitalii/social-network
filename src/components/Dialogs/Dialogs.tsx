import { Avatar, List, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogs } from '../../redux/actions/DialogsActions';
import { selectDialog } from '../../redux/selectors/dialogs';
import { DialogsBody, DialogsWrapper, UserDialog, MessagesContainer } from './Dialogs.styled';
import { Messages } from './Messages';
import SendMessageForm from './SendMessageForm';

const Dialogs: React.FC = (): React.ReactElement => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDialogs());
  }, [dispatch]);
  const [showMessage, setShowMessages] = useState(false);
  const currentDialogs = useSelector(selectDialog);
  const handleClick = (id: number) => (e: React.MouseEvent) => {
    setCurrentUserId(id);
    setShowMessages(true);
  };
  return (
    // <Box>
    <DialogsWrapper>
      <div>
        <Typography variant='h6' component='span'>
          Dialogs
        </Typography>
        <div>
          <DialogsBody>
            <List>
              {currentDialogs.map((dialog) => (
                <UserDialog key={uniqueId()}>
                  <Avatar alt={dialog.userName} src={dialog.photos.large ?? undefined} />
                  <Typography onClick={handleClick(dialog.id)}>{dialog.userName}</Typography>
                </UserDialog>
              ))}
            </List>
          </DialogsBody>
        </div>
      </div>
      {showMessage && (
        <MessagesContainer>
          <Typography variant='h6' component='span'>
            Messages
          </Typography>
          <Messages currentUserId={currentUserId} />
          <SendMessageForm currentUserId={currentUserId} />
        </MessagesContainer>
      )}
    </DialogsWrapper>
    // </Box>
  );
};

export default Dialogs;
