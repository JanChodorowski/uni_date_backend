import React, {useContext, useState} from "react";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import {LoadingContext} from "../../context/loadingContext";
import {login, uploadPictures} from "../../api";
const ProfilePage = () => {
    const [pictures, setPictures] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)

    const handlePictureChange = (newPictures) => {
        setPictures(newPictures)
        console.log('pictures',pictures)
    };

    const handleUpload = () => {
        setIsLoading(true);
        setIsUploaded(false)

        uploadPictures(pictures)
            .then((res) => {
                const { data } = res;
                if (data.isUploaded) {
                    setIsUploaded(true)
                } else {
                    setIsUploaded(false)
                }
            })
            .catch((e) => {
                setIsUploaded(false)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const [isLoading, setIsLoading] = useContext(LoadingContext);

    return (
    <>
      <ImageUploader
          withIcon={true}
          buttonText='Upload pictures'
          onChange={handlePictureChange}
          imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
          maxFileSize={5242880}
          withPreview
      />
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
    </>
  );
};

export default ProfilePage;
