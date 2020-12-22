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
import { login, secret, refresh, register, getUser, getPicture } from "./api";
import {
  APP_THEME,
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
  THEME_NAMES,
} from "./shared/constants";
import heart from "./images/heart-rate.png";
import LoginForm from "./components/forms/LoginForm";
import Register from "./components/other/Register";
import BtmNav from "./components/other/BtmNav";
import ColorBtn from "./components/buttons/ColorBtn";
import { ColorContext } from "./context/colorContext";
import { UserContext } from "./context/userContext";
import { compareFileNames, getItemByKey } from "./shared/functions";
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
import ProgressShower from "./components/other/ProgressShower";
import { LoadingUserDataContext } from "./context/loadingUserDataContex";
import DeleteAccountPage from "./components/pages/DeleteAccountPage";
import { PathContext } from "./context/pathContext";
import { ProfilesContext } from "./context/profilesContext";
import Logo from "./components/other/Logo";
function App() {
  const [isDark, setIsDark] = useState(true);
  const [user, setUser] = useState(EMPTY_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [profiles, setProfiles] = useState([]);

  const [path, setPath] = useState(
    (window?.location?.pathname &&
      window?.location?.pathname?.replace(/\//g, "")) ||
      ""
  );
  const handleLoading = (status) => {
    setIsLoading(status);
    setIsLoadingUserData(status);
  };

  useEffect(() => {
    let mounted = true;
    setIsDark(getItemByKey(LOCAL_STORAGE_KEY.theme) !== THEME_NAMES.light);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    handleLoading(true);

    getUser()
      .then((res) => {
        let userData = res.data;

        if (!(userData && mounted)) {
          throw new Error();
        }

        let userBlobsPromises = userData.pictures.map((p) => {
          return getPicture(p.fileName);
        });

        Promise.all(userBlobsPromises)
          .then((results) => {
            const picturesDataWithBlobs = results
              .map((r) => {
                return {
                  ...userData.pictures.find(
                    (p) => p.fileName === r.headers.filename
                  ),
                  blob: r.data,
                };
              })
              .sort(compareFileNames);

            userData = {
              ...userData,
              pictures: picturesDataWithBlobs,
            };
            console.log("userData", userData);
          })
          .catch((e) => {
            handleLoading(false);
          })
          .finally(() => {
            setUser(userData);
            handleLoading(false);
          });
      })
      .catch((e) => {
        handleLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  let chosenTheme = createMuiTheme(isDark ? APP_THEME.dark : APP_THEME.light);
  chosenTheme = responsiveFontSizes(chosenTheme);

  const { chat, filter, match, profile, settings, deleteaccount } = NAVIGATION;

  return (
    <ThemeProvider theme={chosenTheme}>
      <ColorContext.Provider value={[isDark, setIsDark]}>
        <UserContext.Provider value={[user, setUser]}>
          <LoadingContext.Provider value={[isLoading, setIsLoading]}>
            <LoadingUserDataContext.Provider
              value={[isLoadingUserData, setIsLoadingUserData]}
            >
              <ProfilesContext.Provider value={[profiles, setProfiles]}>
                <PathContext.Provider value={[path, setPath]}>
                  <CssBaseline />
                  <ProgressShower></ProgressShower>
                  {user.email ? (
                    <>
                      <Logo></Logo>
                      <Switch>
                        <Route path={`/${chat}`} component={ChatPage} exact />
                        <Route path={`/${match}`} component={MatchPage} exact />
                        <Route
                          path={`/${filter}`}
                          component={FilterPage}
                          exact
                        />
                        <Route
                          path={`/${settings}`}
                          component={SettingsPage}
                          exact
                        />
                        <Route
                          path={`/${profile}`}
                          component={ProfilePage}
                          exact
                        />
                        <Route
                          path={`/${settings}/${deleteaccount}`}
                          component={DeleteAccountPage}
                          exact
                        />
                        <Route path="/">
                          <Redirect to={`/${profile}`} />
                        </Route>
                      </Switch>
                      <BtmNav />
                    </>
                  ) : (
                    <LandingPage></LandingPage>
                  )}
                </PathContext.Provider>
              </ProfilesContext.Provider>
            </LoadingUserDataContext.Provider>
          </LoadingContext.Provider>
        </UserContext.Provider>
      </ColorContext.Provider>
    </ThemeProvider>
  );
}

export default App;
