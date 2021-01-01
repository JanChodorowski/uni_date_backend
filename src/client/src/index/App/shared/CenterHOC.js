import { Grid } from "@material-ui/core";
import React from "react";

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
