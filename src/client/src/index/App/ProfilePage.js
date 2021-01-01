import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import { LoadingContext } from "../shared/loadingContext";
import { login, updateAvatar, updateUser, uploadPictures } from "../shared/api";
import Gallery from "./shared/Gallery";
import CenterPaperHOC from "./shared/CenterPaperHOC";
import { Avatar, Grid, Paper } from "@material-ui/core";
import CenterHOC from "./shared/CenterHOC";
import { makeStyles } from "@material-ui/core/styles";
import PlaceHolder from "./shared/Missing_avatar.svg";
import { UserContext } from "../shared/userContext";
import AvatarForm from "./shared/AvatarForm";
import UserForm from "./shared/UserForm";
import { DEFAULT_SPACE } from "../shared/constants";

const ProfilePage = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item style={{ marginBottom: DEFAULT_SPACE }}>
          <AvatarForm></AvatarForm>
        </Grid>
        <Grid item style={{ maxWidth: "250px" }}>
          <UserForm></UserForm>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
