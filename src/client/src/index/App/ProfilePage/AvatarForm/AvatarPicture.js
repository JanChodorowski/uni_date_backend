import { Avatar, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import React, { useContext, useState } from "react";
import { updateAvatar } from "../../../shared/api";
import { AVATAR_SIZE, DEFAULT_SPACE } from "../../../shared/constants";
import { LoadingContext } from "../../../shared/loadingContext";
import { UserContext } from "../../../shared/userContext";
import CenterHOC from "../../shared/CenterHOC";
import Gallery from "./AvatarPicture/Gallery";
import PlaceHolder from "../../ChatPage/shared/Missing_avatar.svg";
import useTransparentPaperStyle from "../../shared/useTransparentPaperStyle";
import RemoveAvatar from "./AvatarPicture/RemoveAvatar";

const AvatarPicture = ({ picturesToUpload }) => {
  const [user] = useContext(UserContext);
  const [chosenFileName, setChosenFileName] = useState(
    (user?.pictures &&
      user?.pictures.length > 0 &&
      user.pictures[0].fileName) ||
      ""
  );
  const paper = useTransparentPaperStyle();
  const [avatarPicture, setAvatarPicture] = useState(
    (user.pictures &&
      user.pictures.length > 0 &&
      user.pictures.some((img) => img.isAvatar) &&
      URL.createObjectURL(user.pictures.find((img) => img.isAvatar).blob)) ||
      PlaceHolder
  );

  const [isLoading, setIsLoading] = useContext(LoadingContext);

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
  const [activeStep, setActiveStep] = useState(0);

  const arePicturesToUploadEmpty = () => picturesToUpload.length === 0;

  return (
    <>
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
                      activeStep={activeStep}
                      setActiveStep={setActiveStep}
                    ></Gallery>
                  </CenterHOC>
                  {arePicturesToUploadEmpty() && (
                    <RemoveAvatar
                      chosenFileName={chosenFileName}
                      setChosenFileName={setChosenFileName}
                      setActiveStep={setActiveStep}
                      setAvatarPicture={setAvatarPicture}
                    ></RemoveAvatar>
                  )}
                </>
              </Grid>
              {arePicturesToUploadEmpty() && (
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
                      disabled={isLoading}
                      size="small"
                      startIcon={<FaceIcon></FaceIcon>}
                    >
                      CHOOSE AVATAR
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Paper>
        ))}
    </>
  );
};

export default AvatarPicture;
