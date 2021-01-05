import { Grid } from "@material-ui/core";
import React from "react";
import { DEFAULT_SPACE } from "../shared/constants";
import AvatarForm from "./ProfilePage/AvatarForm";
import UserForm from "./ProfilePage/UserForm";

const ProfilePage = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item style={{ marginBottom: DEFAULT_SPACE }}>
          <AvatarForm></AvatarForm>
        </Grid>
        <Grid item>
          <UserForm></UserForm>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
