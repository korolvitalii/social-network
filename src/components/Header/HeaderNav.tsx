import AccountCircle from '@mui/icons-material/AccountCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actions } from '../../redux/actions/ProfileActions';
import Logout from '../Login/Logout';

type PropsType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean | null;
};

const HeaderNav: React.FC<PropsType> = ({ isAuth, login }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <PeopleAltIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Social Network
          </Typography>
          {isAuth && (
            <div>
              <Typography variant='h6' component='span' sx={{ flexGrow: 1 }}>
                {login}
              </Typography>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'>
                <AccountCircle />
              </IconButton>
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
                  <NavLink to='/profile'>Profile</NavLink>
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
    </Box>
  );
};

export default HeaderNav;
