import { Avatar, Box, List, Paper, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogs } from '../../redux/actions/DialogsActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import classes from './Dialogs.module.css';
import { Messages } from './Messages';
import SendMessageForm from './SendMessageForm';

const Dialogs: React.FC = () => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDialogs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showMessage, setShowMessages] = useState(false);
  const currentDialogs = useSelector((state: AppStateType) => state.dialogs.dialogs);
  const handleClick = (id: number) => (e: React.MouseEvent) => {
    setCurrentUserId(id);
    setShowMessages(true);
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '30px 0 0 0' }}>
        <div>
          <Typography variant='h6' component='span'>
            Dialogs
          </Typography>
          <Box>
            <Paper style={{ maxHeight: 400, width: 250, overflow: 'auto' }}>
              <List>
                {currentDialogs.map((dialog) => (
                  <div key={uniqueId()} className={classes.userDialog}>
                    <Avatar alt={dialog.userName} src={dialog.photos.large ?? undefined} />
                    <Typography onClick={handleClick(dialog.id)}>{dialog.userName}</Typography>
                  </div>
                ))}
              </List>
            </Paper>
          </Box>
        </div>
        {showMessage && (
          <div className={classes.messagesContainer}>
            <Typography variant='h6' component='span'>
              Messages
            </Typography>
            <Messages currentUserId={currentUserId} />
            <SendMessageForm currentUserId={currentUserId} />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Dialogs;
