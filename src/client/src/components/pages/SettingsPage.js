import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import { EMPTY_USER, NAVIGATION } from "../../shared/constants";
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

const SettingsPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [path, setPath] = useContext(PathContext);

  const  paper  = useTransparentPaperStyle();
  const history = useHistory();
  const { profile, settings } = NAVIGATION;

  const handleLogOut = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    setUser(EMPTY_USER);
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
