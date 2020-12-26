import { useState, useEffect, useContext } from "react";
import { ColorContext } from "../../context/colorContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  DARK_TRANSPARENT,
  DEFAULT_SPACE,
  LIGHT_TRANSPARENT,
} from "../../shared/constants";

const useTransparentPaperStyle = () => {
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: DEFAULT_SPACE,
      backgroundColor: isDark ? DARK_TRANSPARENT : LIGHT_TRANSPARENT,
    },
  }));

  return useStyles().paper;
};

export default useTransparentPaperStyle;
