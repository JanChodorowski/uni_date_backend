import { Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import React, { useContext } from "react";

import ColorBtn from "./buttons/ColorBtn";

const ColorBtnCorner = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "fixed",
      top: "16px",
      right: "16px",
      paddingRight: "12px",
      zIndex: "1100",
    },
  }));

  const { root } = useStyles();

  return (
    <Paper elevation={0} className={root} variant="outlined">
      <ColorBtn></ColorBtn>
    </Paper>
  );
};

export default ColorBtnCorner;
