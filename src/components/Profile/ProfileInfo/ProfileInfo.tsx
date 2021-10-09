import React, { ChangeEvent } from 'react';
import classes from './ProfileInfo.module.css';
import userIcon from '../../../assets/images/User-Icon.jpg';

import ProfileStatus from '../ProfileStatus';
import { ProfileType } from '../../../types/types';
import EditProfileInfoForm from './EditProfileInfoForm';
import ProfileData from './ProfileData';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';
import { getIsLoadPhoto } from '../../../redux/selectors/profile-selectors';
import Preloader from '../../common/Preloader/Preloader';
import { AppStateType } from '../../../redux/reducers/rootReducer';
import { actions } from '../../../redux/actions/ProfileActions';
type ProfileInfoProps = {
  profile: ProfileType | null;
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
  const editProfileDataMode = useSelector(
    (state: AppStateType) => state.profilePage.editProfileDataMode,
  );

  const isLoadPhoto = useSelector(getIsLoadPhoto);

  return (
    <div className={classes.profileInfo}>
      <div className={classes.description}>
        <div className={classes.photoWithButton}>
          {!isLoadPhoto ? (
            <Preloader />
          ) : (
            <img
              className={classes.avatarPhoto}
              src={profile?.photos?.large ? profile.photos.large : userIcon}
              alt=''
            />
          )}
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
      </div>
      {editProfileDataMode ? (
        <EditProfileInfoForm
          userId={profile?.userId}
          goToEditMode={actions.goToEditMode}
          formErrors={formErrors}
          fullName={profile?.fullName}
          aboutMe={profile?.aboutMe}
          contacts={profile?.contacts}
          lookingForAJob={profile?.lookingForAJob}
          lookingForAJobDescription={profile?.lookingForAJobDescription}
        />
      ) : (
        <div>
          <ProfileStatus status={status} dispatch={dispatch} />
          <ProfileData isOwner={isOwner} goToEditMode={actions.goToEditMode} profile={profile} />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
