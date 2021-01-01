import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { DEFAULT_SPACE } from "../../shared/constants";
import CenterHOC from "../shared/CenterHOC";
import useTransparentPaperStyle from "../shared/useTransparentPaperStyle";

const CenterPaperHOC = ({ children, minHeight }) => {
  const paper = useTransparentPaperStyle();
  return (
    <>
      <CenterHOC minHeight={minHeight}>
        <Grid
          item
          style={{ marginRight: DEFAULT_SPACE, marginLeft: DEFAULT_SPACE }}
        >
          <Paper
            className={paper}
            style={{ padding: DEFAULT_SPACE, marginBottom: DEFAULT_SPACE }}
          >
            {children}
          </Paper>
        </Grid>
      </CenterHOC>
    </>
  );
};

export default CenterPaperHOC;
