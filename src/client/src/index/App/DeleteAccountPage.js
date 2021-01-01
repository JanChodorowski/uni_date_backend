import React, { useContext } from "react";
import CenterHOC from "./shared/CenterHOC";
import { Grid, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CenterPaperHOC from "./shared/CenterPaperHOC";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  EMPTY_PROFILES,
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
} from "../shared/constants";
import { UserContext } from "../shared/userContext";
import { deleteUser } from "../shared/api";
import { LoadingContext } from "../shared/loadingContext";
import { PathContext } from "../shared/pathContext";
import { ProfilesContext } from "../shared/profilesContext";
import {MatchesContext} from "../shared/matchesContext";

const DeleteAccountPage = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const { profile } = NAVIGATION;
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [path, setPath] = useContext(PathContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);
  const [matches, setMatches] = useContext(MatchesContext);

  const redirectToHomePage = () => {
    history.push(`/${profile}`);
    setPath(profile);
  };
  const handleNoClick = () => {
    redirectToHomePage();
  };

  const handleYesClick = () => {
    setIsLoading(true);
    deleteUser()
      .then(() => {
        const cookies = new Cookies();
        cookies.remove(LOCAL_STORAGE_KEY.jwtToken);
        setUser(EMPTY_USER);
        setProfiles(EMPTY_PROFILES);
        setMatches(EMPTY_PROFILES);
        redirectToHomePage();
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <CenterPaperHOC>
        <Typography>Are you sure you want to delete your account?</Typography>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleYesClick}
          disabled={isLoading}
        >
          YES
        </Button>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleNoClick}
          disabled={isLoading}
        >
          NO
        </Button>
      </CenterPaperHOC>
    </>
  );
};

export default DeleteAccountPage;
