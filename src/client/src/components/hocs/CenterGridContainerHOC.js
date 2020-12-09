
import React, { useContext, useLayoutEffect, useRef } from "react";
import {Grid, Paper} from "@material-ui/core";

const CenterGridContainerHOC = ({children}) => {

    return (
        <>
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: "80vh" }}
            >

            {children}
            </Grid>
        </>
    );
};

export default CenterGridContainerHOC;
