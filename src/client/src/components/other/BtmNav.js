import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ChatIcon from "@material-ui/icons/Chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import FilterListIcon from "@material-ui/icons/FilterList";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { NAVIGATION } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { PathContext } from "../../context/pathContext";
import Dialog from "@material-ui/core/Dialog";
import {ColorContext} from "../../context/colorContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

function BtmNav() {
  const classes = useStyles();
  const { chat, filter, match, profile, settings } = NAVIGATION;
  const [user] = useContext(UserContext);
  const [path, setPath] = useContext(PathContext);

  const isSmallView = useMediaQuery("(min-width:400px)");
  const history = useHistory();
  const redirect = (path) => {
    history.push(`/${path}`);
    setPath(path);
  };
  const handleChange = (event, path) => {
    redirect(path);
  };
  const handleChangeOnSmallView = (name) => () => {
    redirect(name);
  };
  const [isDark] = useContext(ColorContext);

  return (
    <>
      <br />
      <br />
      <br />
      {isSmallView ? (
        <BottomNavigation
          value={path}
          onChange={handleChange}
          className={classes.root}

        >
          <BottomNavigationAction
            label="CHAT"
            value={chat}
            icon={<ChatIcon />}
            disabled={!user.email}
          />
          <BottomNavigationAction
            label="MATCH"
            value={match}
            icon={<FavoriteIcon />}
            disabled={!user.email}
          />
          <BottomNavigationAction
            label="FILTER"
            value={filter}
            icon={<FilterListIcon />}
            disabled={!user.email}
          />
          <BottomNavigationAction
            label="PROFILE"
            value={profile}
            icon={<AccountCircleIcon />}
            disabled={!user.email}
          />
          <BottomNavigationAction
            label="SETTINGS"
            value={settings}
            icon={<SettingsIcon />}
            disabled={!user.email}
          />
        </BottomNavigation>
      ) : (
        <Paper className={classes.root} square>
          <Grid
            container
            // spacing={0}
            direction="row"
            alignItems="center"
            justify="space-around"
            wrap="nowrap"
          >
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView(chat)}
                disabled={!user.email}
              >
                <ChatIcon></ChatIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView(match)}
                disabled={!user.email}
              >
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView(filter)}
                disabled={!user.email}
              >
                <FilterListIcon></FilterListIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView(profile)}
                disabled={!user.email}
              >
                <AccountCircleIcon></AccountCircleIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView(settings)}
                disabled={!user.email}
              >
                <SettingsIcon></SettingsIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
export default BtmNav;
