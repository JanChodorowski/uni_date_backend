import React, { useContext, useLayoutEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";

const CenterHOC = ({ children, minHeight = "80vh" }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight }}
      >
        {children}
      </Grid>
    </>
  );
};

export default CenterHOC;
