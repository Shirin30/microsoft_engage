import { useChat } from 'context';
import { useState, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { ImageUpload } from 'components';
import { sendMessage } from 'react-chat-engine';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import {fb} from 'service';
export const ChatInput = () => {
  const { chatConfig, 
    selectedChat,
    myChats,
    setMyChats,
    selectChatClick,
    setSelectedChat,
    myMessages,
    setMyMessages } = useChat();
  const [chatInputText, setChatInputText] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const history = useHistory();

  const inputRef = useRef(null);
  const [image, setImage] = useState();
    console.log("ughhhhhhhhhhhhhhhhhhhhhhhh"+myChats)
  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };
  const sendURL = ()=>{
    if(selectedChat && chatInputText) {
      setChatInputText('');
    }
  };

  const startCall = () => {
    // generate unique id
    const uid = shortid.generate();
    // redirect to the call page.
    // history.push(`/${uid}`);
    history.push(`/${uid}`);
      
      
      
      
      
     
 
    fb.firestore.collection("videoRooms").doc(uid).collection("selectedChat").doc("1").set(selectedChat);
    fb.firestore.collection("videoRooms").doc(uid).collection("chatConfig").doc("1").set(chatConfig);
    fb.firestore.collection("videoRooms").doc(uid).collection("myChats").doc("1").set({
      myChats : myChats
    })
  }

  const handleChange = (e) => {
    setChatInputText(e.target.value);
    // isTyping(chatConfig, selectedChat.id);

  }

  const onFileAttach = file => {
    setImage(file);
    setImageModalOpen(true);
  };

  return (
    <>
      <div className="chat-controls">
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = '';
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="attach" color="grey" />
        </div>
        <input
          value={chatInputText}
          className="chat-input"
          placeholder="Send a message"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={handleChange}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
        <div onClick={startCall} className="send-message-icon">
          <Icon name="video" color="grey" />
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={e => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />

      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          mode="message"
          onSubmit={() => {
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: chatInputText,
                files: [image],
              },
              () => {
                setImage(null);
                setChatInputText('');
              },
            );
          }}
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};