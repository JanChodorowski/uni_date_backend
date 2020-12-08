import React from "react";
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
import { NAVIGATION } from "../shared/constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function BtmNav() {
  const classes = useStyles();
  const { chat, filter, match, profile, settings } = NAVIGATION;

  const [value, setValue] = React.useState({ profile });
  const isSmallView = useMediaQuery("(min-width:400px)");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeOnSmallView = (name) => () => {
    console.log("Not implemented", name);
  };
  return (
    <>
      {isSmallView ? (
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label="CHAT"
            value={chat}
            icon={<ChatIcon />}
          />
          <BottomNavigationAction
            label="MATCH"
            value={match}
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="FILTER"
            value={filter}
            icon={<FilterListIcon />}
          />
          <BottomNavigationAction
            label="PROFILE"
            value={profile}
            icon={<AccountCircleIcon />}
          />
          <BottomNavigationAction
            label="SETTINGS"
            value={settings}
            icon={<SettingsIcon />}
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
                onClick={handleChangeOnSmallView({ chat })}
              >
                <ChatIcon></ChatIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView({ match })}
              >
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView({ filter })}
              >
                <FilterListIcon></FilterListIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView({ profile })}
              >
                <AccountCircleIcon></AccountCircleIcon>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={handleChangeOnSmallView({ settings })}
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
