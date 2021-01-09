import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { DEFAULT_SPACE } from "../shared/constants";
import AvatarForm from "./ProfilePage/AvatarForm";
import UserForm from "./ProfilePage/UserForm";

const ProfilePage = () => {
  const [picturesToUpload, setPicturesToUpload] = useState([]);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item style={{ marginBottom: DEFAULT_SPACE }}>
          <AvatarForm
            picturesToUpload={picturesToUpload}
            setPicturesToUpload={setPicturesToUpload}
          ></AvatarForm>
        </Grid>
        {picturesToUpload.length === 0 && (
          <Grid item>
            <UserForm></UserForm>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProfilePage;
