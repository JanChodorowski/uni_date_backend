import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import React, { useContext, useEffect, useState } from "react";
import {createMessage, getMatches, getPicture} from "../shared/api";
import { LoadingContext } from "../shared/loadingContext";
import { MatchesContext } from "../shared/matchesContext";
import { UserContext } from "../shared/userContext";
import AvatarsCollection from "./shared/AvatarsCollection";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Zoom from "@material-ui/core/Zoom";
import ProfileInfo from "./shared/ProfileInfo";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DEFAULT_IMAGE_SIZE } from "../shared/constants";
import io from 'socket.io-client';
import Button from "@material-ui/core/Button";
import {PathContext} from "../shared/pathContext";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});
const chatscopeStyles = styles;

const Transition = React.forwardRef((props, ref) => (
  <Zoom ref={ref} {...props} />
));
const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  text: {
    maxWidth: "600px",
  },
}));

const ChatPage = () => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [matches, setMatches] = useContext(MatchesContext);
  const [user] = useContext(UserContext);

  const checkIfProfilesAlreadyFetched = () => matches && matches.length > 0;
  const { text, root, expand, expandOpen } = useStyles();

  useEffect(() => {
    let mounted = true;

    if (checkIfProfilesAlreadyFetched()) {
      return;
    }

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
  const [passiveSideUserId, setPassiveSideUserId] = useState("");

  const handleClickOpen = (profileId) => {
    setPassiveSideUserId(profileId);
    setOpen(true);
  };

  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSend = (message) => {
    createMessage(passiveSideUserId, message).then(() =>{
      socket.emit('private_chat',{
        to : passiveSideUserId,
        message
      });
    }).catch(e => {})

  }

  return (
    <>
      <AvatarsCollection
        collection={matches}
        handleClickOpen={handleClickOpen}
      ></AvatarsCollection>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="choose profile"
        TransitionComponent={Transition}
      >
        <DialogContent style={{overflowX: 'hidden'}}>
          <Grid
            container
            direction="row"
            alignItems="center"
            wrap="nowrap"
            style={{ width: DEFAULT_IMAGE_SIZE}}
          >

            <Grid item>

              <IconButton
                className={clsx(expand, {
                  [expandOpen]: expanded,
                })}
                // style={{ float: 'right' }}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
            <Grid item style={{ marginRight: "6px" }}>

              <Typography>More info</Typography>
            </Grid>
          </Grid>
          {expanded && (
            <>
              <ProfileInfo
                passiveSideUserId={passiveSideUserId}
                setProfiles={setMatches}
                profiles={matches}
              ></ProfileInfo>
            </>
          )}
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
                  onSend={handleSend}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatPage;
