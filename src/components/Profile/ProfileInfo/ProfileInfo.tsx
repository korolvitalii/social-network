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
import {
  DecriptionBody,
  DescriptionContainer,
  EditDataButton,
  ProfileInfoWrapper,
  ProfilePhoto,
} from '../Profile.styled';
import EditProfileInfoForm from './EditProfileInfoForm';
import ProfileData from './ProfileData';

type ProfileInfoProps = {
  profile: ProfileType | null;
  savePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner?: string;
  formErrors: Array<string>;
  dispatch: Dispatch;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profile,
  isOwner,
  formErrors,
}): React.ReactElement => {
  const editProfileDataMode = useSelector(selectEditProfileDataMode);
  const isLoadPhoto = useSelector(selectIsLoadPhoto);

  const dispatch = useDispatch();
  const handleEditProfileData = () => {
    dispatch(actions.goToEditMode(true));
  };

  return (
    <ProfileInfoWrapper>
      <DescriptionContainer>
        <DecriptionBody>
          {!isLoadPhoto ? (
            <Preloader />
          ) : (
            <ProfilePhoto
              src={profile?.photos?.large ? profile.photos.large : userIcon}
              alt='User profile photo'
            />
          )}
          {!isOwner && (
            <EditDataButton onClick={handleEditProfileData} variant='outlined'>
              Edit
            </EditDataButton>
          )}
        </DecriptionBody>
      </DescriptionContainer>
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
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
