import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import { LoadingContext } from "../../context/loadingContext";
import { login, uploadPictures } from "../../api";
import Gallery from "../other/Gallery";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { Grid, Paper } from "@material-ui/core";
import CenterHOC from "../hocs/CenterHOC";

const ProfilePage = () => {
  const [pictures, setPictures] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);

  const handlePictureChange = (newPictures) => {
    setPictures(newPictures);
  };

  const handleUpload = () => {
    setIsLoading(true);
    setIsUploaded(false);

    uploadPictures(pictures)
      .then((res) => {
        const { data } = res;
        if (data.isUploaded) {
          setIsUploaded(true);
          window.location.reload();
        } else {
          setIsUploaded(false);
        }
        window.location.reload();
      })
      .catch((e) => {
        setIsUploaded(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  return (
    <>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item>
          <Paper style={{ padding: "1rem" }}>
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
                    buttonStyles={{backgroundColor: "red", fontWeight: 'bold', padding: '1rem', margin: '1rem'}}
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
                    <Gallery></Gallery>
                  </CenterHOC>
                  <br />
                </>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
