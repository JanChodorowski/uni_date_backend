import { useState, useEffect, useContext } from "react";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import {DEFAULT_PADDING} from "../../shared/constants";

const useTransparentPaperStyle = () => {
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: DEFAULT_PADDING,
      backgroundColor: isDark
        ? "rgba(38, 50, 56, 0.7)"
        : "rgba(255, 255, 255, 0.6)",
    },
  }));

  return useStyles().paper;
};

export default useTransparentPaperStyle;
