import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { ColorContext } from "../context/colorContext";
import { LOCAL_STORAGE_KEY, THEME_NAMES } from "../helpers/constants";
import { Grid, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const PasswordVisibilityBtn = ({
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <Tooltip title="Toggle show/hide password" arrow TransitionComponent={Zoom}>
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
    </Tooltip>
  );
};

export default PasswordVisibilityBtn;
