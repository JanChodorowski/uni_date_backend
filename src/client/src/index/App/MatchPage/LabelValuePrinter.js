import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { DEFAULT_SPACE } from "../../shared/constants";


const LabelValuePrinter = ({ label, value }) => {
  const validateArgs = () => {
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    return !!(label && value);
  };
  return (
    <>
      {validateArgs() && (
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ padding: DEFAULT_SPACE }}
        >
          <Grid item>
            <Typography>{label}</Typography>
          </Grid>
          <Grid item>
            {Array.isArray(value) ? (
              value.map((v) => {
                return <Typography key={v}>{v}</Typography>;
              })
            ) : (
              <Typography>{value}</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LabelValuePrinter;
