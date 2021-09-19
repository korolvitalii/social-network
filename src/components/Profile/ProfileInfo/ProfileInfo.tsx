import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import userIcon from '../../../assets/images/User-Icon.jpg';

import ProfileStatus from '../ProfileStatus';
import { ProfileType } from '../../../types/types';
import EditProfileInfoForm from './EditProfileInfoForm';
import ProfileData from './ProfileData';

type ProfileInfoProps = {
  profile: ProfileType;
  status: string;
  dispatch: any;
  savePhoto: (e: any) => void;
  isOwner?: string;
  formErrors: Array<string>;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  status,
  dispatch,
  savePhoto,
  isOwner,
  formErrors,
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
          />
        ) : (
          <ProfileData
            isOwner={isOwner}
            goToEditMode={goToEditMode}
            dispatch={dispatch}
            status={status}
            profile={profile}
          />
        )}
        <div>
          <ProfileStatus status={status} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
