import { Avatar, Button } from '@mui/material';
import { styled } from '@mui/styles';

export const DeveloperWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '20px',
  marginLeft: '20px',
});

export const DeveloperMainContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const DeveloperBody = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: 800,
});

export const FollowedContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const MessageButton = styled(Button)({
  marginBottom: '10px',
  width: '100px',
});

export const FollowButton = styled(Button)({
  width: '100px',
  height: '40px',
});

export const UnfollowButton = styled(Button)({
  width: '100px',
});

export const UserAvatar = styled(Avatar)({
  width: 80,
  height: 80,
});
