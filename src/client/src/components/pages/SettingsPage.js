import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import { emptyUser } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ColorBtn from "../buttons/ColorBtn";
import CenterHOC from "../hocs/CenterHOC";
import ColorBtnCorner from "../ColorBtnCorner";
import CenterPaperHOC from "../hocs/CenterPaperHOC";

const SettingsPage = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const handleLogOut = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    history.push(`/`);
    setUser(emptyUser);
  };

  return (
    <>
      <ColorBtnCorner></ColorBtnCorner>
      <CenterPaperHOC>
        <Grid container direction="column" alignItems="center" justify="center">
          {/*<Grid item>*/}
          {/*  <ColorBtn></ColorBtn>*/}
          {/*</Grid>*/}
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleLogOut}
            >
              LOG OUT
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              // onClick={handleLogOut}
            >
              DELETE ACCOUNT
            </Button>
          </Grid>
        </Grid>
      </CenterPaperHOC>
    </>
  );
};

export default SettingsPage;
