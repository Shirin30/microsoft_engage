import { useEffect } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
import FileUpload from 'components/FileUpload/FileUpload';
import TeamScheduler from 'components/Scheduler/Scheduler';
import VideoCallPage from 'components/VideoCallPage/VideoCallPage';
import { useLocation } from 'react-router-dom';


export const VideoChat = () => {
  const {
    myChats,
    setMyChats,
    setSelectedChat,
    setMyMessages,
    
  } = useChat();
  const location = useLocation();
  const selectedChat = location.state.selectedChat
  console.log("chaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatttttttttttttt"+location.state.selectedChat.id)
  // const myChats = location.state.selectedChat
  const myMessages = location.state.myMessages
  const chatConfig = location.state.chatConfig
  console.log("my chatsssssssssssssssssssssssssssssssss"+myChats);
  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);

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
          {selectedChat ?( 
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