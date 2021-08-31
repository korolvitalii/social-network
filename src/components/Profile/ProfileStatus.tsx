import React, { useState } from 'react';
import { useEffect } from 'react';

type PropsType = {
  status: string;
};

const ProfileStatus: React.FC<PropsType> = (props) => {
  const { status } = props;
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onChangeStatus = (e: any) => {
    setLocalStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={toggleEditMode}>{status}</span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            onChange={onChangeStatus}
            onBlur={toggleEditMode}
            autoFocus={true}
            value={status}
            type='text'
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
