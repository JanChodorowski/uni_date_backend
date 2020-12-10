import React, { useState, useEffect } from "react";
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
  LinearProgress,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { login, secret, refresh, register, getUserData } from "./api";
import {
  APP_THEME,
  emptyUser,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
  THEME_NAMES,
} from "./shared/constants";
import heart from "./images/heart-rate.png";
import LoginForm from "./components/forms/LoginForm";
import Register from "./components/Register";
import BtmNav from "./components/BtmNav";
import ColorBtn from "./components/buttons/ColorBtn";
import { ColorContext } from "./context/colorContext";
import { UserContext } from "./context/userContext";
import { getItemByKey } from "./shared/functions";
import LandingPage from "./components/pages/LandingPage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import ProfilePage from "./components/pages/ProfilePage";
import ChatPage from "./components/pages/ChatPage";
import MatchPage from "./components/pages/MatchPage";
import FilterPage from "./components/pages/FilterPage";
import SettingsPage from "./components/pages/SettingsPage";
import { LoadingContext } from "./context/loadingContext";
import ProgressShower from "./components/ProgressShower";
import { LoadingUserDataContext } from "./context/loadingUserDataContex";
import DeleteAccountPage from "./components/pages/DeleteAccountPage";
function App() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(emptyUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsDark(getItemByKey(LOCAL_STORAGE_KEY.theme) !== THEME_NAMES.light);
    setIsLoading(true);
    setIsLoadingUserData(true);
    getUserData()
      .then((userData) => {
        const { data } = userData;
        console.log("userdata", data);
        if (data && mounted) {
          setUser(data);
        }
      })
      .catch((e) => {
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingUserData(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  let chosenTheme = createMuiTheme(isDark ? APP_THEME.dark : APP_THEME.light);
  chosenTheme = responsiveFontSizes(chosenTheme);
  const { chat, filter, match, profile, settings,deleteaccount } = NAVIGATION;
  return (
    <ThemeProvider theme={chosenTheme}>
      <ColorContext.Provider value={[isDark, setIsDark]}>
        <UserContext.Provider value={[user, setUser]}>
          <LoadingContext.Provider value={[isLoading, setIsLoading]}>
            <LoadingUserDataContext.Provider
              value={[isLoadingUserData, setIsLoadingUserData]}
            >
              <CssBaseline />
              <ProgressShower></ProgressShower>
              <Switch>
                <Route
                  path={`/${chat}`}
                  component={user.email ? ChatPage : LandingPage}
                />
                <Route
                  path={`/${match}`}
                  component={user.email ? MatchPage : LandingPage}
                />
                <Route
                  path={`/${filter}`}
                  component={user.email ? FilterPage : LandingPage}
                />
                <Route
                  path={`/${settings}`}
                  component={user.email ? SettingsPage : LandingPage}
                />
                <Route
                  path={`/${profile}`}
                  component={user.email ? ProfilePage : LandingPage}
                />
                <Route
                    path={`/${deleteaccount}`}
                    component={user.email ? DeleteAccountPage : LandingPage}
                />
                <Route path="/">
                  {user.email ? (
                    <Redirect to={`/${profile}`} />
                  ) : (
                    <LandingPage />
                  )}
                </Route>
              </Switch>
              {user.email && <BtmNav />}
            </LoadingUserDataContext.Provider>
          </LoadingContext.Provider>
        </UserContext.Provider>
      </ColorContext.Provider>
    </ThemeProvider>
  );
}

export default App;
