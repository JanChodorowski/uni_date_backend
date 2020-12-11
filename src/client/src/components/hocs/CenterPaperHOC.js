import React, { useContext, useLayoutEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import CenterHOC from "./CenterHOC";

const CenterPaperHOC = ({ children, minHeight }) => {
  return (
    <>
      <CenterHOC minHeight={minHeight}>
        <Grid item style={{ marginRight: "1rem", marginLeft: "1rem" }}>
          <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
            {children}
          </Paper>
        </Grid>
      </CenterHOC>
    </>
  );
};

export default CenterPaperHOC;
