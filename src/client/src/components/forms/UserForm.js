import { MenuItem, Paper, TextField } from "@material-ui/core";

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
    dateOfBirth: user.dateOfBirth || null,
    city: user.city || "",
    interests: user.interests || [],
  };

  function reducer(state, { field, value }) {
    return { ...state, [field]: value };
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  const onDateChange = (value) => {
    dispatch({ field: "dateOfBirth", value });
  };
  const onInterestsChange = (interests) => {
    dispatch({ field: "interests", value: interests });
  }
  const {
    userName,
    description,
    gender,
    university,
    dateOfBirth,
    city,
    interests,
  } = state;
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

    console.log("submitted", state);
  };

  var maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <Paper style={{ padding: "1rem" }}>
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
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
          name="university"
          value={university}
          label="University"
          fullWidth
          onChange={onChange}
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
            label="Interests"
            blurBehavior="add"
            defaultValue={(user?.interests && user?.interests.length > 0 && user.interests.map(interest => interest.name)) || []}
            onChange={onInterestsChange}
        /> <br />
        <br />
        <TextField
            name="city"
            value={city}
            label="City"
            fullWidth
            onChange={onChange}
        />
        <br />
        <br />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          // disabled={formik.isSubmitting}
        >
          UPDATE DATA
        </Button>
      </form>
    </Paper>
  );
};

export default UserForm;
