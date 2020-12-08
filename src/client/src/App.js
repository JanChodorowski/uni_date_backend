import React, { useState, useEffect } from "react";
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
import { login, secret, refresh, register, getUserData } from "./api";
import {
  APP_THEME,
  getItemByKey,
  LOCAL_STORAGE_KEY,
  THEME_NAMES,
} from "./helpers/constants";
import heart from "./images/heart-rate.png";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import BtmNav from "./components/BtmNav";
import ColorBtn from "./components/ColorBtn";
import { ColorContext } from "./context/colorContext";
import { UserContext } from "./context/userContext";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    let mounted = true;
    setIsDark(getItemByKey(LOCAL_STORAGE_KEY.theme) !== THEME_NAMES.light);
    const setUserDataFromApi = async () => {
      const userData = await getUserData();
      if (userData.data && mounted) {
        setUser(userData.data);
      }
    };
    try {
      setUserDataFromApi();
    } catch {}
    return () => (mounted = false);
  }, []);

  let chosenTheme = createMuiTheme(isDark ? APP_THEME.dark : APP_THEME.light);
  chosenTheme = responsiveFontSizes(chosenTheme);

  return (
    <ThemeProvider theme={chosenTheme}>
      <ColorContext.Provider value={[isDark, setIsDark]}>
        <UserContext.Provider value={[user, setUser]}>
          <CssBaseline />
          <p>{user.id}</p>
          <br />
          <Grid
            container
            // spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
              <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
                <Grid
                  container
                  // spacing={0}
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <img
                      src={heart}
                      style={{ width: "10rem", height: "10rem" }}
                    />
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
                        <Typography variant="h1" style={{ lineHeight: "80%" }}>
                          UNI DATE
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{ padding: "1rem" }}
                        container
                        wrap="nowrap"
                        direction="row"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item>
                          <Typography style={{ fontSize: "1rem" }}>
                            Dating app for universities students & graduates
                          </Typography>
                        </Grid>
                        <Grid item>
                          <ColorBtn></ColorBtn>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ padding: "1rem" }}>
                <LoginForm />
              </Paper>
              <br />
              <Paper style={{ padding: "1rem" }}>
                <Register></Register>
              </Paper>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <BtmNav></BtmNav>
        </UserContext.Provider>
      </ColorContext.Provider>
    </ThemeProvider>
  );
}

export default App;
