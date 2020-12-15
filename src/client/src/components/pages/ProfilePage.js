import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import { LoadingContext } from "../../context/loadingContext";
import { login, updateAvatar, updateUser, uploadPictures } from "../../api";
import Gallery from "../other/Gallery";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { Avatar, Grid, Paper } from "@material-ui/core";
import CenterHOC from "../hocs/CenterHOC";
import { makeStyles } from "@material-ui/core/styles";
import PlaceHolder from "../../images/Missing_avatar.svg";
import { UserContext } from "../../context/userContext";
import AvatarForm from "../forms/AvatarForm";
import UserForm from "../forms/UserForm";


const ProfilePage = () => {




  return (
    <>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item style={{padding: '1rem'}}>
          <AvatarForm></AvatarForm>
        </Grid>
        <Grid item style={{padding: '1rem'}}>
<UserForm></UserForm>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
