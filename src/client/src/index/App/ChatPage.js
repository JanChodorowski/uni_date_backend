import React, { useContext, useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { getMatches, getPicture, getProfiles } from "../shared/api";
import { LoadingContext } from "../shared/loadingContext";
import { ProfilesContext } from "../shared/profilesContext";
import { UserContext } from "../shared/userContext";
import { MatchesContext } from "../shared/matchesContext";
import { Avatar, Grid, IconButton, Typography } from "@material-ui/core";
import { AVATAR_SIZE, DEFAULT_SPACE } from "../shared/constants";
import PlaceHolder from "./shared/Missing_avatar.svg";
import { capitalizeFirstLetter, getGenderColor } from "../shared/functions";
import AvatarsCollection from "./shared/AvatarsCollection";
const ChatPage = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [matches, setMatches] = useContext(MatchesContext);
  const [user] = useContext(UserContext);

  useEffect(() => {
    let mounted = true;

    setIsLoading(true);

    getMatches()
      .then((res) => {
        let matchesData = res.data;
        console.table(res.data);

        if (!(matchesData && mounted)) {
          throw new Error();
        }

        let usersAvatarsPromises = matchesData
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

        Promise.all(usersAvatarsPromises)
          .then((results) => {
            results.forEach((r) => {
              matchesData.find((pd) =>
                pd.pictures.find((p) => p.fileName === r.headers.filename)
              ).avatar = r.data;
            });
          })
          .catch((e) => {})
          .finally(() => {
            console.log("matches", matches);

            setMatches(matchesData);
            setIsLoading(false);
          });
      })
      .catch((e) => {
        setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const [open, setOpen] = useState(false);
  // const [passiveSideUserId, setPassiveSideUserId] = useState("");

  const handleClickOpen = (profileId) => {
    // setPassiveSideUserId(profileId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AvatarsCollection
        collection={matches}
        handleClickOpen={handleClickOpen}
      ></AvatarsCollection>
      {/*<Grid container direction="row" alignItems="center" justify="center">*/}
      {/*    {matches &&*/}
      {/*    matches.map((p, i) => (*/}
      {/*        <Grid item style={{ padding: DEFAULT_SPACE }} key={i}>*/}
      {/*            <Grid item>*/}
      {/*                <IconButton onClick={() => handleClickOpen(p.id)}>*/}
      {/*                    <Grid*/}
      {/*                        container*/}
      {/*                        direction="column"*/}
      {/*                        alignItems="center"*/}
      {/*                        justify="center"*/}
      {/*                        style={{ padding: "2rem" }}*/}
      {/*                    >*/}
      {/*                        <Grid item>*/}
      {/*                            {p.avatar ? (*/}
      {/*                                <Avatar*/}
      {/*                                    alt={p.userName}*/}
      {/*                                    src={URL.createObjectURL(p.avatar)}*/}
      {/*                                    style={{*/}
      {/*                                        height: AVATAR_SIZE,*/}
      {/*                                        width: AVATAR_SIZE,*/}
      {/*                                    }}*/}
      {/*                                />*/}
      {/*                            ) : (*/}
      {/*                                <Avatar*/}
      {/*                                    alt={p.userName}*/}
      {/*                                    src={PlaceHolder}*/}
      {/*                                    style={{*/}
      {/*                                        height: AVATAR_SIZE,*/}
      {/*                                        width: AVATAR_SIZE,*/}
      {/*                                    }}*/}
      {/*                                />*/}
      {/*                            )}*/}
      {/*                        </Grid>*/}
      {/*                        <Grid item>*/}
      {/*                            <Typography*/}
      {/*                                style={{*/}
      {/*                                    fontSize: "1.5rem",*/}
      {/*                                    fontWeight: "bold",*/}
      {/*                                    color: getGenderColor(p.gender),*/}
      {/*                                }}*/}
      {/*                                paragraph*/}
      {/*                            >*/}
      {/*                                {capitalizeFirstLetter(p.userName)}*/}
      {/*                            </Typography>*/}
      {/*                        </Grid>*/}
      {/*                    </Grid>*/}
      {/*                </IconButton>*/}
      {/*            </Grid>*/}
      {/*        </Grid>*/}
      {/*    ))}*/}
      {/*</Grid>*/}
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                }}
              />
            </MessageList>
            <MessageInput
              attachButton={false}
              fancyScroll={true}
              placeholder="Type message here"
            />
          </ChatContainer>
        </MainContainer>
      </div>
      ;
    </>
  );
};

export default ChatPage;
