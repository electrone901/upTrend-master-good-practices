import React, { useState } from 'react';
import {
  Grid,
  Tabs,
  Tab
} from '@material-ui/core';

import logo from 'assets/logo.png';

import Login from './Login';
import { Register } from './Register';
import { useAuthStyles } from './auth.styles';

const Auth = () => {
  const classes = useAuthStyles();
  const [activeTabId, setActiveTabId] = useState(0);
  const handleTabChange = (_e, tabId) => setActiveTabId(tabId);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt='logo' className={classes.logotypeImage} />
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Login' classes={{ root: classes.tab }} />
            <Tab label='New User' classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <Login />
          )}
          {activeTabId === 1 && (
            <Register handleTabChange={handleTabChange} />
          )}
        </div>
      </div>
    </Grid>
  );
};

export default Auth;
