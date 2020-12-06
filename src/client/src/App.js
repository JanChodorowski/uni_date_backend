import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { createMuiTheme, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import {Button, Grid, ThemeProvider} from '@material-ui/core';
import logo from './logo.svg';
import {
  login, secret, refresh, register,
} from './api';
import { APP_THEME } from './helpers/constants';

function App() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [isDark, setIsDark] = useState(true);

  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    login(user);
  };

  const handleRegister = () => {
    const user = {
      email,
      password,
      passwordConfirmation,
    };
    register(user);
  };
  const handleSecret = () => {
    secret();
  };
  const handleRefresh = () => {
    refresh();
  };
  const handleLogOut = () => {
    const cookies = new Cookies();

    console.log('getoken', cookies.get('token'));
    cookies.remove('token');
  };

  let chosenTheme = createMuiTheme(isDark ? APP_THEME.dark : APP_THEME.light);
  chosenTheme = responsiveFontSizes(chosenTheme);

  return (
    <ThemeProvider theme={chosenTheme}>
      <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '80vh' }}
      >
        <Grid item>
          Logo
          title
          text
        </Grid>
        <Grid item>
          logowanie
        </Grid>

      </Grid>

          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            value={passwordConfirmation}
            placeholder="passwordConfirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button variant="contained" color="primary">dsa</Button>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSecret}>Secret</button>
          <button onClick={handleRefresh}>Refresh</button>
          <button onClick={handleLogOut}>LogOut</button>
          <button onClick={handleRegister}>Register</button>

    </ThemeProvider>
  );
}

export default App;
