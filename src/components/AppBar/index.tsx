import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { actions } from '../../redux/actions/ProfileActions';
import Logout from '../Login/Logout';
import { selectAuth } from '../../redux/selectors/auth-selectros';
import { selectProfile } from '../../redux/selectors/profile-selectors';
import Avatar from '@mui/material/Avatar';
import { Wrapper } from './styles';
import Stack from '@mui/material/Stack';

const AppBarMenu: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const userData = useSelector(selectProfile);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseWithEditProfileDataMode = () => {
    setAnchorEl(null);
    dispatch(actions.goToEditMode(true));
  };

  return (
    <Wrapper>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <PeopleAltIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Social Network
          </Typography>
          {auth.isAuth && (
            <div>
              <Stack direction='row' alignItems='center'>
                <Typography
                  variant='h6'
                  component='span'
                  sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {auth.login}
                </Typography>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'>
                  <Avatar
                    src={
                      userData?.profile?.photos.small ? userData?.profile?.photos.small : undefined
                    }
                    alt='profile-photo'
                  />
                </IconButton>
              </Stack>

              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    className='nav-link'
                    to='/profile'>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseWithEditProfileDataMode}>Edit profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  <Logout />
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

export default AppBarMenu;
