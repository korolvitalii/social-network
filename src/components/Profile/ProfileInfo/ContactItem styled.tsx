import { Typography } from '@mui/material';
import { styled } from '@mui/styles';

export const ContactItemWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const ContactTitle = styled(Typography)({
  width: '100px',
  marginRight: '30px',
});

export const ContactBody = styled(Typography)({
  color: '#00b3d6',
});
