import {
  FormControlLabel,
  FormGroup,
  MenuItem,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";

import React, { useContext, useReducer } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { register, updateUser } from "../../api";
import { LoadingContext } from "../../context/loadingContext";
import ChipInput from "material-ui-chip-input";
import { makeStyles } from "@material-ui/core/styles";
import { ColorContext } from "../../context/colorContext";
const genderEnum = {
  Male: 1,
  Female: 2,
  Other: 3,
};

const UserForm = () => {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const initialState = {
    userName: user.userName || "",
    university: user.university || "",
    description: user.description || "",
    gender: user.gender || "",
    dateOfBirth:
      (user.dateOfBirth !== "1970-01-01" && user.dateOfBirth) || null,
    city: user.city || "",
    interests: user.interests || [],
    fieldOfStudy: user.fieldOfStudy || "",
    isGraduated: user.isGraduated || false,
  };
  const [isDark] = useContext(ColorContext);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "1rem",
      backgroundColor: isDark
        ? "rgba(38, 50, 56, 0.7)"
        : "rgba(255, 255, 255, 0.6)",
    },
  }));
  const { paper } = useStyles();
  function reducer(state, { field, value }) {
    return { ...state, [field]: value };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value: value });
  };
  const onDateChange = (value) => {
    dispatch({ field: "dateOfBirth", value });
  };
  const onInterestsChange = (value) => {
    dispatch({ field: "interests", value });
  };
  const {
    userName,
    description,
    gender,
    university,
    dateOfBirth,
    city,
    interests,
    fieldOfStudy,
    isGraduated,
  } = state;
  const onIsGraduatedChange = () => {
    dispatch({ field: "isGraduated", value: !isGraduated });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    updateUser(state)
      .then((res) => {
        setUser({ ...user, ...state });
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Paper className={paper}>
        <TextField
          name="university"
          value={university}
          label="University"
          fullWidth
          onChange={onChange}
        />
        {university && (
          <>
            <br />
            <br />
            <TextField
              name="fieldOfStudy"
              value={fieldOfStudy}
              label="Field of study"
              fullWidth
              onChange={onChange}
            />
            <br />
            <br />
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={isGraduated}
                    onChange={onIsGraduatedChange}
                    name="isGraduated"
                    color="primary"
                  />
                }
                label="Already graduated?"
              />
            </FormGroup>
          </>
        )}
      </Paper>
      <br />
      <Paper className={paper}>
        <TextField
          name="userName"
          value={userName}
          label="Name"
          fullWidth
          onChange={onChange}
        />
        <br />
        <br />
        <TextField
          name="description"
          label="Description"
          multiline
          fullWidth
          rows={6}
          value={description}
          onChange={onChange}
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          name="gender"
          select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onChange}
        >
          {Object.entries(genderEnum).map(([k, v]) => (
            <MenuItem key={v} value={k}>
              {k}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="dateOfBirth"
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Date of birth"
            value={dateOfBirth}
            onChange={onDateChange}
            fullWidth
            maxDate={maxDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <ChipInput
          fullWidth
          variant="filled"
          name="interests"
          label="Interests"
          blurBehavior="add"
          // defaultValue={(user?.interests && user?.interests.length > 0 && user.interests.map(interest => interest.name)) || []}
          defaultValue={interests}
          onChange={onInterestsChange}
        />{" "}
        <br />
        <br />
        <TextField
          name="city"
          value={city}
          label="City"
          fullWidth
          onChange={onChange}
        />
      </Paper>
      <br />
      <Paper className={paper}>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          // disabled={formik.isSubmitting}
        >
          UPDATE DATA
        </Button>
      </Paper>
    </form>
  );
};

export default UserForm;
