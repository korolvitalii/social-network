import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from '../../redux/actions/ProfileActions';
import { ProfileStatusDescription } from './Profile.styled';

type PropsType = {
  status: string;
};

const ProfileStatus: React.FC<PropsType> = ({ status }): React.ReactElement => {
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
        <ProfileStatusDescription
          data-testid='profile-status-span'
          onDoubleClick={activateEditMode}>
          {status}
        </ProfileStatusDescription>
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
