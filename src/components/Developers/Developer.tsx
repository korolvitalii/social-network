import { Avatar, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import userIcon from '../../assets/images/User-Icon.jpg';
import { startChattingThunk } from '../../redux/actions/DialogsActions';
import { followThunk, unfollowThunk } from '../../redux/actions/UsersActions';
import { getIsFollowingProgress } from '../../redux/selectors/user-selectors';
import { PhotosType } from '../../types/types';

type PropsType = {
  id: number;
  name: string;
  followed: boolean;
  photos: PhotosType;
};

const Developer: React.FC<PropsType> = (props) => {
  const {
    id,
    name,
    followed,
    photos: { small },
  } = props;

  const dispatch = useDispatch();
  const isFollowingProgress = useSelector(getIsFollowingProgress);

  const path = `/profile/${id}`;

  const follow = (id: number) => {
    dispatch(followThunk(id));
  };
  const unfollow = (id: number) => {
    dispatch(unfollowThunk(id));
  };

  const handleStartChatting = (id: number) => (e: React.MouseEvent<HTMLElement>) => {
    dispatch(startChattingThunk(id));
  };

  return (
    <Box
      key={id}
      sx={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', marginLeft: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 800,
          }}>
          <NavLink to={path}>
            <Avatar alt={name} src={small ? small : userIcon} sx={{ width: 80, height: 80 }} />
          </NavLink>
          {followed ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button
                variant='outlined'
                sx={{ marginBottom: '10px', width: '100px' }}
                onClick={handleStartChatting(id)}>
                Message
              </Button>
              <Button
                variant='outlined'
                disabled={isFollowingProgress}
                sx={{ width: '100px' }}
                onClick={() => {
                  unfollow(id);
                }}>
                UNFOLLOW
              </Button>
            </Box>
          ) : (
            <Button
              variant='outlined'
              disabled={isFollowingProgress}
              sx={{ height: '40px', width: '100px' }}
              onClick={() => {
                follow(id);
              }}>
              FOLLOW
            </Button>
          )}
        </Box>
        <Typography variant='h6' gutterBottom component='div'>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default Developer;
