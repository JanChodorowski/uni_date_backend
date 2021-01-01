import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MatchModal({ isMatched, setIsMatched }) {
  const handleClose = () => {
    setIsMatched(false);
  };

  return (
    <>
      <Dialog
        open={isMatched}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            color={"primary"}
            style={{ fontWeight: "bold" }}
            variant="h1"
          >
            MATCHED!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
