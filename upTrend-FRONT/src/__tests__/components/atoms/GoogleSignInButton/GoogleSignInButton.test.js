
import React from 'react';
import { render } from '@testing-library/react';
import GoogleSignInButton from 'components/atoms/GoogleSignInButton/GoogleSignInButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes, { overrides } from 'themes';

const theme = createMuiTheme({ ...themes.default, ...overrides });

test('renders Google Sign In Button', () => {
  const signInText = 'Sign in with Google';
  const { getByText } = render(
    <MuiThemeProvider theme={theme}>
      <GoogleSignInButton
        size='large'
      />
    </MuiThemeProvider>
  );
  expect(document.querySelector('a').getAttribute('href')).toBe(
    `${process.env.REACT_APP_API_URL}/auth/google`
  );
  expect(getByText(signInText)).toBeInTheDocument();
});
