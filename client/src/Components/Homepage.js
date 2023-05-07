import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Homepage.css';




function HomePage({ user }) {
  const [chats, setChats] = useState([{ id: 1, name: 'New Chat', lastMessage: '' }]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [voiceRecording, setVoiceRecording] = useState('');
  const navigate = useNavigate();
  
  function handleNewChat() {
    // Code to create a new chat and add it to the chats state
    let id = chats.length;
    setChats(chats => [...chats, { id: id+1, name: 'New Chat ', lastMessage: 'Hello' }]);
    setCurrentChat(chats);
  }

//   {chats.map((chat) => (
//     <li key={chat.id} onClick={() => onSelect(chat)}>
      
//       <div className="details">
//         <h3>{chat.name}</h3>
//         <p>{chat.lastMessage}</p>
//       </div>
//     </li>
//   ))}

  function handleChatSelect(chat) {
    setCurrentChat(chat);
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleVoiceRecording(blob) {
    // Code to convert the blob to text using a speech-to-text API
    // and set the message state with the result
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Code to send the message to the chat and update the chats state
  }

  const handleLogout = () => {
        navigate("/");  
  };
  return (
    <div className="homepage">
      <div className="sidebar">
      <div className="chat-list">
          <ChatList chats={chats} onSelect={handleChatSelect} onNewChat={handleNewChat} />
        </div>
        <p className='user'><img src={user.avatarUrl} alt="Avatar" />{user.name} <button onClick={handleLogout}>Log Out &nbsp;<FontAwesomeIcon icon={faRightFromBracket} /></button></p>
        
      </div>
      <div className="main-content">
        
        <div className="chatbox">
          <ChatBox
            chat={currentChat}
            message={message}
            voiceRecording={voiceRecording}
            onMessageChange={handleMessageChange}
            onVoiceRecording={handleVoiceRecording}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;