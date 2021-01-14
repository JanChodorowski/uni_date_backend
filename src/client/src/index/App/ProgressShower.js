import { LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { LoadingContext } from "../shared/loadingContext";

const ProgressShower = () => {
  const [isLoading] = useContext(LoadingContext);

  return (
    <>
      {isLoading && (
        <LinearProgress style={{ position: "fixed", zIndex: "1100" }} />
      )}
    </>
  );
};

export default ProgressShower;
