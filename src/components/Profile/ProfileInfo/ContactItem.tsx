import React from 'react';

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};
const ContactItem: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ContactItem;
