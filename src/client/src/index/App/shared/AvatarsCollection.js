import {Avatar, CircularProgress, Grid, IconButton, Typography} from "@material-ui/core";
import React from "react";
import { AVATAR_SIZE, DEFAULT_SPACE } from "../../shared/constants";
import { capitalizeFirstLetter, getGenderColor } from "../../shared/functions";
import PlaceHolder from "../ChatPage/shared/Missing_avatar.svg";

const AvatarsCollection = ({ collection, handleClickOpen }) => {
  return (
    <Grid container direction="row" alignItems="center" justify="center">
      {collection ?
        collection.map((p, i) => (
          <Grid item style={{ padding: DEFAULT_SPACE }} key={i}>
            <Grid item>
              <IconButton
                onClick={() => handleClickOpen(p.id)}
                color={"primary"}
              >
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
        )): <CircularProgress />}
    </Grid>
  );
};

export default AvatarsCollection;
