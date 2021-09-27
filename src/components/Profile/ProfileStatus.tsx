import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'redux';
import { updateUserStatus } from '../../redux/actions/ProfileActions';

type PropsType = {
  status: string;
  dispatch: any;
};

const ProfileStatus: React.FC<PropsType> = ({ status, dispatch }) => {
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
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status}</span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            onChange={onChangeStatus}
            onBlur={deactivateEditMode}
            autoFocus={true}
            value={localStatus}
            type='text'
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
