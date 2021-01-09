import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import PictureUploader from "./AvatarForm/PictureUploader";
import AvatarPicture from "./AvatarForm/AvatarPicture";

const AvatarForm = ({ picturesToUpload, setPicturesToUpload }) => {
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
              <PictureUploader
                picturesToUpload={picturesToUpload}
                setPicturesToUpload={setPicturesToUpload}
              ></PictureUploader>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <AvatarPicture picturesToUpload={picturesToUpload}></AvatarPicture>
        </Grid>
      </Grid>
    </>
  );
};

export default AvatarForm;
