import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getUserProfile, getUserStatus, uploadUserPhoto } from '../../redux/actions/ProfileActions';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import classes from './Profile.module.css';
import { PhotosType, PostType, ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { AppStateType } from '../../redux/reducers/rootReducer';
import ShowErrorModal from '../common/ShowErrorModal';

type MatchParams = {
  id: string;
};

type PropsType = {
  currentUser: ProfileType;
  status: string;
  authUserID: number;
  formErrors: Array<string>;
  addNewPost: (newPost: PostType) => void;
  removePost: (id: number) => void;
  setUserProfile: (user: ProfileType) => void;
  setUserStatus: (status: string) => void;
  setUserPhoto: (photos: PhotosType) => void;
  setUserInfoFormErrors: (errors: Array<string>) => void;
  resetError: () => void;
  errors: string;
};

const Profile: React.FC<PropsType> = (props) => {
  const { authUserID, currentUser, status, errors, resetError } = props;
  const { userInfoFormErrors } = useSelector((state: AppStateType) => state.profilePage);
  const match = useRouteMatch<MatchParams>('/profile/:id/');
  const dispatch = useDispatch();
  const userId = match?.params.id ? Number(match.params.id) : authUserID;
  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getUserStatus(userId));
  }, [match?.params.id, dispatch, userId]);

  const savePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(uploadUserPhoto(e.target.files[0]));
    }
  };

  return (
    <div className={classes.profileContainer}>
      <ShowErrorModal errors={errors} resetError={resetError} />
      <ProfileInfo
        profile={currentUser}
        status={status}
        savePhoto={savePhoto}
        isOwner={match?.params.id}
        formErrors={userInfoFormErrors}
        dispatch={dispatch}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
