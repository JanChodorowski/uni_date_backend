import {ChatContainer, MainContainer, Message, MessageInput, MessageList,} from "@chatscope/chat-ui-kit-react";
import React, {useContext, useEffect, useState} from "react";
import {getMatches, getPicture} from "../shared/api";
import {LoadingContext} from "../shared/loadingContext";
import {MatchesContext} from "../shared/matchesContext";
import {UserContext} from "../shared/userContext";
import AvatarsCollection from "./shared/AvatarsCollection";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Zoom from "@material-ui/core/Zoom";
import ProfileInfo from "./shared/ProfileInfo";

const chatscopeStyles = styles

const Transition = React.forwardRef((props, ref) => (
    <Zoom ref={ref} {...props} />
));

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
  const [passiveSideUserId, setPassiveSideUserId] = useState("");

  const handleClickOpen = (profileId) => {
    setPassiveSideUserId(profileId);
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

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="choose profile"
            TransitionComponent={Transition}
        >
            <DialogContent>
                <ProfileInfo passiveSideUserId={passiveSideUserId} setProfiles={setMatches} profiles={matches}></ProfileInfo>
            </DialogContent>
        </Dialog>
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
