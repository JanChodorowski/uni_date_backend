import { ButtonGroup, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import { NotInterested, Stars } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../shared/loadingContext";
import { ProfilesContext } from "../shared/profilesContext";
import { UserContext } from "../shared/userContext";
import { createRelation, getPicture, getProfiles } from "../shared/api";
import AvatarsCollection from "./shared/AvatarsCollection";
import ProfileInfo from "./shared/ProfileInfo";
import MatchModal from "./MatchPage/MatchModal";

const Transition = React.forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} />
));

const MatchPage = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);
  const [user] = useContext(UserContext);

  const [areMoreProfilesNeeded, setAreMoreProfilesNeeded] = useState(null);

  const checkIfProfilesAlreadyFetched = () => profiles && profiles.length > 0;

  useEffect(() => {
    if (checkIfProfilesAlreadyFetched()) {
      return;
    }

    let mounted = true;

    setIsLoading(true);

    getProfiles(user)
      .then((res) => {
        let profilesData = res.data;

        if (!(profilesData && mounted)) {
          throw new Error();
        }

        let matchesAvatarsPromises = profilesData
          .map((pd) => {
            const picture = pd.pictures.find((p) => p.isAvatar);
            if (picture) {
              return picture.fileName;
            }
            return null;
          })
          .filter((fileNameOrUndefined) => fileNameOrUndefined)
          .map((fileName) => {
            return getPicture(fileName);
          });

        Promise.all(matchesAvatarsPromises)
          .then((results) => {
            results.forEach((r) => {
              profilesData.find((pd) =>
                pd.pictures.find((p) => p.fileName === r.headers.filename)
              ).avatar = r.data;
            });
          })
          .catch((e) => {})
          .finally(() => {
            setProfiles(profilesData);
            setIsLoading(false);
          });
      })
      .catch((e) => {
        setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [areMoreProfilesNeeded]);

  const [open, setOpen] = useState(false);
  const [passiveSideUserId, setPassiveSideUserId] = useState("");

  const handleClickOpen = (profileId) => {
    setPassiveSideUserId(profileId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLiking, setIsLiking] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const handleRelationClick = (isLiking) => {
    setIsLoading(true);
    createRelation(passiveSideUserId, isLiking)
      .then((res) => {
        console.table(res);
        setIsMatched(res?.data?.isMatched);
        setOpen(false);
        setProfiles(profiles.filter((p) => p.id !== passiveSideUserId));
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
        setIsLiking(isLiking);
        setSnackbarOpen(true);
      });
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
      {checkIfProfilesAlreadyFetched() && (
        <>
          <AvatarsCollection
            collection={profiles}
            handleClickOpen={handleClickOpen}
          ></AvatarsCollection>
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="choose profile"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <ProfileInfo
            profiles={profiles}
            setProfiles={setProfiles}
            passiveSideUserId={passiveSideUserId}
          ></ProfileInfo>
          <ButtonGroup fullWidth>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              size="large"
              onClick={() => handleRelationClick(false)}
              startIcon={<NotInterested></NotInterested>}
            >
              DISLIKE
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              onClick={() => handleRelationClick(true)}
              endIcon={<Stars></Stars>}
            >
              LIKE
            </Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
      <MatchModal
        isMatched={isMatched}
        setIsMatched={setIsMatched}
      ></MatchModal>
        {!isMatched && (<>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {isLiking ? "LIKE" : "DISLIKE"}
        </Alert>
      </Snackbar></>)}
    </>
  );
};

export default MatchPage;
