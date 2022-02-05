import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserStatus } from '../../../redux/actions/ProfileActions';
import { Wrapper } from './styles';

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
    <Wrapper>
      {!editMode && (
        <div data-testid='profile-status-span' className='status' onDoubleClick={activateEditMode}>
          {status}
        </div>
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
    </Wrapper>
  );
};
export default ProfileStatus;
