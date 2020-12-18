import { Paper } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import React, { useContext } from "react";

import ColorBtn from "../buttons/ColorBtn";
import {ColorContext} from "../../context/colorContext";

const ColorBtnCorner = () => {
  const [isDark] = useContext(ColorContext);

  const useStyles = makeStyles((theme) => ({
    paper: {
      backgroundColor: isDark
          ? "rgba(38, 50, 56, 0.7)"
          : "rgba(255, 255, 255, 0.6)",
      position: "fixed",
      top: "16px",
      right: "16px",
      paddingRight: "12px",
      zIndex: "1100",
    },
  }));
  const {paper} = useStyles()


  return (
    <Paper elevation={0} className={paper} variant="outlined">
      <ColorBtn></ColorBtn>
    </Paper>
  );
};

export default ColorBtnCorner;
