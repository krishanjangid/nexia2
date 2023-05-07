import React from 'react';
import './ChatList.css';

function ChatList({ chats, onSelect, onNewChat }) {
  return (
    <div className="chat-list">
      <div className="header">
        <h2>Chats</h2>
        <button onClick={onNewChat}>New Chat</button>
      </div>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelect(chat)}>
            
            <div className="details">
              <h3>{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
