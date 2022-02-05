import React from 'react';
import { useSelector } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { selectIsFetchProfile } from '../../redux/selectors/profile-selectors';
import Preloader from '../../components/common/Preloader/Preloader';
import Profile from '../../components/Profile/ProfileContainer';

const ProfilePage: React.FC = (): React.ReactElement => {
  const isFetchProfile = useSelector(selectIsFetchProfile);
  return (
    <>
      {!isFetchProfile && <Preloader />}
      <Profile />
    </>
  );
};

const ProfilePageWithRedirect = withAuthRedirect(ProfilePage);

export default ProfilePageWithRedirect;
