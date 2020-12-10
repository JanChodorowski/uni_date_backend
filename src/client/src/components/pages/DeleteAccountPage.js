import React from "react";
import CenterHOC from "../hocs/CenterHOC";
import { Grid, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CenterPaperHOC from "../hocs/CenterPaperHOC";

const DeleteAccountPage = () => {
  return (
    <>
      <CenterPaperHOC>
        <Typography>Are you sure you want to delete your account?</Typography>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          // onClick={handleClickOpen}
        >
          YES
        </Button>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          // onClick={handleClickOpen}
        >
          NO
        </Button>
      </CenterPaperHOC>
    </>
  );
};

export default DeleteAccountPage;
