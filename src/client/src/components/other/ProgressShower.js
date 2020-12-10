import React, { useContext } from "react";
import { LinearProgress } from "@material-ui/core";
import { LoadingContext } from "../../context/loadingContext";

const ProgressShower = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  return <>{isLoading && <LinearProgress />}</>;
};

export default ProgressShower;
