import { Button } from '@mui/material';
import { styled } from '@mui/styles';

export const SendMessageFormWrapper = styled('div')({
  width: '600px',
});

export const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  marginLeft: '-50px ',
});

export const Form = styled('form')({
  maxWidth: 500,
  margin: '20px auto',
});

export const SendButton = styled(Button)({
  width: '120px',
});
