import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { ColorContext } from "../context/colorContext";
import { LOCAL_STORAGE_KEY, THEME_NAMES } from "../shared/constants";

const ColorBtn = () => {
  const [isDark, setIsDark] = useContext(ColorContext);
  const firstUpdate = useRef(true);
  const { light, dark } = THEME_NAMES;
  const { theme } = LOCAL_STORAGE_KEY;

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const newTheme = isDark ? dark : light;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(theme, newTheme);
    }
  }, [isDark]);

  return (
    <Tooltip title="Toggle light/dark theme" arrow TransitionComponent={Zoom}>
      <IconButton
        edge="end"
        aria-label="mode"
        style={{ transition: "all 0.25s linear" }}
        onClick={() => {
          setIsDark((prevIsDark) => !prevIsDark);
        }}
      >
        {isDark ? <Brightness7Icon /> : <Brightness3Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ColorBtn;
