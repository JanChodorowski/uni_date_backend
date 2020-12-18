import React, {useEffect} from "react";
import {compareFileNames, getItemByKey} from "../../shared/functions";
import {LOCAL_STORAGE_KEY, THEME_NAMES} from "../../shared/constants";
import {getPicture, getUser} from "../../api";

const MatchPage = () => {
  useEffect(() => {
    let mounted = true;
    handleLoading(true);

    getUser()
        .then((res) => {
          const { data } = res;
          if (!(data && mounted)) {
            throw new Error();
          }
          let userData = data;
          let promises = data.pictures.map((p) => {
            return getPicture(p.fileName);
          });

          Promise.all(promises)
              .then((results) => {
                const picturesDataWithBlobs = results
                    .map((r) => {
                      const fileName = r.headers.filename;
                      return {
                        blob: r.data,
                        fileName,
                        isAvatar: data.pictures.find((p) => p.fileName === fileName)
                            .isAvatar,
                      };
                    })
                    .sort(compareFileNames);

                userData = {
                  ...userData,
                  pictures: picturesDataWithBlobs,
                };
              })
              .catch((e) => {
                handleLoading(false);
              })
              .finally(() => {
                setUser(userData);
                handleLoading(false);
              });
        })
        .catch((e) => {
          handleLoading(false);
        });
    return () => {
      mounted = false;
    };
  }, []);
  return <>


  </>;
};

export default MatchPage;
