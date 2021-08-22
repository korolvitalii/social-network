import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MyPosts from '../components/MyPosts/MyPosts';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import { RootStateType } from '../types/types';

const Profile: React.FC = () => {
  const { currentUser } = useSelector((state: RootStateType) => state.profilePage);
  return (
    <>
      <div>
        <ProfileInfo user={currentUser} />
      </div>
      <div>
        <MyPosts />
      </div>
    </>
  );
};

export default Profile;
