import { Divider, Typography } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectStatus } from '../../../redux/selectors/profile-selectors';
import { ContactsType, ProfileType } from '../../../types/types';
import {
  CheckIcon,
  ContactsBlock,
  DontDisturbIcon,
  LookingForAJobDescription,
  ProfileDataDescriptionItem,
  ProfileDataWrapper,
  TypographyAboutMe,
} from '../Profile.styled';
import ProfileStatus from '../ProfileStatus';
import ContactItem from './ContactItem';

type PropsType = {
  isOwner?: string;
  profile: ProfileType | null;
  goToEditMode: (editMode: boolean) => void;
};

const ProfileData: React.FC<PropsType> = ({ profile }): React.ReactElement => {
  const status = useSelector(selectStatus);

  return (
    <ProfileDataWrapper>
      <Typography variant='h4' gutterBottom component='span' sx={{ color: 'black' }}>
        {profile?.fullName}
      </Typography>
      <ProfileStatus status={status} />
      <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />
      <ProfileDataDescriptionItem>
        <Typography gutterBottom component='span'>
          About:
        </Typography>
        <TypographyAboutMe variant='body2'>{profile?.aboutMe}</TypographyAboutMe>
      </ProfileDataDescriptionItem>

      <ProfileDataDescriptionItem>
        <Typography gutterBottom component='span'>
          Looking for job:
        </Typography>
        <Typography component='div'>
          {profile?.lookingForAJob ? <CheckIcon /> : <DontDisturbIcon />}
        </Typography>
      </ProfileDataDescriptionItem>
      {profile?.lookingForAJob && (
        <ProfileDataDescriptionItem>
          <Typography gutterBottom component='span'>
            Skills:
          </Typography>
          <LookingForAJobDescription variant='body2' gutterBottom>
            {profile.lookingForAJobDescription}
          </LookingForAJobDescription>
        </ProfileDataDescriptionItem>
      )}

      <ContactsBlock>
        <Typography component='div' gutterBottom>
          Contacts:
        </Typography>
        {profile &&
          Object.keys(profile.contacts).map((key) => {
            return (
              <ContactItem
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key as keyof ContactsType]}
              />
            );
          })}
      </ContactsBlock>
    </ProfileDataWrapper>
  );
};

export default ProfileData;
