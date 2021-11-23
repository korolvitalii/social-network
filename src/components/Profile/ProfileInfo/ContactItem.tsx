import React from 'react';
import { ContactItemWrapper, ContactTitle, ContactBody } from './ContactItem styled';

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};
const ContactItem: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}): React.ReactElement => {
  return (
    <ContactItemWrapper>
      <ContactTitle>{contactTitle}:</ContactTitle>
      <ContactBody>{contactValue}</ContactBody>
    </ContactItemWrapper>
  );
};

export default ContactItem;
