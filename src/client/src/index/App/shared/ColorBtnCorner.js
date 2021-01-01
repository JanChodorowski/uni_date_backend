import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import ColorBtn from "../../shared/ColorBtn";
import { ColorContext } from "../../shared/colorContext";




const ColorBtnCorner = () => {
  const [isDark] = useContext(ColorContext);

  const useStyles = makeStyles((theme) => ({
    root: {
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
  const { root } = useStyles();

  return (
    <Paper elevation={0} className={root} variant="outlined">
      <ColorBtn></ColorBtn>
    </Paper>
  );
};

export default ColorBtnCorner;
