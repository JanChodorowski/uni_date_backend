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
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { login, secret, refresh, register, getUserData } from "./api";
import {APP_THEME, LOCAL_STORAGE_KEY, NAVIGATION, THEME_NAMES} from "./shared/constants";
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
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import ProfilePage from "./components/pages/ProfilePage";
import ChatPage from "./components/pages/ChatPage";
import MatchPage from "./components/pages/MatchPage";
import FilterPage from "./components/pages/FilterPage";
import SettingsPage from "./components/pages/SettingsPage";
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
  const { chat, filter, match, profile, settings } = NAVIGATION;
  return (
    <ThemeProvider theme={chosenTheme}>
      <ColorContext.Provider value={[isDark, setIsDark]}>
        <UserContext.Provider value={[user, setUser]}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route path={`/${chat}`} component={user.id ? ChatPage : LandingPage} />
              <Route path={`/${match}`} component={user.id ? MatchPage : LandingPage} />
              <Route path={`/${filter}`} component={user.id ? FilterPage : LandingPage} />
              <Route path={`/${settings}`} component={user.id ? SettingsPage : LandingPage} />
              <Route path={`/`} component={user.id ? LandingPage : LandingPage} />
            </Switch>
          </Router>
          <BtmNav/>
        </UserContext.Provider>
      </ColorContext.Provider>
    </ThemeProvider>
  );
}

export default App;
