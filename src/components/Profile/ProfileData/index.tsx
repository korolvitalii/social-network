import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Stack, Typography } from '@mui/material';
import { selectStatus } from '../../../redux/selectors/profile-selectors';
import { ContactsType, ProfileType } from '../../../types/types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ProfileStatus from '../ProfileStatus';
import { Wrapper } from './styles';
import ContactItem from '../Contact';

interface ProfileDataProps {
  isOwner?: string;
  profile: ProfileType | null;
  goToEditMode: (editMode: boolean) => void;
}

const ProfileData: React.FC<ProfileDataProps> = ({ profile }) => {
  const status = useSelector(selectStatus);

  return (
    <Wrapper>
      <div className='fullname-status-block'>
        <Typography variant='h4' className=''>
          {profile?.fullName}
        </Typography>
        <ProfileStatus status={status} />
      </div>

      <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />

      <div className='info-item'>
        <div className='info-item-type'>Looking for job:</div>
        <div className='info-item-description'>
          {profile?.lookingForAJob ? (
            <CheckCircleOutlineIcon className='check-circle-icon' />
          ) : (
            <DoNotDisturbIcon className='dont-disturb-icon' />
          )}
        </div>
      </div>

      <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />
      <Stack className='info-items'>
        <div className='info-item'>
          <div className='info-item-type'>About:</div>
          <div className='info-item-description'>{profile?.aboutMe}</div>
        </div>
        <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />

        <div className='info-item'>
          {profile?.lookingForAJob && <div className='info-item-type'> Skills:</div>}
          <div className='info-item-description'>{profile?.lookingForAJobDescription}</div>
        </div>
      </Stack>

      <div>
        {profile &&
          Object.keys(profile.contacts).map((key) => {
            return (
              <React.Fragment key={key}>
                <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />
                <ContactItem
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof ContactsType]}
                />
              </React.Fragment>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default ProfileData;
