import React from "react";
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import DialogContent from "@material-ui/core/DialogContent";
import { createMessage } from "./index/shared/api";
import io from "socket.io-client";
const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

const Chat = ({ passiveSideUserId }) => {
  const handleSend = (message) => {
    createMessage(passiveSideUserId, message)
      .then(() => {
        socket.emit("private_chat", {
          to: passiveSideUserId,
          message,
        });
      })
      .catch((e) => {});
  };

  return (
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
  );
};

export default Chat;
