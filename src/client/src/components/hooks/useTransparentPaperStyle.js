import {useState, useEffect, useContext} from "react";
import {ColorContext} from "../../context/colorContext";
import {makeStyles} from "@material-ui/core/styles";

const useTransparentPaperStyle = () => {
    const [isDark] = useContext(ColorContext);
    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: "1rem",
            backgroundColor: isDark
                ? "rgba(38, 50, 56, 0.7)"
                : "rgba(255, 255, 255, 0.6)",
        },
    }));

    return useStyles().paper
};

export default useTransparentPaperStyle;
