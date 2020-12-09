import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import { emptyUser } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import ColorBtn from "../buttons/ColorBtn";
import CenterGridContainerHOC from "../hocs/CenterGridContainerHOC";
import ColorBtnCorner from "../ColorBtnCorner";

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
      <CenterGridContainerHOC>
        <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
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
          </Paper>
        </Grid>
      </CenterGridContainerHOC>
    </>
  );
};

export default SettingsPage;
