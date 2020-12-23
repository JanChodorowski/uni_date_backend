import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import {
  EMPTY_USER,
  LOCAL_STORAGE_KEY,
  NAVIGATION,
} from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ColorBtn from "../buttons/ColorBtn";
import CenterHOC from "../hocs/CenterHOC";
import ColorBtnCorner from "../other/ColorBtnCorner";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { PathContext } from "../../context/pathContext";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";
import { ProfilesContext } from "../../context/profilesContext";

const SettingsPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);

  const [path, setPath] = useContext(PathContext);

  const paper = useTransparentPaperStyle();
  const history = useHistory();
  const { profile, settings } = NAVIGATION;

  const handleLogOut = () => {
    const cookies = new Cookies();
    cookies.remove(LOCAL_STORAGE_KEY.jwtToken);
    setUser(EMPTY_USER);
    setProfiles(null);
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
              >
                LOG OUT
              </Button>
            </Paper>
          </>
        </Grid>
        <Grid item>
          <Paper className={paper}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleDeleteAccount}
              size="small"
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
