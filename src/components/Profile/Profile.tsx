import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { actions as errorsActions } from '../../redux/actions/ErrorsActions';
import { getUserProfile, getUserStatus, uploadUserPhoto } from '../../redux/actions/ProfileActions';
import { AppStateType } from '../../redux/reducers/rootReducer';
import {
  selectAuthUserId,
  selectCurrentUser,
  selectErrors,
} from '../../redux/selectors/profile-selectors';
import ShowErrorModal from '../common/ErrorModal';
import { ProfileContainer } from './Profile.styled';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type MatchParams = {
  id: string;
};

const Profile: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const authUserID = useSelector(selectAuthUserId);
  const errors = useSelector(selectErrors);
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
    <ProfileContainer>
      <ShowErrorModal errors={errors} resetError={resetError} />
      <ProfileInfo
        profile={currentUser}
        savePhoto={savePhoto}
        isOwner={match?.params.id}
        formErrors={userInfoFormErrors}
        dispatch={dispatch}
      />
    </ProfileContainer>
  );
};

export default Profile;
