import React from 'react';
import { useSelector } from 'react-redux';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { getIsFetchProfile } from '../redux/selectors/profile-selectors';
import Preloader from '../components/common/Preloader/Preloader';
import Profile from '../components/Profile/Profile';

const ProfilePage: React.FC = (): React.ReactElement => {
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
