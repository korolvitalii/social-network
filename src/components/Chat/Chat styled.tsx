import { Paper } from '@mui/material';
import { styled } from '@mui/styles';

export const ChatWrapper = styled('div')({
  marginLeft: '48px',
});

export const ChatItems = styled(Paper)({
  maxHeight: 400,
  width: 900,
  overflow: 'auto',
});
