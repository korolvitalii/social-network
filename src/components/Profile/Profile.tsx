import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { actions as errorsActions } from '../../redux/actions/ErrorsActions';
import { getUserProfile, getUserStatus, uploadUserPhoto } from '../../redux/actions/ProfileActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import {
  getAuthUserId,
  getCurrentUser,
  getErrors,
  getStatus,
} from '../../redux/selectors/profile-selectors';
import ShowErrorModal from '../common/ShowErrorModal';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type MatchParams = {
  id: string;
};

type PropsType = {};

const Profile: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const status = useSelector(getStatus);
  const authUserID = useSelector(getAuthUserId);
  const errors = useSelector(getErrors);
  const { userInfoFormErrors } = useSelector((state: AppStateType) => state.profilePage);
  const match = useRouteMatch<MatchParams>('/profile/:id/');
  const userId = match?.params.id ? Number(match.params.id) : authUserID;

  const resetError = () => errorsActions.resetError();

  useEffect(() => {
    dispatch(getUserProfile(userId as number));
    dispatch(getUserStatus(userId as number));
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
