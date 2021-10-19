import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ContactsType, ProfileType } from '../../../types/types';
import ContactItem from './ContactItem';
import classes from './ProfileInfo.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ProfileStatus from '../ProfileStatus';

type ProfileDataProps = {
  isOwner?: string;
  profile: ProfileType | null;
  goToEditMode: (editMode: boolean) => void;
};

const ProfileData: React.FunctionComponent<ProfileDataProps> = ({
  profile,
  goToEditMode,
  isOwner,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={classes.profileDescription}>
      <Typography variant='h4' gutterBottom component='div' sx={{ color: 'black' }}>
        {profile?.fullName}
      </Typography>
      <ProfileStatus dispatch={dispatch} />
      <Typography variant='h6' gutterBottom component='div'>
        About me:
        <Typography variant='body2' gutterBottom sx={{ color: '' }}>
          {profile?.aboutMe}
        </Typography>
      </Typography>

      <div>
        <Typography variant='h6' gutterBottom component='div'>
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
      </div>

      <div>
        <Typography variant='h6' gutterBottom component='span'>
          Looking for job:
          {profile?.lookingForAJob ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 25 }} />
          ) : (
            <DoNotDisturbIcon />
          )}
        </Typography>
      </div>
      {profile?.lookingForAJob && (
        <div>
          <Typography variant='h6' gutterBottom component='span'>
            Skills:
          </Typography>
          <Typography variant='body2' gutterBottom sx={{ color: '' }}>
            {profile.lookingForAJobDescription}
          </Typography>
        </div>
      )}
      {/* {!isOwner && (
        <Box sx={{ marginLeft: 50 }}>
          <EditIcon onClick={() => dispatch(goToEditMode(true))} />
          <Typography component={'span'}>Edit</Typography>
        </Box>
      )} */}
    </div>
  );
};

export default ProfileData;
