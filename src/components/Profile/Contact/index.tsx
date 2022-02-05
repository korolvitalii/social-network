import React from 'react';
import { Wrapper } from './styles';

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};
const ContactItem: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}): React.ReactElement => {
  return (
    <Wrapper>
      <div className='info-item-type'>{contactTitle}:</div>
      <div className='info-item-description'>{contactValue}</div>
    </Wrapper>
  );
};

export default ContactItem;
