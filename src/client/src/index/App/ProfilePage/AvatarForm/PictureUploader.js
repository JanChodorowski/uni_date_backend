import { Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackupIcon from "@material-ui/icons/Backup";
import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import { uploadPictures } from "../../../shared/api";
import { ColorContext } from "../../../shared/colorContext";
import { DEFAULT_SPACE } from "../../../shared/constants";
import { LoadingContext } from "../../../shared/loadingContext";
import useTransparentPaperStyle from "../../shared/useTransparentPaperStyle";

const PictureUploader = ({ picturesToUpload, setPicturesToUpload }) => {
  const [isDark] = useContext(ColorContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const paper = useTransparentPaperStyle();

  const [isUploadBtnClicked, setIsUploadBtnClicked] = useState(false);

  const handlePictureChange = (newPictures) => {
    setPicturesToUpload(newPictures);
  };

  const handleUpload = () => {
    setIsLoading(true);
    setIsUploadBtnClicked(true);

    uploadPictures(picturesToUpload)
      .then((res) => {})
      .catch((e) => {
        setIsUploadBtnClicked(false);
      })
      .finally(() => {
        setIsLoading(false);
        window.location.reload();
      });
  };

  return (
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

      {picturesToUpload.length > 0 && (
        <Paper className={paper}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading || isUploadBtnClicked}
            onClick={handleUpload}
            size="small"
            startIcon={<BackupIcon></BackupIcon>}
          >
            Upload pictures
          </Button>
        </Paper>
      )}
    </>
  );
};

export default PictureUploader;
