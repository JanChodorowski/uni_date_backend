import React, {useContext} from "react";
import CenterHOC from "../hocs/CenterHOC";
import { Grid, Paper, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import {emptyUser} from "../../shared/constants";
import {UserContext} from "../../context/userContext";
import {deleteUser} from "../../api";
import {LoadingContext} from "../../context/loadingContext";


const DeleteAccountPage = () => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const redirectToHomePage = () => history.push(`/`);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const handleNoClick = () => {
    redirectToHomePage()
  };

  const handleYesClick = () => {
    setIsLoading(true);
    deleteUser()
        .then(() => {
          const cookies = new Cookies();
          cookies.remove("token");
          setUser(emptyUser);
          redirectToHomePage()
        })
        .catch((e) => {
        })
        .finally(() => {
          setIsLoading(false);
        });

  };


  return (
    <>
      <CenterPaperHOC>
        <Typography>Are you sure you want to delete your account?</Typography>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleYesClick}
        >
          YES
        </Button>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleNoClick}
        >
          NO
        </Button>
      </CenterPaperHOC>
    </>
  );
};

export default DeleteAccountPage;
