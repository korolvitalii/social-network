import { Avatar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import userIcon from '../../../assets/images/User-Icon.jpg';
import { startChattingThunk } from '../../../redux/actions/DialogsActions';
import { followThunk, unfollowThunk } from '../../../redux/actions/UsersActions';
import { selectIsFollowingProgress } from '../../../redux/selectors/user-selectors';
import { PhotosType } from '../../../types/types';

import { Wrapper } from './styles';

interface PropsInterface {
  id: number;
  name: string;
  followed: boolean;
  photos: PhotosType;
}

const Developer: React.FC<PropsInterface> = (props) => {
  const {
    id,
    name,
    followed,
    photos: { small },
  } = props;

  const dispatch = useDispatch();
  const isFollowingProgress = useSelector(selectIsFollowingProgress);

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
    <Wrapper key={id}>
      <div className='user-container'>
        <NavLink to={path}>
          <Avatar className='user-avatar' alt={name} src={small ? small : userIcon} />
        </NavLink>
        {followed ? (
          <div className='button-container'>
            <Button variant='outlined' onClick={handleStartChatting(id)}>
              Message
            </Button>
            <Button
              variant='outlined'
              disabled={isFollowingProgress}
              onClick={() => {
                unfollow(id);
              }}>
              UNFOLLOW
            </Button>
          </div>
        ) : (
          <Button
            className='follow-button'
            variant='outlined'
            disabled={isFollowingProgress}
            onClick={() => {
              follow(id);
            }}>
            FOLLOW
          </Button>
        )}
      </div>
      <Typography className='user-fullname' variant='h6' gutterBottom component='div'>
        {name}
      </Typography>
    </Wrapper>
  );
};

export default Developer;
