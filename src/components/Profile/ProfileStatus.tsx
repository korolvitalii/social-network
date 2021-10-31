import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from '../../redux/actions/ProfileActions';
import classes from './ProfileStatus.module.css';

type PropsType = {
  status: string;
};

const ProfileStatus: React.FC<PropsType> = ({ status }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);
  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateUserStatus(localStatus));
  };
  const activateEditMode = () => {
    setEditMode(true);
  };

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalStatus(e.currentTarget.value);
  };

  return (
    <>
      {!editMode && (
        <span
          className={classes.spanProfileStatus}
          data-testid='profile-status-span'
          onDoubleClick={activateEditMode}>
          {status}
        </span>
      )}

      {editMode && (
        <input
          onChange={onChangeStatus}
          onBlur={deactivateEditMode}
          data-testid='profile-status-input'
          autoFocus={true}
          value={localStatus}
          type='text'
        />
      )}
    </>
  );
};
export default ProfileStatus;
