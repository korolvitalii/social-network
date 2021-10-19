import { Typography } from '@mui/material';
import React from 'react';

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};
const ContactItem: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <Typography variant='body2' gutterBottom component='span'>
        {contactTitle}: {contactValue}
      </Typography>
      {/* <Typography variant='body2' gutterBottom component='span'>
        {contactValue}
      </Typography> */}
    </div>
  );
};

export default ContactItem;
