import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { ColorContext } from "../../context/colorContext";
import { APP_NAME, APP_THEME } from "../../shared/constants";
import logo from "../../images/the-eiger.svg";

const Logo = () => {
  const [isDark] = useContext(ColorContext);

  const useStyles = makeStyles(() => ({
    logoPaper: {
      position: "fixed",
      paddingRight: "4px",
      paddingLeft: "4px",
      paddingTop: "3px",
      backgroundColor: isDark
        ? "rgba(38, 50, 56, 0.7)"
        : "rgba(255, 255, 255, 0.6)",
      zIndex: "1100",
    },
  }));

  const { logoPaper } = useStyles();
  const logoSize = "2rem";
  return (
    <Paper className={logoPaper} elevation={0} variant="outlined">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
      >
        <Grid item style={{ marginRight: "6px" }}>
          <img src={logo} style={{ width: logoSize, height: logoSize }} />{" "}
        </Grid>
        <Grid item>
          <Typography variant="h6" noWrap>
            {APP_NAME}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Logo;
