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
import BtmNav from "./components/BtmNav";

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
      <br/>
      <Grid
        container
        // spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item style={{ marginRight: "1rem", marginLeft: "1rem"  }}>
          <Paper style={{ padding: "1rem" ,marginBottom: '1rem'}}>
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
                    <Typography variant="h1" style={{lineHeight: "80%"}}>UNI DATE</Typography>
                  </Grid>
                  <Grid item style={{ padding: "1rem" }}>
                    <Typography style={{ fontSize: "1rem" }}>
                      Dating app for universities students & graduates
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
      <br/>
      <br/>
      <br/>
      <br/>
      <BtmNav></BtmNav>
    </ThemeProvider>
  );
}

export default App;
