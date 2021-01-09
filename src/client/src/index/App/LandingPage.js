import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { APP_NAME, DEFAULT_SPACE } from "../shared/constants";
import { LoadingUserDataContext } from "../shared/loadingUserDataContex";
import LoginForm from "./LandingPage/LoginForm";
import Register from "./LandingPage/Register";
import CenterHOC from "./shared/CenterHOC";
import logo from "./shared/the-eiger.svg";
import useTransparentPaperStyle from "./shared/useTransparentPaperStyle";

const LandingPage = ({ latitude, longitude }) => {
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
                <Register latitude={latitude} longitude={longitude}></Register>
              </Paper>
            </Grid>
          </CenterHOC>
        </>
      )}
    </>
  );
};

export default LandingPage;
