import { MenuItem, Paper, TextField } from "@material-ui/core";

import React, { useContext, useReducer } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../context/userContext";

const genderEnum = {
  Male: 1,
  Female: 2,
  Other: 3,
};

const UserForm = () => {
  const [user, setUser] = useContext(UserContext);

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
    console.log("submitted", state);
  };

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
          name="city"
          value={city}
          label="City"
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
