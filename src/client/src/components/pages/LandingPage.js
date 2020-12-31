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
import { APP_NAME, DEFAULT_SPACE } from "../../shared/constants";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";
import TextField from "@material-ui/core/TextField";

const LandingPage = () => {
  const [isLoadingUserData] = useContext(LoadingUserDataContext);

  const paper = useTransparentPaperStyle();
  return (
    <>
      {!isLoadingUserData && (
        <>
          <CenterHOC>
            <Grid
              item
              style={{
                marginRight: DEFAULT_SPACE,
                marginLeft: DEFAULT_SPACE,
              }}
            >
              <Paper className={paper} style={{ marginBottom: DEFAULT_SPACE }}>
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
                  <Grid item style={{ padding: DEFAULT_SPACE }}>
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item>
                        <Typography
                          variant="h1"
                          style={{ lineHeight: "80%", textAlign: "center" }}
                        >
                          {APP_NAME}
                        </Typography>
                      </Grid>
                      <Grid item style={{ padding: DEFAULT_SPACE }}>
                        <Typography
                          style={{
                            fontSize: "1.3rem",
                            textAlign: "center",
                            lineHeight: "90%",
                          }}
                        >
                          Dating app for universities students & graduates
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={paper} style={{ marginBottom: DEFAULT_SPACE }}>
                <LoginForm />
              </Paper>
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
