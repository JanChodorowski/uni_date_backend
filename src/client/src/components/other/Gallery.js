import React, { useContext, useReducer, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { UserContext } from "../../context/userContext";

const imgSize = "400px";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: imgSize,
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
    maxHeight: imgSize,
    display: "block",
    overflow: "hidden",
    objectFit: "cover",
  },
}));

function Gallery({ setChosenFileName }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const [user, setUser] = useContext(UserContext);
  const maxSteps = user?.pictures?.length;

  const handleNext = () => {
    setChosenFileName(user.pictures[activeStep + 1].fileName);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setChosenFileName(user.pictures[activeStep - 1].fileName);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setChosenFileName(user.pictures[activeStep].fileName);
    setActiveStep(step);
  };

  return (
    <>
      {maxSteps ? (
        <>
          <div className={classes.root}>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {user.pictures.map((img, index) => (
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

export default Gallery;
