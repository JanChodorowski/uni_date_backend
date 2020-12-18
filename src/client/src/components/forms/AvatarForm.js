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
import {ColorContext} from "../../context/colorContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const ProfilePage = () => {
  const [pictures, setPictures] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [user] = useContext(UserContext);
  const [chosenFileName, setChosenFileName] = useState(
    (user?.pictures &&
      user?.pictures.length > 0 &&
      user.pictures[0].fileName) ||
      ""
  );
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "1rem",
      backgroundColor: isDark
          ? "rgba(38, 50, 56, 0.7)"
          : "rgba(255, 255, 255, 0.6)"
    },
  }));
  const {paper} = useStyles()
  const [avatarPicture, setAvatarPicture] = useState(
    (user.pictures &&
      user.pictures.length > 0 &&
      user.pictures.some((img) => img.isAvatar) &&
      URL.createObjectURL(user.pictures.find((img) => img.isAvatar).blob)) ||
      PlaceHolder
  );

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const handlePictureChange = (newPictures) => {
    setPictures(newPictures);
  };
  const classes = useStyles();

  const handleAvatarChange = () => {
    user.pictures.forEach((img) => (img.isAvatar = false));
    user.pictures.find(
      (img) => img.fileName === chosenFileName
    ).isAvatar = true;
    setIsLoading(true);
    updateAvatar(chosenFileName)
      .then(() => {
        setAvatarPicture(
          URL.createObjectURL(
            user.pictures.find((img) => img.fileName === chosenFileName).blob
          )
        );
      })
      .catch(setIsLoading(false))
      .finally(setIsLoading(false));
  };

  const handleUpload = () => {
    setIsLoading(true);
    setIsUploaded(false);

    uploadPictures(pictures)
      .then((res) => {
        const { data } = res;
        if (data.isUploaded) {
          setIsUploaded(true);
        } else {
          setIsUploaded(false);
        }
      })
      .catch((e) => {})
      .finally(() => {
        setIsUploaded(false);
        setIsLoading(false);
        window.location.reload();
      });
  };

  return (
    <Paper className={paper}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <>
            <ImageUploader
              withIcon={false}
              buttonText="CHOOSE PICTURES TO UPLOAD"
              onChange={handlePictureChange}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
              maxFileSize={5242880}
              withPreview
              label=""
              buttonStyles={{
                backgroundColor: "red",
                fontWeight: "bold",
                padding: "1rem",
                margin: "1rem",
              }}
            />
          </>
        </Grid>
        <Grid item>
          <>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading || pictures.length === 0}
              onClick={handleUpload}
            >
              Upload pictures
            </Button>
            <br />
            <br />
          </>
        </Grid>
        <Grid item>
          <>
            <CenterHOC minHeight="0">
              <Gallery setChosenFileName={setChosenFileName}></Gallery>
            </CenterHOC>
            <br />
          </>
        </Grid>
        {!user?.pictures ||
          (user?.pictures?.length > 0 && (
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item style={{ padding: "1rem" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={avatarPicture}
                  className={classes.large}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleAvatarChange}
                  disabled={
                    // (chosenPictureIdx === activeStep &&
                    //   chosenFileName !== PlaceHolder) ||
                    isLoading
                  }
                >
                  CHOOSE THE PICTURE ABOVE FOR AVATAR
                </Button>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

export default ProfilePage;
