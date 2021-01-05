import { Avatar, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackupIcon from "@material-ui/icons/Backup";
import FaceIcon from "@material-ui/icons/Face";
import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import { updateAvatar, uploadPictures } from "../../shared/api";
import { ColorContext } from "../../shared/colorContext";
import { AVATAR_SIZE, DEFAULT_SPACE } from "../../shared/constants";
import { LoadingContext } from "../../shared/loadingContext";
import { UserContext } from "../../shared/userContext";
import CenterHOC from "../shared/CenterHOC";
import Gallery from "./AvatarForm/Gallery";
import PlaceHolder from "../shared/Missing_avatar.svg";
import useTransparentPaperStyle from "../shared/useTransparentPaperStyle";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: "50rem",
//     height: "50rem",
//   },
// }));

const AvatarForm = () => {
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

  const paper = useTransparentPaperStyle();
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
                <>
                  <ImageUploader
                    withIcon={false}
                    buttonText="CHOOSE PICTURES TO UPLOAD"
                    onChange={handlePictureChange}
                    imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                    maxFileSize={5242880}
                    withPreview
                    label=""
                    fileContainerStyle={{
                      backgroundColor: isDark
                        ? "rgba(38, 50, 56, 0.7)"
                        : "rgba(255, 255, 255, 0.6)",
                    }}
                    buttonStyles={{
                      backgroundColor: "#03a9f4",
                      fontWeight: "bold",
                      padding: DEFAULT_SPACE,
                      margin: DEFAULT_SPACE,
                    }}
                  />
                </>
              </Grid>
              <Grid item>
                <>
                  <Paper className={paper}>

                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={isLoading || pictures.length === 0}
                    onClick={handleUpload}
                    size="small"
                    startIcon={<BackupIcon></BackupIcon>}
                  >
                    Upload pictures
                  </Button>          </Paper>

                </>
              </Grid>
            </Grid>
        </Grid>
        <Grid item>
          {!user?.pictures ||
            (user?.pictures?.length > 0 && (
              <Paper className={paper} style={{ marginTop: DEFAULT_SPACE }}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <>
                      <CenterHOC minHeight="0">
                        <Gallery
                          setChosenFileName={setChosenFileName}
                        ></Gallery>
                      </CenterHOC>
                    </>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item style={{ padding: DEFAULT_SPACE }}>
                      <Avatar
                        alt={user.userName}
                        src={avatarPicture}
                        style={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
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
                        size="small"
                        startIcon={<FaceIcon></FaceIcon>}
                      >
                        CHOOSE AVATAR
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default AvatarForm;
