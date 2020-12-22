import React, { useContext, useEffect } from "react";
import { compareFileNames, getItemByKey } from "../../shared/functions";
import {
  AVATAR_SIZE,
  LOCAL_STORAGE_KEY,
  THEME_NAMES,
} from "../../shared/constants";
import { getPicture, getProfiles, getUser } from "../../api";
import { LoadingContext } from "../../context/loadingContext";
import { ProfilesContext } from "../../context/profilesContext";
import {Avatar, Grid, Paper, Typography} from "@material-ui/core";
import PlaceHolder from "../../images/Missing_avatar.svg";
import CenterPaperHOC from "../hocs/CenterPaperHOC";
import useTransparentPaperStyle from "../hooks/useTransparentPaperStyle";

const MatchPage = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    getProfiles()
      .then((res) => {
        let profilesData = res.data;

        if (!(profilesData && mounted)) {
          throw new Error();
        }

        let usersAvatarsPromises = profilesData
          .map((pd) => {
            const picture = pd.pictures.find((p) => p.isAvatar);
            if (picture) {
              return picture.fileName;
            }
            return null;
          })
          .filter((fileNameOrUndefined) => fileNameOrUndefined)
          .map((fileName) => {
            return getPicture(fileName);
          });

        console.log("profilesData 0 ", profilesData, usersAvatarsPromises);
        Promise.all(usersAvatarsPromises)
          .then((results) => {
            console.log("results", results);
            results.forEach((r) => {
              profilesData.find((pd) =>
                pd.pictures.find((p) => p.fileName === r.headers.filename)
              ).avatar = r.data;
            });

            // profilesData = {
            //   ...profilesData,
            //   pictures: picturesDataWithBlobs,
            // };
            console.log("profilesData", profilesData);
          })
          .catch((e) => {
            console.log("e", e);
            setIsLoading(false);
          })
          .finally(() => {
            setProfiles(profilesData);
            setIsLoading(false);
          });
      })
      .catch((e) => {
        console.log("err", e);
        setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

    const  paper  = useTransparentPaperStyle();


    return (
    <>
      {profiles && profiles.length > 0 && (
        <>
<Paper className={paper}>            <Grid
                container
              direction="row"
              alignItems="center"
              justify="center"
            >
              {profiles &&
                profiles.map((p, i) => (
                  <Grid
                    item
                    style={{ padding: "1rem" }}
                    key={i}
                    xs={12}
                    sm={4}
                    md={3}
                  >
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Grid item>
                        {p.avatar ? (
                          <Avatar
                            alt={p.userName}
                            src={URL.createObjectURL(p.avatar)}
                            style={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
                          />
                        ) : (
                          <Avatar
                            alt={p.userName}
                            src={PlaceHolder}
                            style={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
                          />
                        )}
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }} paragraph>
                          {p.userName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
</Paper>        </>
      )}
    </>
  );
};

export default MatchPage;
