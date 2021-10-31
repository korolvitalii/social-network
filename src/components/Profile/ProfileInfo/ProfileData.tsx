import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { Box, Divider, Typography } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../redux/reducers/rootReducer';
import { getStatus } from '../../../redux/selectors/profile-selectors';
import { ContactsType, ProfileType } from '../../../types/types';
import ProfileStatus from '../ProfileStatus';
import ContactItem from './ContactItem';

type PropsType = {
  isOwner?: string;
  profile: ProfileType | null;
  goToEditMode: (editMode: boolean) => void;
};

const ProfileData: React.FC<PropsType> = ({ profile }) => {
  const status = useSelector(getStatus);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '20px 20px 20px 20px',
        marginTop: '60px',
        height: '400px',
        width: '600px',
      }}>
      <Typography variant='h4' gutterBottom component='span' sx={{ color: 'black' }}>
        {profile?.fullName}
      </Typography>
      <ProfileStatus status={status} />
      <Divider variant='fullWidth' sx={{ marginBottom: '20px' }} />
      <Box component='div' sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
        <Typography gutterBottom component='span'>
          About:
        </Typography>
        <Typography component='div' variant='body2' sx={{ color: '#00b3d6', marginLeft: '85px' }}>
          {profile?.aboutMe}
        </Typography>
      </Box>

      <Box component='div' sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
        <Typography gutterBottom component='span'>
          Looking for job:
        </Typography>
        <Typography component='div'>
          {profile?.lookingForAJob ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 22, marginLeft: '15px', color: '#00b3d6' }} />
          ) : (
            <DoNotDisturbIcon sx={{ fontSize: 22, marginLeft: '10px', color: '#00b3d6' }} />
          )}
        </Typography>
      </Box>
      {profile?.lookingForAJob && (
        <Box component='div' sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
          <Typography gutterBottom component='span'>
            Skills:
          </Typography>
          <Typography variant='body2' gutterBottom sx={{ marginLeft: '85px', color: '#00b3d6' }}>
            {profile.lookingForAJobDescription}
          </Typography>
        </Box>
      )}

      <Box sx={{ marginBottom: '20px' }}>
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
      </Box>
    </Box>
  );
};

export default ProfileData;
