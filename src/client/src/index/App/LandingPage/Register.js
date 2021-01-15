import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Zoom from "@material-ui/core/Zoom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, {useContext} from "react";
import RegisterForm from "./Register/RegisterForm";
import {LoadingContext} from "../../shared/loadingContext";

const Transition = React.forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} />
));

export default function Register({ latitude, longitude }) {
  const [open, setOpen] = React.useState(false);
    const [isLoading] = useContext(LoadingContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleClickOpen}
        size="small"
        startIcon={<ArrowUpwardIcon></ArrowUpwardIcon>}
        endIcon={<ArrowUpwardIcon></ArrowUpwardIcon>}
        disabled={isLoading}
      >
        Create New Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
        <DialogContent>
          <RegisterForm
            latitude={latitude}
            longitude={longitude}
          ></RegisterForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
