import React, {useContext, useEffect} from "react";
import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,ConversationHeader

} from "@chatscope/chat-ui-kit-react";
import DialogContent from "@material-ui/core/DialogContent";
import {createMessage, getMatches, getMessages, getPicture} from "./index/shared/api";
import io from "socket.io-client";
import {LoadingContext} from "./index/shared/loadingContext";
import {MatchesContext} from "./index/shared/matchesContext";
import {Avatar} from "@chatscope/chat-ui-kit-react";
import {AVATAR_SIZE} from "./index/shared/constants";
import PlaceHolder from "./index/App/shared/Missing_avatar.svg";
import {socket} from "./index/socket";





const Chat = ({ passiveSideUserId }) => {
    const [isLoading, setIsLoading] = useContext(LoadingContext);
    const [matches, setMatches] = useContext(MatchesContext);
    useEffect(() => {
        let mounted = true;

        // if (checkIfProfilesAlreadyFetched()) {
        //     return;
        // }

        setIsLoading(true);

        getMessages(passiveSideUserId)
            .then((res) => {
               console.log('messages',res.data)
                const {data}=res;
                if(!data){return}

                const index = matches.findIndex((p) => p.id === passiveSideUserId);
                matches[index].messages = data;
console.log('data',data)
                setMatches(matches);
            })
            .catch((e) => {

            }).finally(()=>{setIsLoading(false);})

        return () => {
            mounted = false;
        };
    }, []);



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
const theMatch = matches.find(m => m.id === passiveSideUserId)
    console.log('matches.find(m => m.id === passiveSideUserId)',matches.find(m => m.id === passiveSideUserId))

    return (
    <div style={{ position: "relative", height: "500px" }}>
        {theMatch &&
        theMatch.messages &&
        Array.isArray(theMatch.messages) &&
        theMatch.messages.length > 0 &&
        theMatch.messages.forEach(msg =>{
            console.log('hey',msg.message_id)})}

            <MainContainer responsive>
        <ChatContainer>
            <ConversationHeader>
                {theMatch.avatar ? (
                    <Avatar src={URL.createObjectURL(theMatch.avatar)} name={theMatch.userName || ''} />
                ) : (
                    <Avatar src={PlaceHolder} name={theMatch.userName || ''}  />
                )}
                <ConversationHeader.Content userName={theMatch.userName}/>
            </ConversationHeader>
          <MessageList>
              {theMatch &&
              theMatch.messages &&
              Array.isArray(theMatch.messages) &&
              theMatch.messages.length > 0 &&
              theMatch.messages.map(msg =>{
                 return <Message
                      key={msg.message_id}
                      model={{
                          message: msg.content,
                          // sentTime: "just now",
                          // sender: msg.sender_user_id,
                          direction: msg.sender_user_id === passiveSideUserId ? "incoming": "outgoing",
                      }}
                  />
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
    </div>
  );
};

export default Chat;
