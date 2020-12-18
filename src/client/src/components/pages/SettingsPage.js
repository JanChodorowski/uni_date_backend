import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import { emptyUser, NAVIGATION } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ColorBtn from "../buttons/ColorBtn";
import CenterHOC from "../hocs/CenterHOC";
import ColorBtnCorner from "../other/ColorBtnCorner";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { PathContext } from "../../context/pathContext";
import {ColorContext} from "../../context/colorContext";
import {makeStyles} from "@material-ui/core/styles";

const SettingsPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [path, setPath] = useContext(PathContext);
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "1rem",
      backgroundColor: isDark
          ? "rgba(38, 50, 56, 0.7)"
          : "rgba(255, 255, 255, 0.6)"
    },
  }));
  const {paper} = useStyles()
  const history = useHistory();
  const { profile, settings } = NAVIGATION;

  const handleLogOut = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    setUser(emptyUser);
    history.push(`/`);
    setPath(profile);
  };
  const { deleteaccount } = NAVIGATION;
  const handleDeleteAccount = () => {
    history.push(`/${settings}/${deleteaccount}`);
  };
  return (
    <>
      <ColorBtnCorner></ColorBtnCorner>
      <Grid container direction="column" alignItems="center" justify="center">
        {/*<Grid item>*/}
        {/*  <ColorBtn></ColorBtn>*/}
        {/*</Grid>*/}
        <Grid item>
          <>
            <Paper className={paper}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleLogOut}
              >
                LOG OUT
              </Button>
            </Paper>
            <br />
            <br />
            <br />
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
