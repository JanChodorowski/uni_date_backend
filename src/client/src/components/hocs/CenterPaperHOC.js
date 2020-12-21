import React, { useContext, useLayoutEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import CenterHOC from "./CenterHOC";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";

const CenterPaperHOC = ({ children, minHeight }) => {
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "1rem",
      backgroundColor: isDark
        ? "rgba(38, 50, 56, 0.7)"
        : "rgba(255, 255, 255, 0.6)",
    },
  }));
  const { paper } = useStyles();
  return (
    <>
      <CenterHOC minHeight={minHeight}>
        <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          <Paper
            className={paper}
            style={{ padding: "1rem", marginBottom: "1rem" }}
          >
            {children}
          </Paper>
        </Grid>
      </CenterHOC>
    </>
  );
};

export default CenterPaperHOC;
