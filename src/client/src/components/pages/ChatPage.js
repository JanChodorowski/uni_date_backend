import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
const ChatPage = () => {
  return (
    <>
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
