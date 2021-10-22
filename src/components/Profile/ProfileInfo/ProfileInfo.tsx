import { Button, styled } from '@mui/material';
import { blue, purple } from '@mui/material/colors';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import userIcon from '../../../assets/images/User-Icon.jpg';
import { actions } from '../../../redux/actions/ProfileActions';
import { AppStateType } from '../../../redux/reducers/rootReducer';
import { getIsLoadPhoto } from '../../../redux/selectors/profile-selectors';
import { ProfileType } from '../../../types/types';
import Preloader from '../../common/Preloader/Preloader';
import EditProfileInfoForm from './EditProfileInfoForm';
import ProfileData from './ProfileData';
import classes from './ProfileInfo.module.css';

type ProfileInfoProps = {
  profile: ProfileType | null;
  savePhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  isOwner?: string;
  formErrors: Array<string>;
  dispatch: Dispatch;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, savePhoto, isOwner, formErrors }) => {
  const editProfileDataMode = useSelector(
    (state: AppStateType) => state.profilePage.editProfileDataMode,
  );

  const isLoadPhoto = useSelector(getIsLoadPhoto);

  const EditDataButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[300]),
    '&:hover': {
      backgroundColor: blue[100],
    },
  }));
  const dispatch = useDispatch();
  const handleEditProfileData = () => {
    // setAnchorEl(null);
    dispatch(actions.goToEditMode(true));
  };
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
            <EditDataButton onClick={handleEditProfileData} variant='outlined'>
              Edit
            </EditDataButton>
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
          <ProfileData isOwner={isOwner} goToEditMode={actions.goToEditMode} profile={profile} />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
