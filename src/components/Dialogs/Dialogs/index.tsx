import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { Avatar, Typography } from '@mui/material';
import { getAllDialogs } from '../../../redux/actions/DialogsActions';
import { selectDialog } from '../../../redux/selectors/dialogs-selectors';
import { Messages } from '../Messages';
import SendMessageForm from '../AddMessageForm';
import { Wrapper } from './styles';

const Dialogs: React.FC = () => {
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
    <Wrapper>
      <div className='dialogs-items'>
        <Typography variant='h6' component='span'>
          Dialogs
        </Typography>
        <div>
          <div>
            <div>
              {currentDialogs.map((dialog) => (
                <div key={uniqueId()}>
                  <Avatar alt={dialog.userName} src={dialog.photos.large ?? undefined} />
                  <Typography onClick={handleClick(dialog.id)}>{dialog.userName}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showMessage && (
        <div className='messages-block'>
          <Typography variant='h6' component='span'>
            Messages
          </Typography>
          <Messages currentUserId={currentUserId} />
          <SendMessageForm currentUserId={currentUserId} />
        </div>
      )}
    </Wrapper>
  );
};

export default Dialogs;
