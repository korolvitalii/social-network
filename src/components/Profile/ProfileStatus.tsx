import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from '../../redux/actions/ProfileActions';

type PropsType = {
  status: string;
};

const ProfileStatus: React.FC<PropsType> = ({ status }) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);
  const dispatch = useDispatch();
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
