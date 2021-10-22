import { Box, Typography } from '@mui/material';
import React from 'react';

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};
const ContactItem: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <Box component='div' sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography noWrap={true} variant='subtitle2' sx={{ width: '100px', marginRight: '30px' }}>
        {contactTitle}:
      </Typography>
      <Typography variant='body2' gutterBottom component='span' sx={{ color: '#00b3d6' }}>
        {contactValue}
      </Typography>
    </Box>
  );
};

export default ContactItem;
