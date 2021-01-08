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

const PictureUploader = () => {
  const [picturesToUpload, setPicturesToUpload] = useState([]);

  const [isDark] = useContext(ColorContext);

  const paper = useTransparentPaperStyle();
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const handlePictureChange = (newPictures) => {
    setPicturesToUpload(newPictures);
  };

  const handleUpload = () => {
    setIsLoading(true);

    uploadPictures(picturesToUpload)
      .then((res) => {})
      .catch((e) => {})
      .finally(() => {
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
                    disabled={isLoading || picturesToUpload.length === 0}
                    onClick={handleUpload}
                    size="small"
                    startIcon={<BackupIcon></BackupIcon>}
                  >
                    Upload pictures
                  </Button>{" "}
                </Paper>
              </>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default PictureUploader;
