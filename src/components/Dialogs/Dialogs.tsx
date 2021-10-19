import { Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogs, sendMessage } from '../../redux/actions/DialogsActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { DialogType } from '../../types/types';
import { Messages } from './Messages';
import classes from './Dialogs.module.css';
import SendMessageForm from './SendMessageForm';
import { uniqueId } from 'lodash';

type PropsTypes = {
  dialogs: DialogType[];
};

const Dialogs: React.FunctionComponent<PropsTypes> = ({ dialogs }) => {
  const [currentUserId, setCurrentUserId] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDialogs());
  }, []);
  const [showMessage, setShowMessages] = useState(false);
  const currentDialogs = useSelector((state: AppStateType) => state.dialogs.dialogs);
  console.log(currentDialogs);

  console.log('Dialogs >>>>>>');
  const handleClick = (id: number) => (e: any) => {
    setCurrentUserId(id);
    setShowMessages(true);
  };
  return (
    <div>
      <Typography variant='h3' component='span'>
        Dialogs
      </Typography>
      <div className={classes.dialogsContainer}>
        <div>
          <Typography variant='h6' component='span'>
            Dialogs
          </Typography>
          {Object.keys(currentDialogs).map((key) => (
            <div key={uniqueId()} className={classes.userDialog}>
              <Avatar alt={currentDialogs[key].userName} src={currentDialogs[key].photos.large} />
              <Typography onClick={handleClick(currentDialogs[key].id)}>
                {currentDialogs[key].userName}
              </Typography>
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default Dialogs;
