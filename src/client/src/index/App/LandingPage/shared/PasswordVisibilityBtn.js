import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";

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
