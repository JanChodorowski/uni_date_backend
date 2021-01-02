import { ButtonGroup, Divider, Snackbar, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";
import { NotInterested, Stars } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import { createRelation, getPicture, getProfiles } from "../shared/api";
import { DEFAULT_SPACE } from "../shared/constants";
import { calculateAge, getGenderColor } from "../shared/functions";
import { LoadingContext } from "../shared/loadingContext";
import { ProfilesContext } from "../shared/profilesContext";
import { UserContext } from "../shared/userContext";
import LabelValuePrinter from "./MatchPage/LabelValuePrinter";
import MatchGallery from "./MatchPage/MatchGallery";
import MatchModal from "./MatchPage/MatchModal";
import AvatarsCollection from "./shared/AvatarsCollection";

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
          <MatchGallery profileId={passiveSideUserId}></MatchGallery>
          {profiles &&
            Array.isArray(profiles) &&
            profiles.length > 0 &&
            profiles.find((p) => p.id === passiveSideUserId) &&
            profiles.find((p) => p.id === passiveSideUserId)?.userName && (
              <>
                <Typography
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "bold",
                    padding: DEFAULT_SPACE,
                    color: getGenderColor(
                      profiles.find((p) => p.id === passiveSideUserId)?.gender
                    ),
                  }}
                >
                  {`${
                    profiles.find((p) => p.id === passiveSideUserId)?.userName
                  } ` || ""}
                  {calculateAge(
                    profiles.find((p) => p.id === passiveSideUserId)
                      ?.dateOfBirth
                  ) || ""}
                </Typography>
                <Divider></Divider>
              </>
            )}

          {profiles.find((p) => p.id === passiveSideUserId)?.description && (
            <>
              <Typography style={{ padding: DEFAULT_SPACE }}>
                {profiles.find((p) => p.id === passiveSideUserId)
                  ?.description || ""}
              </Typography>
              <Divider></Divider>
            </>
          )}

          {profiles.find((p) => p.id === passiveSideUserId) &&
            profiles.find((p) => p.id === passiveSideUserId).university && (
              <>
                <LabelValuePrinter
                  label="University"
                  value={
                    profiles.find((p) => p.id === passiveSideUserId)
                      ?.university || ""
                  }
                ></LabelValuePrinter>
                <LabelValuePrinter
                  label="Filed of study"
                  value={
                    profiles.find((p) => p.id === passiveSideUserId)
                      ?.fieldOfStudy || ""
                  }
                ></LabelValuePrinter>
                <LabelValuePrinter
                  label="Already graduated?"
                  value={
                    profiles.find((p) => p.id === passiveSideUserId)
                      ?.isGraduated
                      ? "yes"
                      : "no"
                  }
                ></LabelValuePrinter>

                <Divider></Divider>
              </>
            )}
          <LabelValuePrinter
            label="City"
            value={profiles.find((p) => p.id === passiveSideUserId)?.city || ""}
          ></LabelValuePrinter>
          <Divider></Divider>
          <LabelValuePrinter
            label="Interests"
            value={
              profiles.find((p) => p.id === passiveSideUserId)?.interests || []
            }
          ></LabelValuePrinter>
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
      </Snackbar>
    </>
  );
};

export default MatchPage;
