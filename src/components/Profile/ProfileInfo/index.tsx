import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import userIcon from '../../../assets/images/User-Icon.jpg';
import { actions } from '../../../redux/actions/ProfileActions';
import {
  selectIsLoadPhoto,
  selectEditProfileDataMode,
} from '../../../redux/selectors/profile-selectors';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';

import EditProfileInfoForm from '../EditProfileDataModal';
import ProfileData from '../ProfileData';
import { Wrapper } from './styles';
import { Button, Stack } from '@mui/material';

interface ProfileInfoProps {
  profile: ProfileType | null;
  savePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner?: string;
  formErrors: Array<string>;
  dispatch: Dispatch;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, isOwner, formErrors }) => {
  const dispatch = useDispatch();
  const editProfileDataMode = useSelector(selectEditProfileDataMode);
  const isLoadPhoto = useSelector(selectIsLoadPhoto);

  const handleEditProfileData = () => {
    dispatch(actions.goToEditMode(true));
  };

  return (
    <Wrapper>
      <div className='desctiption-section'>
        <Stack>
          {!isLoadPhoto ? (
            <Preloader />
          ) : (
            <img
              className='profile-photo'
              src={profile?.photos?.large ? profile.photos.large : userIcon}
              alt=''
            />
          )}
          {!isOwner && (
            <Button
              className='edit-profile-data'
              onClick={handleEditProfileData}
              variant='outlined'>
              Edit
            </Button>
          )}
        </Stack>
      </div>
      <div>
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
            <ProfileData isOwner={isOwner} goToEditMode={actions.goToEditMode} profile={profile} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ProfileInfo;
