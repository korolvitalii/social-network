import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStatus } from '../../redux/actions/ProfileActions';
import { getStatus } from '../../redux/selectors/profile-selectors';
import classes from './ProfileStatus.module.css';

type PropsType = {
  dispatch: any;
};

const ProfileStatus: React.FC<PropsType> = ({ dispatch }) => {
  const [editMode, setEditMode] = useState(false);
  const status = useSelector(getStatus);
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
        <span className={classes.spanProfileStatus} onDoubleClick={activateEditMode}>
          {status}
        </span>
      )}

      {editMode && (
        <input
          onChange={onChangeStatus}
          onBlur={deactivateEditMode}
          autoFocus={true}
          value={localStatus}
          type='text'
        />
      )}
    </>
  );
};
export default ProfileStatus;
