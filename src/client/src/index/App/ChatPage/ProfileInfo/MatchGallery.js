import Button from "@material-ui/core/Button";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import React, { useContext, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { getPicture } from "../../../shared/api";
import { DEFAULT_IMAGE_SIZE } from "../../../shared/constants";
import { compareFileNames } from "../../../shared/functions";
import { LoadingContext } from "../../../shared/loadingContext";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: DEFAULT_IMAGE_SIZE,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    width: "100%",
    maxHeight: DEFAULT_IMAGE_SIZE,
    display: "block",
    overflow: "hidden",
    objectFit: "cover",
  },
}));

function MatchGallery({ profileId, profiles, setProfiles }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const maxSteps =
    (profiles &&
      profiles &&
      profiles.find((p) => p.id === profileId) &&
      profiles
        .find((p) => p.id === profileId)
        .pictures.filter((p) => p.hasOwnProperty("blob")).length) ||
    0;
  useEffect(() => {
    if (maxSteps) {
      return;
    }

    let mounted = true;
    setIsLoading(true);

    let profileBlobsPromises = profiles
      .find((p) => p.id === profileId)
      .pictures.map((p) => {
        return getPicture(p.fileName);
      });

    Promise.all(profileBlobsPromises)
      .then((results) => {
        const picturesDataWithBlobs = results
          .map((r) => {
            return {
              ...profiles
                .find((p) => p.id === profileId)
                .pictures.find((p) => p.fileName === r.headers.filename),
              blob: r.data,
            };
          })
          .sort(compareFileNames);
        const index = profiles.findIndex((p) => p.id === profileId);
        profiles[index].pictures = picturesDataWithBlobs;

        setProfiles(profiles);
      })
      .catch((e) => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      {isLoading && <CircularProgress />}
      {maxSteps ? (
        <>
          <div className={classes.root}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {profiles
                .find((p) => p.id === profileId)
                .pictures.map((img, index) => (
                  <div key={img.fileName}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <img
                        className={classes.img}
                        src={URL.createObjectURL(img.blob)}
                        alt={img.blob}
                      />
                    ) : null}
                  </div>
                ))}
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default MatchGallery;
