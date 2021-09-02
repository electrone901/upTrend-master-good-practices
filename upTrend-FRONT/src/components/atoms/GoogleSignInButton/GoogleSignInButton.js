import React from 'react';

import { Button } from '@material-ui/core';

import google from 'assets/google.svg';

import { useGoogleSignInStyles } from './googleSignIn.styles';

const GoogleSignInButton = ({ size, className }) => {
  const classes = useGoogleSignInStyles();
  return (
    <Button
      size={size}
      className={className}
      href={`${process.env.REACT_APP_API_URL}/auth/google`}
    >
      <img
        src={google}
        alt='google'
        className={classes.googleIcon}
      />
    &nbsp;Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
