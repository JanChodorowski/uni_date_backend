import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../shared/userContext";
import {
  EMPTY_PROFILES,
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
} from "../shared/constants";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ColorBtn from "../shared/ColorBtn";
import CenterHOC from "./shared/CenterHOC";
import ColorBtnCorner from "./shared/ColorBtnCorner";
import CenterPaperHOC from "./shared/CenterPaperHOC";
import { PathContext } from "../shared/pathContext";
import { ColorContext } from "../shared/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import useTransparentPaperStyle from "./shared/useTransparentPaperStyle";
import { ProfilesContext } from "../shared/profilesContext";
import DeleteIcon from "@material-ui/icons/Delete";
import { MeetingRoom } from "@material-ui/icons";
import {MatchesContext} from "../shared/matchesContext";
const SettingsPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);
  const [matches, setMatches] = useContext(MatchesContext);

  const [path, setPath] = useContext(PathContext);

  const paper = useTransparentPaperStyle();
  const history = useHistory();
  const { profile, settings } = NAVIGATION;

  const handleLogOut = () => {
    const cookies = new Cookies();
    cookies.remove(LOCAL_STORAGE_KEY.jwtToken);
    setUser(EMPTY_USER);
    setProfiles(EMPTY_PROFILES);
    setMatches(EMPTY_PROFILES);
    setPath(profile);
    history.push(`/`);
  };
  const { deleteaccount } = NAVIGATION;
  const handleDeleteAccount = () => {
    history.push(`/${settings}/${deleteaccount}`);
  };
  return (
    <>
      <ColorBtnCorner></ColorBtnCorner>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <>
            <Paper className={paper}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleLogOut}
                size="small"
                startIcon={<MeetingRoom></MeetingRoom>}
              >
                LOG OUT
              </Button>
            </Paper>
          </>
        </Grid>
        <Grid item>
          <Paper className={paper}>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleDeleteAccount}
              size="small"
              startIcon={<DeleteIcon></DeleteIcon>}
            >
              DELETE ACCOUNT
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsPage;
