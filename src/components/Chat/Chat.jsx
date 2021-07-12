import { useEffect } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';
import FileUpload from 'components/FileUpload/FileUpload';
import TeamScheduler from 'components/Scheduler/Scheduler';

//this is the main chat screen.
//we first import few contexts from our chat context, which contain useful information about our chat.
export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
    myMessages,
    setMyMessages,
    isFileUpload,
    isChatScreen,
    isSchedulerScreen,
    setIsFileUpload,
    setIsChatScreen,
  } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);
//we then return the chatscreen, and handle functions like, new chat , delete chat, new message, delete message etc.
//if no chat is selected we show an image to initiate chat. then after we show icons that take it to file upload, event schedule screen, chat screen etc.
  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}

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
        <LeftRail />
        <div className="current-chat">
          {selectedChat ?( 
          isSchedulerScreen?(
            <div className="chat">
                
                <TeamScheduler/>
                
              </div>
          ): 
            isFileUpload?(
              <div className="chat">
                <ChatToolbar/>
                <FileUpload/>
                
              </div>
            ):isChatScreen?(
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              
              <ChatInput />
            </div>):(
              <div className="chat">
                <ChatToolbar />
              <MessageList />
              
              <ChatInput />
                </div>
            )
          ) : (
            <div className="no-selected">
              
              <img
                src="/img/final.jpg"
                className="point-left"
                alt="select a chat"
              />
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};