import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
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
import { getPicture, getUser, sendLocation } from "./shared/api";
import BtmNav from "./App/BtmNav";
import { ColorContext } from "./shared/colorContext";
import { IncomingMessagesContext } from "./shared/incomingMessagesContext";

import {
  APP_THEME,
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
  SOCKET_EVENTS,
  THEME_NAMES,
} from "./shared/constants";
import { compareFileNames, getItemByKey } from "./shared/functions";
import { LoadingContext } from "./shared/loadingContext";
import { LoadingUserDataContext } from "./shared/loadingUserDataContex";
import { MatchesContext } from "./shared/matchesContext";
import { PathContext } from "./shared/pathContext";
import { ProfilesContext } from "./shared/profilesContext";
import { UserContext } from "./shared/userContext";

import { socket } from "./shared/socket";
import SchlernLow from "./App/SchlernLow.mp4";

const { privateChat, register } = SOCKET_EVENTS;

function App({ coords }) {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(EMPTY_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [incomingMessages, setIncomingMessages] = useState([]);

  const [path, setPath] = useState(
    (window?.location?.pathname &&
      window?.location?.pathname?.replace(/\//g, "")) ||
      ""
  );
  const handleLoading = (status) => {
    setIsLoading(status);
    setIsLoadingUserData(status);
  };

  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.playbackRate = 0.6;
  }, [videoRef]);

  useEffect(() => {
    if (!user.id) {
      return;
    }
    socket.removeAllListeners(privateChat);
    socket.removeAllListeners(register);
    socket.emit("register", user.id);

    socket.on(privateChat, function (newIncomingMessage) {
      console.log("newIncomingMessage", newIncomingMessage);
      setIncomingMessages((prevIncomingMessages) => {
        return [...prevIncomingMessages, newIncomingMessage];
      });
    });
  }, [user.id]);

  useEffect(() => {
    setIsDark(getItemByKey(LOCAL_STORAGE_KEY.theme) === THEME_NAMES.dark);
  }, []);

  useEffect(() => {
    if (!coords) {
      return;
    }

    console.log("coords", coords);
    navigator.geolocation.getCurrentPosition((test) =>
      console.log(
        "    navigator.geolocation.getCurrentPosition(success, error);\n",
        test
      )
    );
    sendLocation(coords)
      .then(() => {})
      .catch((err) => {});
  }, [coords]);

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
            setUser(userData);
            if (!userData.id) {
              return;
            }
          })
          .catch((e) => {
            console.error("err", e);
          })
          .finally(() => {
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
                    <IncomingMessagesContext.Provider
                      value={[incomingMessages, setIncomingMessages]}
                    >
                      <CssBaseline />
                      <div className="fullscreen-bg">
                        <video
                          ref={videoRef}
                          className="fullscreen-bg__video"
                          id="background-video"
                          autoPlay
                          loop
                          muted
                        >
                          <source src={SchlernLow} type="video/mp4" />
                        </video>
                      </div>
                      <ProgressShower></ProgressShower>
                      {user.id ? (
                        <>
                          <Logo></Logo>
                          <br />
                          <br />
                          <Switch>
                            <Route
                              path={`/${chat}`}
                              render={(props) => (
                                <ChatPage
                                  {...props}
                                  latitude={coords?.latitude}
                                  longitude={coords?.longitude}
                                />
                              )}
                              exact
                            />
                            <Route
                              path={`/${match}`}
                              render={(props) => (
                                <MatchPage
                                  {...props}
                                  latitude={coords?.latitude}
                                  longitude={coords?.longitude}
                                />
                              )}
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
                        <LandingPage
                          latitude={coords?.latitude}
                          longitude={coords?.longitude}
                        ></LandingPage>
                      )}
                    </IncomingMessagesContext.Provider>
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
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(App);
