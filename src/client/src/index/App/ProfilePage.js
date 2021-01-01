import { Grid } from "@material-ui/core";
import React from "react";
import { DEFAULT_SPACE } from "../shared/constants";
import AvatarForm from "./shared/AvatarForm";
import UserForm from "./shared/UserForm";

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
        <Grid item style={{ maxWidth: "250px" }}>
          <UserForm></UserForm>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
