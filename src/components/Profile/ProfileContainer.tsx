import React from 'react';
import { useSelector } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { getIsFetchProfile } from '../../redux/selectors/profile-selectors';
import Preloader from '../common/Preloader/Preloader';
import Profile from './Profile';

const ProfilePage: React.FC = (props) => {
  const isFetchProfile = useSelector(getIsFetchProfile);
  return (
    <>
      {!isFetchProfile && <Preloader />}
      <Profile />
    </>
  );
};

const ProfilePageWithRedirect = withAuthRedirect(ProfilePage);

export default ProfilePageWithRedirect;
