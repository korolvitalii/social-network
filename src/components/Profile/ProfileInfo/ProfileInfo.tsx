import React, { ChangeEvent, useState } from 'react';
import classes from './ProfileInfo.module.css';
import userIcon from '../../../assets/images/User-Icon.jpg';

import ProfileStatus from '../ProfileStatus';
import { ProfileType } from '../../../types/types';
import EditProfileInfoForm from './EditProfileInfoForm';
import ProfileData from './ProfileData';
import { Dispatch } from 'redux';

type ProfileInfoProps = {
  profile: ProfileType;
  status: string;
  savePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner?: string;
  formErrors: Array<string>;
  dispatch: Dispatch;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  status,
  savePhoto,
  isOwner,
  formErrors,
  dispatch,
}) => {
  const [editMode, setEditMode] = useState(false);
  const goToEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={classes.profileInfo}>
      <div className={classes.description}>
        <div>
          <img
            className={classes.avatarPhoto}
            src={profile?.photos?.large ? profile.photos.large : userIcon}
            alt=''
          />
          {!isOwner && (
            <div>
              <input
                type='file'
                name='file'
                id='file'
                className={classes.inputfile}
                onChange={savePhoto}
              />
              <label htmlFor='file'>Upload photo</label>
            </div>
          )}
        </div>
        {editMode ? (
          <EditProfileInfoForm
            userId={profile.userId}
            handleButtonClick={goToEditMode}
            editMode={editMode}
            formErrors={formErrors}
            fullName={profile.fullName}
            aboutMe={profile.aboutMe}
            contacts={profile.contacts}
            lookingForAJob={profile.lookingForAJob}
            lookingForAJobDescription={profile.lookingForAJobDescription}
            dispatch={dispatch}
          />
        ) : (
          <ProfileData isOwner={isOwner} goToEditMode={goToEditMode} profile={profile} />
        )}
        <div>
          <ProfileStatus status={status} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
