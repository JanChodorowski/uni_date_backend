import React, { useContext, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import { LoadingContext } from "../../context/loadingContext";
import { login, uploadPictures } from "../../api";
import Gallery from "../other/Gallery";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import {Avatar, Grid, Paper} from "@material-ui/core";
import CenterHOC from "../hocs/CenterHOC";
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from "../../context/userContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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

const handleAvatarChange = () => {
  // let picturesData = user.pictures.map(p => {
  //   return {
  //     p.
  //   }
  // })
  // let modifiedUser = user
  // modifiedUser.picturesData.forEach(pd => {
  //   pd.isAvatar = false;
  // })
  // modifiedUser.picturesData[""]
  // setUser()
}

const ProfilePage = () => {
  const [pictures, setPictures] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const handlePictureChange = (newPictures) => {
    setPictures(newPictures);
  };
  const classes = useStyles();

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
        window.location.reload();
      })
      .catch((e) => {

      })
      .finally(() => {setIsUploaded(false);
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
                    <Gallery></Gallery>
                  </CenterHOC>
                  <br />
                </>
              </Grid>
              <Grid
                  item
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
              >
                <Grid item style={{padding: '1rem'}}>
                <Avatar alt="Remy Sharp" src={URL.createObjectURL(user.blobs[0])} className={classes.large} /></Grid> <Grid item>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={handleAvatarChange}
                >
                  CHOOSE THE PICTURE ABOVE FOR AVATAR
                </Button></Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
