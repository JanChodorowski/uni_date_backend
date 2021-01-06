import { Avatar, ButtonGroup, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackupIcon from "@material-ui/icons/Backup";
import FaceIcon from "@material-ui/icons/Face";
import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import {
  deleteMatch,
  deletePicture,
  updateAvatar,
  uploadPictures,
} from "../../shared/api";
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

const RemoveAvatar = ({ chosenFileName,setChosenFileName,setActiveStep,setAvatarPicture }) => {
  const [user, setUser] = useContext(UserContext);

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const [isAvatarReadyToDelete, setIsAvatarReadyToDelete] = useState(false);
  const handleRemovePictureClick = () => {
    // setIsLoading(true);
    // deletePicture(chosenFileName)
    //   .then((res) => {
    //     const { data } = res;
    //     if (!res?.data?.isRemoved) {
    //       return;
    //     }
    //   })
    //   .catch((e) => {})
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
      console.log('chosenFileName',chosenFileName)
      const filteredPictures = user.pictures.filter(
          (p) => p.fileName !== chosenFileName
      );
      console.log('filteredPictures',filteredPictures)
      // const userWithFilteredPictures = (user.pictures = filteredPictures);

      setUser(prevUser => {return {...prevUser, pictures: filteredPictures}});

      setIsAvatarReadyToDelete(false)

      if(user.pictures.find(p => p.fileName === chosenFileName).isAvatar){
          setAvatarPicture(PlaceHolder)
      }
      setChosenFileName((filteredPictures.length > 0 && filteredPictures[0].fileName) || '')
      setActiveStep(0)
// const {pictures} = user
//       const index = pictures.findIndex((p) => p.fileName === chosenFileName);
//       pictures[index].messages = data;
//       setUser(user);
//
      // const filteredPictures = user.pictures.filter(
      //     (p) => p.fileName !== chosenFileName
      // );
      // const userWithFilteredPictures = (user.pictures = filteredPictures);
      // setUser(userWithFilteredPictures);
    return () => {
      setIsLoading(false);
    };
  };

  return (
    <div style={{ paddingBottom: DEFAULT_SPACE }}>
      {!isAvatarReadyToDelete ? (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
          onClick={() => setIsAvatarReadyToDelete(true)}
          size="small"
          startIcon={<DeleteIcon></DeleteIcon>}
        >
          REMOVE CURRENT PICTURE
        </Button>
      ) : (
        <ButtonGroup fullWidth>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            size="large"
            onClick={handleRemovePictureClick}
            startIcon={<WarningIcon></WarningIcon>}
          >
            YES, REMOVE PICTURE ABOVE
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setIsAvatarReadyToDelete(false)}
            endIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
          >
            NO
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default RemoveAvatar;
