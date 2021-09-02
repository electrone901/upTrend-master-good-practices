import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Sidebar from 'components/organisms/Sidebar/Sidebar';
import TopToolbar from 'components/organisms/TopToolbar/TopToolbar';
import { PrivateRoute } from 'utils/HOCs/PrivateRoute/PrivateRoute';

import Profile from './Profile/Profile';
import Posts from './Posts/Posts';
import LikedPosts from './LikedPosts/LikedPosts';
import Users from './Users/Users';
import { useDashboardStyles } from './dashboard.styles';
import Error404 from '../Error/Error404';

const Dashboard = () => {
  const classes = useDashboardStyles();
  const [isOpen, setToggleDrawer] = useState(false);
  const handleToggleDrawer = () => {
    setToggleDrawer(prevState => !prevState);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <TopToolbar
          isOpen={isOpen}
          handleToggleDrawer={handleToggleDrawer}
          classes={classes}
        />
        <Sidebar
          isOpen={isOpen}
          handleToggleDrawer={handleToggleDrawer}
          classes={classes}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <PrivateRoute exact path='/app/posts' component={Posts} />
            <PrivateRoute exact path='/app/liked' component={LikedPosts} />
            <PrivateRoute exact path='/app/users' component={Users} />
            <PrivateRoute exact path='/app/profile' component={Profile} />
            <PrivateRoute component={Error404} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Dashboard;
