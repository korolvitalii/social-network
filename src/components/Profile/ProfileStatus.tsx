import React, { useState } from 'react';

type PropsType = {};

const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={toggleEditMode}>asdasd</span>
        </div>
      )}

      {editMode && (
        <div>
          <input onBlur={toggleEditMode} autoFocus={true} value='hey' type='text' />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
