import { Avatar, ButtonGroup, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackupIcon from "@material-ui/icons/Backup";
import FaceIcon from "@material-ui/icons/Face";
import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import { deleteMatch, updateAvatar, uploadPictures } from "../../shared/api";
import { ColorContext } from "../../shared/colorContext";
import { AVATAR_SIZE, DEFAULT_SPACE } from "../../shared/constants";
import { LoadingContext } from "../../shared/loadingContext";
import { UserContext } from "../../shared/userContext";
import CenterHOC from "../shared/CenterHOC";
import Gallery from "./AvatarForm/Gallery";
import PlaceHolder from "../shared/Missing_avatar.svg";
import useTransparentPaperStyle from "../shared/useTransparentPaperStyle";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
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
