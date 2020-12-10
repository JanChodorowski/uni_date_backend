import React, { useState, useEffect, useContext } from "react";
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
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import heart from "../../images/heart-rate.png";
import LoginForm from "../forms/LoginForm";
import Register from "../other/Register";
import ColorBtn from "../buttons/ColorBtn";
import BtmNav from "../other/BtmNav";
import CenterHOC from "../hocs/CenterHOC";
import ColorBtnCorner from "../other/ColorBtnCorner";
import { ColorContext } from "../../context/colorContext";
import { LoadingContext } from "../../context/loadingContext";
import { LoadingUserDataContext } from "../../context/loadingUserDataContex";

const LandingPage = () => {
  const [isLoadingUserData] = useContext(LoadingUserDataContext);

  return (
    <>
      {!isLoadingUserData && (
        <>
          <ColorBtnCorner></ColorBtnCorner>
          <CenterHOC>
            <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
              <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <img
                      src={heart}
                      style={{ width: "10rem", height: "10rem" }}
                    />
                  </Grid>
                  <Grid item style={{ padding: "1rem" }}>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item>
                        <Typography variant="h1" style={{ lineHeight: "80%" }}>
                          UNI DATE
                        </Typography>
                      </Grid>
                      <Grid item style={{ padding: "1rem" }}>
                        <Typography style={{ fontSize: "1rem" }}>
                          Dating app for universities students & graduates
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper style={{ padding: "1rem" }}>
                <LoginForm />
              </Paper>
              <br />
              <Paper style={{ padding: "1rem" }}>
                <Register></Register>
              </Paper>
            </Grid>
          </CenterHOC>
        </>
      )}
    </>
  );
};

export default LandingPage;
