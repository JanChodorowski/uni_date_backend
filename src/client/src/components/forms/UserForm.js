import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getPicture, getUser, login } from "../../api";
import { Grid, IconButton, Input, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import PasswordVisibilityBtn from "../buttons/PasswordVisibilityBtn";
import { basicValidation } from "../../shared/constants";
import { UserContext } from "../../context/userContext";
import { LoadingContext } from "../../context/loadingContext";
import {Autocomplete} from "@material-ui/lab";
import {allUniversities} from "../../allUniversities";

const validationSchema = yup.object(basicValidation);

const LoginForm = () => {

    const [user, setUser] = useContext(UserContext);
    const [isLoading, setIsLoading] = useContext(LoadingContext);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            userName: user.userName || "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {

        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="userName"
                    name="userName"
                    label="Name"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                />
                <br />
                <br />

                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={allUniversities.map((option) => option.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
               {/*<UniversityAutoComplete></UniversityAutoComplete>*/}
                <br />

                <br />

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    disabled={formik.isSubmitting}
                >
                    UPDATE
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
