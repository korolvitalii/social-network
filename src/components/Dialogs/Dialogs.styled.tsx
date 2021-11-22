import { Paper } from '@mui/material';
import { styled } from '@mui/styles';

export const DialogsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  margin: '30px 0 0 0',
});

export const DialogsBody = styled(Paper)({
  maxHeight: 400,
  width: 250,
  overflow: 'auto',
});

export const UserDialog = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

export const MessagesContainer = styled('div')({
  margin: '0 0 0 50px',
});
