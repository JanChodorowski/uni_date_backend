import React, { useContext, useLayoutEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import CenterHOC from "./CenterHOC";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";
import { DEFAULT_SPACE } from "../../shared/constants";

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
