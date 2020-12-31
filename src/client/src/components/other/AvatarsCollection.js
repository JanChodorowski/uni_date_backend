import { Avatar, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import { ColorContext } from "../../context/colorContext";
import {
  APP_NAME,
  APP_THEME,
  AVATAR_SIZE,
  DEFAULT_SPACE,
} from "../../shared/constants";
import logo from "../../images/the-eiger.svg";
import PlaceHolder from "../../images/Missing_avatar.svg";
import { capitalizeFirstLetter, getGenderColor } from "../../shared/functions";
import { MatchesContext } from "../../context/matchesContext";

const AvatarsCollection = ({ collection, handleClickOpen }) => {
  return (
    <Grid container direction="row" alignItems="center" justify="center">
      {collection &&
        collection.map((p, i) => (
          <Grid item style={{ padding: DEFAULT_SPACE }} key={i}>
            <Grid item>
              <IconButton onClick={() => handleClickOpen(p.id)}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ padding: "2rem" }}
                >
                  <Grid item>
                    {p.avatar ? (
                      <Avatar
                        alt={p.userName}
                        src={URL.createObjectURL(p.avatar)}
                        style={{
                          height: AVATAR_SIZE,
                          width: AVATAR_SIZE,
                        }}
                      />
                    ) : (
                      <Avatar
                        alt={p.userName}
                        src={PlaceHolder}
                        style={{
                          height: AVATAR_SIZE,
                          width: AVATAR_SIZE,
                        }}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <Typography
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: getGenderColor(p.gender),
                      }}
                      paragraph
                    >
                      {capitalizeFirstLetter(p.userName)}
                    </Typography>
                  </Grid>
                </Grid>
              </IconButton>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default AvatarsCollection;
