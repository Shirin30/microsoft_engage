import { useEffect,useState } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
import FileUpload from 'components/FileUpload/FileUpload';
import TeamScheduler from 'components/Scheduler/Scheduler';
import VideoCallPage from 'components/VideoCallPage/VideoCallPage';
import { useLocation } from 'react-router-dom';
import {fb} from 'service';


export const VideoChat = () => {
  const {
   setChatConfig,
    chatConfig,
    myChats,
    setMyChats,
    setSelectedChat,
    setMyMessages,
    selectedChat,
    
    
  } = useChat();
  

  




  
  
  
  
  
  
 

  useEffect(() => {
    fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("selectedChat").doc("1").get().then((doc)=>{
setSelectedChat(doc.data());

  })
  fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("myChats").doc("1").get().then((doc)=>{
setMyChats(doc.data()["myChats"]);
  })
  fb.firestore.collection('videoRooms').doc(window.location.pathname).collection("chatConfig").doc("1").get().then((doc)=>{
setChatConfig(doc.data());
  })
    console.log('Selected Chat: ', selectedChat);
  }, []);

  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          // onConnect={() => {
          //   getChats(chatConfig, setMyChats);
          // }}
          // onNewChat={chat => {
          //   if (chat.admin.username === chatConfig.userName) {
          //     selectChatClick(chat);
          //   }
          //   setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          // }}
          // onDeleteChat={chat => {
          //   if (selectedChat?.id === chat.id) {
          //     setSelectedChat(null);
          //   }
          //   setMyChats(
          //     myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
          //   );
          // }}

          onDeleteMessage ={(chatId, message) => {
            
            const filteredmessages = selectedChat.messages.filter(m=>m.id != message.id);
            // console.log(chatThatMessageBelongsTo,filteredmessages)
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: filteredmessages,
              });
            }
            // const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            setMyMessages(filteredmessages);
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              messages: filteredmessages,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
            
          }}
          
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
        />
      )}

      <div className="chat-container">
        
        <div className="current-chat">
          {chatConfig && selectedChat ?( 
            <div className="chat">
              <MessageList/>
              <ChatInput/>
            </div>
          ):(<></>)}
          <VideoCallPage/>
        </div>
      </div>
    </>
  );
};