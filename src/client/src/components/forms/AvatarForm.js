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
import { ColorContext } from "../../context/colorContext";
import { AVATAR_SIZE, DEFAULT_PADDING } from "../../shared/constants";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";
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
                fileContainerStyle={{
                  backgroundColor: isDark
                    ? "rgba(38, 50, 56, 0.7)"
                    : "rgba(255, 255, 255, 0.6)",
                }}
                buttonStyles={{
                  backgroundColor: "#03a9f4",
                  fontWeight: "bold",
                  padding: DEFAULT_PADDING,
                  margin: DEFAULT_PADDING,
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
                size="small"
              >
                Upload pictures
              </Button>
            </>
          </Grid>
        </Grid>
      </Paper>

      {!user?.pictures ||
        (user?.pictures?.length > 0 && (
          <Paper className={paper} style={{ marginTop: DEFAULT_PADDING }}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <>
                  <CenterHOC minHeight="0">
                    <Gallery setChosenFileName={setChosenFileName}></Gallery>
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
                <Grid item style={{ padding: DEFAULT_PADDING }}>
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
                  >
                    CHOOSE THE PICTURE ABOVE FOR AVATAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </>
  );
};

export default AvatarForm;
