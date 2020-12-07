import React, { useState } from "react";
import Cookies from "universal-cookie";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import {
  Button,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import logo from "./logo.svg";
import { login, secret, refresh, register } from "./api";
import { APP_THEME } from "./helpers/constants";
import heart from "./images/heart-rate.png";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
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

    console.log("getoken", cookies.get("token"));
    cookies.remove("token");
  };

  let chosenTheme = createMuiTheme(isDark ? APP_THEME.dark : APP_THEME.light);
  chosenTheme = responsiveFontSizes(chosenTheme);

  return (
    <ThemeProvider theme={chosenTheme}>
      <CssBaseline />

      <Grid
        container
        // spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item style={{ marginRight: "1rem" }}>
          <Paper style={{ padding: "1rem" }}>
            <Grid
              container
              // spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <img src={heart} style={{ width: "10rem", height: "10rem" }} />
              </Grid>
              <Grid item style={{ padding: "1rem" }}>
                <Grid
                  container
                  // spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Typography variant="h1">UNI DATE</Typography>
                  </Grid>
                  <Grid item style={{ padding: "1rem" }}>
                    <Typography style={{ fontSize: "1rem" }}>
                      Dating app for universities students and graduates
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper style={{ padding: "1rem" }}>
            <Login />
          </Paper>
          <br />
          <Paper style={{ padding: "1rem" }}>
            <Register></Register>
          </Paper>
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
      <Button variant="contained" color="primary">
        dsa
      </Button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSecret}>Secret</button>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleLogOut}>LogOut</button>
      <button onClick={handleRegister}>Register</button>
    </ThemeProvider>
  );
}

export default App;
