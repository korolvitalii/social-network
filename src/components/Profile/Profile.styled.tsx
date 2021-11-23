import { Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { styled } from '@mui/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

export const ProfileContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const ProfileStatusDescription = styled('span')({
  display: 'flex',
  alignItems: 'flex-start',
  color: 'gray',
  paddingBottom: '20px',
});

export const EditDataButton = styled(Button)(({ theme }) => ({
  color: blue[300],
  '&:hover': {
    backgroundColor: blue[100],
  },
}));

export const ProfileInfoWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: '20px',
  marginTop: '20px',
  alignItems: 'flex-start',
});

export const DescriptionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const DecriptionBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 150,
});

export const ProfilePhoto = styled('img')({
  width: 200,
  height: 200,
  marginBottom: 20,
});

export const ProfileDataWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  padding: '20px 20px 20px 20px',
  marginTop: '60px',
  height: '400px',
  width: '600px',
});

export const ProfileDataDescriptionItem = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '20px',
});

export const TypographyAboutMe = styled(Typography)({
  color: '#00b3d6',
  marginLeft: '85px',
});

export const CheckIcon = styled(CheckCircleOutlineIcon)({
  fontSize: 22,
  marginLeft: '15px',
  color: '#00b3d6',
});

export const DontDisturbIcon = styled(DoNotDisturbIcon)({
  fontSize: 22,
  marginLeft: '10px',
  color: '#00b3d6',
});

export const ContactsBlock = styled('div')({
  marginBottom: '20px',
});

export const LookingForAJobDescription = styled(Typography)({
  marginLeft: '85px',
  color: '#00b3d6',
});
