import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import userIcon from '../../assets/images/User-Icon.jpg';
import { startChattingThunk } from '../../redux/actions/DialogsActions';
import { followThunk, unfollowThunk } from '../../redux/actions/UsersActions';
import { getIsFollowingProgress } from '../../redux/selectors/user-selectors';
import { PhotosType } from '../../types/types';
import {
  DeveloperBody,
  DeveloperMainContainer,
  DeveloperWrapper,
  FollowButton,
  FollowedContainer,
  MessageButton,
  UnfollowButton,
  UserAvatar
} from './Developer styled';

type PropsType = {
  id: number;
  name: string;
  followed: boolean;
  photos: PhotosType;
};

const Developer: React.FC<PropsType> = (props): React.ReactElement => {
  const {
    id,
    name,
    followed,
    photos: { small },
  } = props;

  const dispatch = useDispatch();
  const isFollowingProgress = useSelector(getIsFollowingProgress);

  const path = `/profile/${id}`;

  const follow = (id: number): void => {
    dispatch(followThunk(id));
  };
  const unfollow = (id: number): void => {
    dispatch(unfollowThunk(id));
  };

  const handleStartChatting = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
    dispatch(startChattingThunk(id));
  };

  return (
    <DeveloperWrapper key={id}>
      <DeveloperMainContainer>
        <DeveloperBody>
          <NavLink to={path}>
            <UserAvatar alt={name} src={small ? small : userIcon} />
          </NavLink>
          {followed ? (
            <FollowedContainer>
              <MessageButton variant='outlined' onClick={handleStartChatting(id)}>
                Message
              </MessageButton>
              <UnfollowButton
                variant='outlined'
                disabled={isFollowingProgress}
                onClick={() => {
                  unfollow(id);
                }}>
                UNFOLLOW
              </UnfollowButton>
            </FollowedContainer>
          ) : (
            <FollowButton
              variant='outlined'
              disabled={isFollowingProgress}
              onClick={() => {
                follow(id);
              }}>
              FOLLOW
            </FollowButton>
          )}
        </DeveloperBody>
        <Typography variant='h6' gutterBottom component='div'>
          {name}
        </Typography>
      </DeveloperMainContainer>
    </DeveloperWrapper>
  );
};

export default Developer;
