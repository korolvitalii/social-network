import * as React from 'react';
import { ContactsType, ProfileType } from '../../../types/types';
import ContactItem from './ContactItem';
import classes from './ProfileInfo.module.css';

type ProfileDataProps = {
  isOwner?: string;
  profile: ProfileType | null;
  goToEditMode: () => void;
};

const ProfileData: React.FunctionComponent<ProfileDataProps> = ({
  profile,
  goToEditMode,
  isOwner,
}) => {
  return (
    <div className={classes.profileDescription}>
      <h2> Fullname: {profile?.fullName}</h2>
      <h3>About me: {profile?.aboutMe}</h3>
      <div>
        Looking for job:
        {profile?.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {profile?.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <h3>Contacts</h3>
        <div>
          {profile &&
            Object.keys(profile.contacts).map((key) => {
              return (
                <ContactItem
                  key={key}
                  contactTitle={key}
                  contactValue={profile.contacts[key as keyof ContactsType]}
                />
              );
            })}
        </div>
      </div>
      {!isOwner && (
        <button type='button' onClick={goToEditMode}>
          Edit
        </button>
      )}
    </div>
  );
};

export default ProfileData;
