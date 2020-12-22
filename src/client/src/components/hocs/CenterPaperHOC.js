import React, { useContext, useLayoutEffect, useRef } from "react";
import { Grid, Paper } from "@material-ui/core";
import CenterHOC from "./CenterHOC";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";

const CenterPaperHOC = ({ children, minHeight }) => {

  const  paper  = useTransparentPaperStyle();
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
