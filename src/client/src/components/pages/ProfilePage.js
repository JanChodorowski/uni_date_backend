import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import { LoadingContext } from "../../context/loadingContext";
import { login, uploadPictures } from "../../api";
import Gallery from "../other/Gallery";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { Grid } from "@material-ui/core";
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
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
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <ImageUploader
            withIcon={true}
            buttonText="Choose pictures"
            onChange={handlePictureChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
            maxFileSize={5242880}
            withPreview
          />
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <CenterPaperHOC minHeight="0">
            <Gallery></Gallery>
          </CenterPaperHOC>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
