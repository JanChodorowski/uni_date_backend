import { LinearProgress } from "@material-ui/core";
import React, { useContext } from "react";
import { LoadingContext } from "../shared/loadingContext";

const ProgressShower = () => {
  const [isLoading] = useContext(LoadingContext);

  return (
    <>
      {isLoading && (
        <LinearProgress />
      )}
    </>
  );
};

export default ProgressShower;
