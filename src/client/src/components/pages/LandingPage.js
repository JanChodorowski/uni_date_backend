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
import logo from "../../images/the-eiger.svg";
import LoginForm from "../forms/LoginForm";
import Register from "../other/Register";
import ColorBtn from "../buttons/ColorBtn";
import BtmNav from "../other/BtmNav";
import CenterHOC from "../hocs/CenterHOC";
import ColorBtnCorner from "../other/ColorBtnCorner";
import { ColorContext } from "../../context/colorContext";
import { LoadingContext } from "../../context/loadingContext";
import { LoadingUserDataContext } from "../../context/loadingUserDataContex";
import { APP_NAME } from "../../shared/constants";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";

const LandingPage = () => {
  const [isLoadingUserData] = useContext(LoadingUserDataContext);

  const  paper  = useTransparentPaperStyle();
  return (
    <>
      {!isLoadingUserData && (
        <>
          <ColorBtnCorner></ColorBtnCorner>
          <CenterHOC>
            <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
              <Paper className={paper} style={{ marginBottom: "1rem" }}>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <img
                      src={logo}
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
                          {APP_NAME}
                        </Typography>
                      </Grid>
                      <Grid item style={{ padding: "1rem" }}>
                        <Typography style={{ fontSize: "1.3rem" }}>
                          Dating app for universities students & graduates
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={paper}>
                <LoginForm />
              </Paper>
              <br />
              <Paper className={paper}>
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
