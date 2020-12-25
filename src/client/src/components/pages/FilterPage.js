import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {getPicture, getUser, login, updateUser} from "../../api";
import {
  Checkbox,
  Chip,
  FormControl, FormControlLabel, FormGroup, FormLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment, InputLabel,
  makeStyles, MenuItem,
  Paper, Select,
  Slider,
  Typography
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import PasswordVisibilityBtn from "../buttons/PasswordVisibilityBtn";
import {BASIC_VALIDATION, DARK_TRANSPARENT, DEFAULT_SPACE, LIGHT_TRANSPARENT} from "../../shared/constants";
import { UserContext } from "../../context/userContext";
import { LoadingContext } from "../../context/loadingContext";
import {capitalizeFirstLetter, compareFileNames} from "../../shared/functions";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";
import AvatarForm from "../forms/AvatarForm";
import UserForm from "../forms/UserForm";
import {grey} from "@material-ui/core/colors";
import {ColorContext} from "../../context/colorContext";

// const validationSchema = yup.object(BASIC_VALIDATION);


const FilterPage = () => {
  const [areCredentialsCorrect, setAreCredentialsCorrect] = useState(true);

  const [isDark] = useContext(ColorContext);

  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);


  const handleCredentials = (status) => {
    setIsLoading(status);
    setAreCredentialsCorrect(status);
  };

  const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      // marginTop: theme.spacing(3),
    },
    sliderLabel: {
      paddingBottom: '2rem',
      color: isDark
          ?  grey["300"]
          :  grey["600"],
    }
  });
  const classes = useStyles();

  const minYears = 18
  const [yearsFilter, setYearsFilter] = useState([user.ageFromFilter || minYears, user.ageToFilter || 100]);

  const handleYearsChange = (event, newYears) => {
    setYearsFilter(newYears);
  };

  const maxDistanceLimit = 1000;
  const [maxDistance, setMaxDistance] = useState( maxDistanceLimit);


  const handleMaxDistanceChange = (event, newMaxDistance) => {
    setMaxDistance(newMaxDistance);
  };

  // const [genderFilters, setGenderFilters] = React.useState([user.ageFromFilter || 18, user.ageToFilter || 100]);

  const [genderFilters, setGenderFilters] = useState({
    Male: true,
    Female: true,
    Other: true,
  });

  // const handleGenderChange = ()

  const formik = useFormik({
    initialValues: {
      universityFilter: (user.universityFilter && capitalizeFirstLetter(user.universityFilter)) || "",
      interestFilter: (user.interestFilter && capitalizeFirstLetter(user.interestFilter)) || "",
      cityFilter: (user.cityFilter && capitalizeFirstLetter(user.cityFilter)) || "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      handleCredentials(true);
console.log('user',user)
      const extendedValues = {
        ...values,
        universityFilter: values.universityFilter.trim(),
        interestFilter: values.interestFilter.trim(),
        cityFilter: values.cityFilter.trim(),
        genderFilters,
        yearsFilter,
      };
      updateUser(genderFilters)
          .then((res) => {
            setUser({ ...user, ...genderFilters });
          })
          .catch((e) => {})
          .finally(() => {
            setIsLoading(false);
          })
    },
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  const paper = useTransparentPaperStyle();
const paperPadding = '1.5rem'

  const handleChange = (event) => {
    setGenderFilters({ ...genderFilters, [event.target.name]: event.target.checked });
  };

  const { Male, Female, Other } = genderFilters;

  return (
      <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
      >
        <Grid item style={{ marginBottom: DEFAULT_SPACE,    maxWidth: 400,flexGrow: 1
        }}>


        <form onSubmit={formik.handleSubmit} >
          <Paper className={paper} style={{ paddingLeft: paperPadding, paddingRight: paperPadding}}>
          <TextField
              fullWidth
              id="universityFilter"
              name="universityFilter"
              label="University filter"
              value={formik.values.universityFilter}
              onChange={formik.handleChange}
              error={formik.touched.universityFilter && Boolean(formik.errors.universityFilter)}
              helperText={formik.touched.universityFilter && formik.errors.universityFilter}
              size="small"
              style={{ marginBottom: DEFAULT_SPACE }}
          />
          <div style={{ marginBottom: DEFAULT_SPACE }}>
            <Typography id="years-filter-range-slider" gutterBottom className={classes.sliderLabel} >
              Years filter
            </Typography>
            <Slider
                id="yearsFilter"
                name="yearsFilter"
                value={yearsFilter}
                onChange={handleYearsChange}
                valueLabelDisplay="on"
                aria-labelledby="years-filter-range-slider"
                min={minYears}

                // getAriaValueText={valuetext}
            />
          </div>
            <FormControl component="fieldset" className={classes.formControl} style={{ marginBottom: DEFAULT_SPACE }}>
              <FormLabel component="legend">Gender filter</FormLabel>
              <FormGroup>
                <FormControlLabel
                    control={<Checkbox color={"primary"} checked={Male} onChange={handleChange} name="Male" />}
                    label="Male"
                />
                <FormControlLabel
                    control={<Checkbox color={"primary"} checked={Female} onChange={handleChange} name="Female" />}
                    label="Female"
                />
                <FormControlLabel
                    control={<Checkbox color={"primary"} checked={Other} onChange={handleChange} name="Other" />}
                    label="Other"
                />
              </FormGroup>
            </FormControl>
            <TextField
                fullWidth
                id="interestFilter"
                name="interestFilter"
                label="Interest filter"
                value={formik.values.interestFilter}
                onChange={formik.handleChange}
                error={formik.touched.interestFilter && Boolean(formik.errors.interestFilter)}
                helperText={formik.touched.interestFilter && formik.errors.interestFilter}
                size="small"
                style={{ marginBottom: DEFAULT_SPACE }}
            />
            <TextField
                fullWidth
                id="cityFilter"
                name="cityFilter"
                label="City filter"
                value={formik.values.cityFilter}
                onChange={formik.handleChange}
                error={formik.touched.cityFilter && Boolean(formik.errors.cityFilter)}
                helperText={formik.touched.cityFilter && formik.errors.cityFilter}
                size="small"
                style={{ marginBottom: DEFAULT_SPACE }}
            />
            <div style={{ marginBottom: DEFAULT_SPACE }}>
              <Typography id="max-distance-slider" gutterBottom className={classes.sliderLabel}>
                Max search distance in KM
              </Typography>
              <Slider
                  defaultValue={maxDistanceLimit}
                  aria-labelledby="max-distance-slider"
                  step={10}
                  marks
                  min={0}
                  max={maxDistanceLimit}
                  valueLabelDisplay="on"
                  value={maxDistance}
                  onChange={handleMaxDistanceChange}
              />
            </div>
            {/*<TextField*/}
            {/*    fullWidth*/}
            {/*    id="genderFilters"*/}
            {/*    name="genderFilters"*/}
            {/*    label="Gender filter"*/}
            {/*    value={formik.values.universityFilter}*/}
            {/*    onChange={formik.handleChange}*/}
            {/*    error={formik.touched.universityFilter && Boolean(formik.errors.universityFilter)}*/}
            {/*    helperText={formik.touched.universityFilter && formik.errors.universityFilter}*/}
            {/*    size="small"*/}
            {/*    style={{ marginBottom: DEFAULT_SPACE }}*/}
            {/*/>*/}

            {/*<FormControl className={classes.formControl}>*/}
            {/*  <InputLabel id="demo-mutiple-chip-label">Interests</InputLabel>*/}
            {/*  <Select*/}
            {/*      labelId="demo-mutiple-chip-label"*/}
            {/*      id="demo-mutiple-chip"*/}
            {/*      multiple*/}
            {/*      value={interestFilters}*/}
            {/*      onChange={handleInterestsChange}*/}
            {/*      input={<Input id="select-multiple-chip" />}*/}
            {/*      renderValue={(selected) => (*/}
            {/*          <div className={classes.chips}>*/}
            {/*            {selected.map((value) => (*/}
            {/*                <Chip key={value} label={value} className={classes.chip} />*/}
            {/*            ))}*/}
            {/*          </div>*/}
            {/*      )}*/}
            {/*      MenuProps={MenuProps}*/}
            {/*  >*/}
            {/*    {names.map((name) => (*/}
            {/*        <MenuItem key={name} value={name}>*/}
            {/*          {name}*/}
            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*  </Select>*/}
            {/*</FormControl>*/}
          {/*<TextField*/}
          {/*    fullWidth*/}
          {/*    id="universityFilter"*/}
          {/*    name="universityFilter"*/}
          {/*    label="universityFilter"*/}
          {/*    value={formik.values.universityFilter}*/}
          {/*    onChange={formik.handleChange}*/}
          {/*    error={formik.touched.universityFilter && Boolean(formik.errors.universityFilter)}*/}
          {/*    helperText={formik.touched.universityFilter && formik.errors.universityFilter}*/}
          {/*    autoFocus*/}
          {/*    size="small"*/}
          {/*    style={{ marginBottom: DEFAULT_SPACE }}*/}
          {/*/>*/}


          {!areCredentialsCorrect && !isLoading && (
              <>
                <p style={{ color: "rgb(204,0,0)" }}>
                  No user with this universityFilter and password
                </p>
              </>
          )}
          <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={formik.isSubmitting}
              size="small"
          >
            UPDATE FILTERS
          </Button></Paper>
        </form>
        </Grid>

      </Grid>
  );
};

export default FilterPage;
