import React, {useContext} from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import {UserContext} from "../../context/userContext";
import {emptyUser} from "../../shared/constants";

const SettingsPage = () => {
  const [ user, setUser ] = useContext(UserContext);

  const handleLogOut = () => {
    const cookies = new Cookies();

    cookies.remove("token");
    setUser(emptyUser)
  };
  return <>
    <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        onClick={handleLogOut}
    >
      LOG OUT
    </Button>
  </>;
};

export default SettingsPage;
