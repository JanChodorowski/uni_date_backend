import {Grid} from "@material-ui/core";
import React from "react";
import PictureUploader from "./PictureUploader";
import AvatarPicture from "./AvatarPicture";

const AvatarForm = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <PictureUploader></PictureUploader>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AvatarPicture></AvatarPicture>
        </Grid>
      </Grid>
    </>
  );
};

export default AvatarForm;
