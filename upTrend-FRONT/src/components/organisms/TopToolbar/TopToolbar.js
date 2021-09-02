import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import LogoutButton from 'components/molecules/LogoutButton/LogoutButton';
import SearchInput from 'components/molecules/SearchInput/SearchInput';

const TopToolbar = ({ classes, isOpen, handleToggleDrawer, history }) => {
  const isOnPosts =
    history.location.pathname.includes('/app/posts') ||
    history.location.pathname.includes('/app/liked');
  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, isOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='Open drawer'
          onClick={handleToggleDrawer}
          className={clsx(
            classes.menuButton,
            isOpen && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          className={classes.title}
        >
          upTrend
        </Typography>
        {isOnPosts && <SearchInput />}
        <div>
          <LogoutButton />
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TopToolbar);
