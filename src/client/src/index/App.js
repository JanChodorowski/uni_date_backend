import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { Redirect, Route, Switch } from "react-router-dom";
import ChatPage from "./App/ChatPage";
import DeleteAccountPage from "./App/DeleteAccountPage";
import FilterPage from "./App/FilterPage";
import LandingPage from "./App/LandingPage";
import Logo from "./App/Logo";
import MatchPage from "./App/MatchPage";
import ProfilePage from "./App/ProfilePage";
import ProgressShower from "./App/ProgressShower";
import SettingsPage from "./App/SettingsPage";
import { getPicture, getUser } from "./shared/api";
import BtmNav from "./App/BtmNav";
import { ColorContext } from "./shared/colorContext";
import {
  APP_THEME,
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
  THEME_NAMES,
} from "./shared/constants";
import { compareFileNames, getItemByKey } from "./shared/functions";
import { LoadingContext } from "./shared/loadingContext";
import { LoadingUserDataContext } from "./shared/loadingUserDataContex";
import { MatchesContext } from "./shared/matchesContext";
import { PathContext } from "./shared/pathContext";
import { ProfilesContext } from "./shared/profilesContext";
import { UserContext } from "./shared/userContext";

function App(/*{ coords }*/) {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(EMPTY_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);

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
    setIsDark(getItemByKey(LOCAL_STORAGE_KEY.theme) === THEME_NAMES.dark);
    return () => {
      mounted = false;
    };
  }, []);

  //   useEffect(() => {
  // if(!coords){
  //   return
  // }
  //     console.log('coordscoords',coords)
  //   }, [coords]);

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
                <MatchesContext.Provider value={[matches, setMatches]}>
                  <PathContext.Provider value={[path, setPath]}>
                    <CssBaseline />
                    <ProgressShower></ProgressShower>
                    {user.email ? (
                      <>
                        <Logo></Logo>
                        <br />
                        <br />
                        <Switch>
                          <Route path={`/${chat}`} component={ChatPage} exact />
                          <Route
                            path={`/${match}`}
                            component={MatchPage}
                            exact
                          />
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
                </MatchesContext.Provider>
              </ProfilesContext.Provider>
            </LoadingUserDataContext.Provider>
          </LoadingContext.Provider>
        </UserContext.Provider>
      </ColorContext.Provider>
    </ThemeProvider>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
