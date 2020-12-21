import React, { useContext, useEffect } from "react";
import { compareFileNames, getItemByKey } from "../../shared/functions";
import { LOCAL_STORAGE_KEY, THEME_NAMES } from "../../shared/constants";
import { getPicture, getProfiles, getUser } from "../../api";
import { LoadingContext } from "../../context/loadingContext";
import { ProfilesContext } from "../../context/profilesContext";

const MatchPage = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [profiles, setProfiles] = useContext(ProfilesContext);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    getProfiles()
      .then((res) => {
        const { data } = res;
        if (!(data && mounted)) {
          throw new Error();
        }
        let profilesData = data;
        let promises = profilesData
          .map((pd) => {
            const picture = pd.pictures.find((p) => p.isAvatar);
            return picture && picture.fileName;
          })
          .filter((fileNameOrUndefined) => fileNameOrUndefined)
          .map((fileName) => {
            // return getPicture(fileName);
          });

        // Promise.all(promises)
        //   .then((results) => {
        //     const picturesDataWithBlobs = results
        //       .map((r) => {
        //         const fileName = r.headers.filename;
        //         return {
        //           blob: r.data,
        //           fileName,
        //           isAvatar: data.pictures.find((p) => p.fileName === fileName)
        //             .isAvatar,
        //         };
        //       })
        //       .sort(compareFileNames);
        //
        //     profilesData = {
        //       ...profilesData,
        //       pictures: picturesDataWithBlobs,
        //     };
        //   })
        //   .catch((e) => {
        //     setIsLoading(false);
        //   })
        //   .finally(() => {
        //     setProfiles(profilesData);
        //     setIsLoading(false);
        //   });
      })
      .catch((e) => {
        console.log("err", e);
        setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);
  return <></>;
};

export default MatchPage;
