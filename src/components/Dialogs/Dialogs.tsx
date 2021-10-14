import { Avatar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDialogs, sendMessage } from '../../redux/actions/DialogsActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import { DialogType } from '../../types/types';

type PropsTypes = {
  dialogs: DialogType[];
};

const Dialogs: React.FunctionComponent<PropsTypes> = ({ dialogs }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDialogs());
  }, []);
  const currentDialogs = useSelector((state: AppStateType) => state.dialogs.dialogs);
  //   dispatch(sendMessage(2, { body: 'Hello bro!' }));
  console.log('Dialogs >>>>>>');
  return (
    <div>
      <Typography variant='h3' component='span'>
        Dialogs
      </Typography>
      {Object.keys(currentDialogs).map((key) => (
        <>
          <Avatar alt={currentDialogs[key].userName} src={currentDialogs[key].photos.small} />
          <Typography>{currentDialogs[key].userName}</Typography>
        </>
      ))}
    </div>
  );
};

export default Dialogs;
