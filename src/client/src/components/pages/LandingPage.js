import React, { useState, useEffect } from "react";
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
import Register from "../Register";
import ColorBtn from "../buttons/ColorBtn";
import BtmNav from "../BtmNav";

const LandingPage = () => {
  return (
    <>
      <br />
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <img src={heart} style={{ width: "10rem", height: "10rem" }} />
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
                  <Grid
                    item
                    style={{ padding: "1rem" }}
                    container
                    wrap="nowrap"
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item>
                      <Typography style={{ fontSize: "1rem" }}>
                        Dating app for universities students & graduates
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ColorBtn></ColorBtn>
                    </Grid>
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
      </Grid>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default LandingPage;
