import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { createMessage, deleteMatch, getMessages } from "../../shared/api";
import { LoadingContext } from "../../shared/loadingContext";
import { MatchesContext } from "../../shared/matchesContext";
import PlaceHolder from "./shared/Missing_avatar.svg";
import { socket } from "./Chat/socket";
import { UserContext } from "../../shared/userContext";
import { IncomingMessagesContext } from "../../shared/incomingMessagesContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { ButtonGroup } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import WarningIcon from "@material-ui/icons/Warning";
import { DEFAULT_SPACE, SOCKET_EVENTS } from "../../shared/constants";

const { privateChat, register } = SOCKET_EVENTS;

const Chat = ({ passiveSideUserId, setOpen }) => {
  const [isLoading, setIsLoading] = useContext(LoadingContext);
  const [matches, setMatches] = useContext(MatchesContext);
  const [user] = useContext(UserContext);

  const [incomingMessages, setIncomingMessages] = useContext(
    IncomingMessagesContext
  );
  useEffect(() => {
    // if (!user.id) {
    //   return;
    // }
    socket.removeAllListeners(privateChat);
    socket.removeAllListeners(register);
    socket.emit(register, user.id);
    socket.on(privateChat, function (newIncomingMessage) {
      setIncomingMessages((prevIncomingMessages) => {
        return [...prevIncomingMessages, newIncomingMessage];
      });
    });
  }, [user.id]);

  useEffect(() => {
    setIncomingMessages((prevIncomingMessages) => {
      return prevIncomingMessages.filter(
        (im) => im.senderUserId !== passiveSideUserId
      );
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    setIsLoading(true);

    getMessages(passiveSideUserId)
      .then((res) => {
        const { data } = res;
        if (!data) {
          return;
        }

        const index = matches.findIndex((p) => p.id === passiveSideUserId);
        matches[index].messages = data;
        setMatches(matches);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);
  const [outgoingMessages, setOutgoingMessages] = useState([]);

  const handleSend = (content) => {
    createMessage(passiveSideUserId, content)
      .then(() => {
        socket.emit(SOCKET_EVENTS.privateChat, {
          senderUserId: user.id,
          passiveSideUserId,
          content,
        });
        setOutgoingMessages((prevOutgoingMessages) => {
          return [
            ...prevOutgoingMessages,
            {
              content,
              createdAt: new Date().toISOString(),
              senderUserId: user.id,
            },
          ];
        });
      })
      .catch((e) => {});
  };
  const theMatch = matches.find((m) => m.id === passiveSideUserId);
  const [isMatchReadyToDelete, setIsMatchReadyToDelete] = useState(false);

  const handleRemoveMatchClick = () => {
    setIsLoading(true);
    deleteMatch(passiveSideUserId)
      .then((res) => {
        const { data } = res;
        if (!res?.data?.isRemoved) {
          return;
        }

        setMatches((prevMatches) =>
          prevMatches.filter((pm) => pm.id !== passiveSideUserId)
        );
        setOpen(false);
      })
      .catch((e) => {})
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setIsLoading(false);
    };
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer responsive style={{ marginBottom: "2rem" }}>
        <ChatContainer>
          <ConversationHeader>
            {theMatch?.avatar ? (
              <Avatar
                src={URL.createObjectURL(theMatch.avatar)}
                name={theMatch.userName || ""}
              />
            ) : (
              <Avatar src={PlaceHolder} name={theMatch?.userName || ""} />
            )}
            <ConversationHeader.Content userName={theMatch?.userName || ""} />
          </ConversationHeader>
          <MessageList>
            {theMatch?.messages &&
              Array.isArray(theMatch.messages) &&
              [
                ...theMatch.messages,
                ...incomingMessages.filter(
                  (im) => im.senderUserId === passiveSideUserId
                ),
                ...outgoingMessages,
              ]
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((msg, i) => {
                  return (
                    <Message
                      key={i}
                      model={{
                        message: msg.content,
                        direction:
                          msg.senderUserId === passiveSideUserId
                            ? "incoming"
                            : "outgoing",
                      }}
                    />
                  );
                })}
          </MessageList>
          <MessageInput
            attachButton={false}
            fancyScroll={true}
            placeholder="Type message here"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
      <div style={{ paddingBottom: DEFAULT_SPACE }}>
        {!isMatchReadyToDelete ? (
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            type="submit"
            onClick={() => setIsMatchReadyToDelete(true)}
            size="small"
            startIcon={<DeleteIcon></DeleteIcon>}
            disabled={isLoading}
          >
            REMOVE THE MATCH
          </Button>
        ) : (
          <ButtonGroup fullWidth>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              size="small"
              onClick={handleRemoveMatchClick}
              startIcon={<WarningIcon></WarningIcon>}
              disabled={isLoading}
            >
              YES, REMOVE THE MATCH
            </Button>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              size="small"
              onClick={() => setIsMatchReadyToDelete(false)}
              endIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
              disabled={isLoading}
            >
              NO
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};

export default Chat;
