import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';

import './ChatBox.css';

function ChatBox({ chat = '', message = '', voiceRecording = null, onMessageChange = () => {}, 
onVoiceRecording = () => {
    const stream =  navigator.mediaDevices.getUserMedia({ audio: true });  
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (e) => {
        const audioChunks = [];
        audioChunks.push(e.data);
        if (mediaRecorder.state === 'inactive') {
            const blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
        }
    }
}, onSubmit = () => {} }) {
  const [conversation, setConversation] = useState([]);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const newMessage = { text: message, sender: 'user' };
    const conversationCopy = [...conversation, newMessage];
    setConversation(conversationCopy);
    const response = await getOpenAIResponse(message);
    const newResponse = { text: response, sender: 'bot' };
    const updatedConversation = [...conversationCopy, newResponse];
    setConversation(updatedConversation);
    onSubmit();
  }

  const getOpenAIResponse = async (message) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: "user", 
                content: message}
        ],
        temperature: 0.5,
        max_tokens: 2000,
      })
    });
    // const data = await response.json();
    // const text = data.choices[0].message.content;
    // const image = await generateImage(text);
    // return image;
    
    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  }

//   //for image generation
//   const generateImage = async (prompt) => {
//     const response = await fetch('https://api.openai.com/v1/images/generations', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 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'
//       },
//       body: JSON.stringify({
//         model: 'image-alpha-001',
//         prompt,
//         n: 1,
//         size: "1024x1024",
//         response_format: "url"
//       })
//     });
//     const { data } = await response.json();
//     console.log(data[0].url);
//     return data[0].url;
//   }




  return (
    <div className="chatbox">
      {chat ? (
        <>
        <div className='chat-view'>
          
          {/* <div className="messages">
            {conversation.map((message, index) => (
              <div key={index} className={`message  ${message.sender}`}>
                
                <p >{message.sender=='bot' ?(<img src='https://i.ibb.co/f0W51Vw/final.jpg'/>):(<img src='https://i.ibb.co/cXTs8wp/user.png'/>)} {message.text}</p>
                {message.image && <img src={message.image} alt="bot-generated" />}
              </div>
            ))} */}
            {conversation.map((message, index) => (
  <div key={index} className={`message ${message.sender}`}>
    {message.sender === 'bot' ? (
      <div className="bot">
        <img src="https://i.ibb.co/f0W51Vw/final.jpg" alt="bot-avatar" />
        <div className="bot">
          {message.text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          
          {message.code && (
            <pre>
              <code>{message.code}</code>
            </pre>
          )}
          {/* {message.image && <img src={message.image} alt="bot-generated" />} */}
        </div>
      </div>
    ) : (
      <div className="user">
        <img src="https://i.ibb.co/cXTs8wp/user.png" alt="user-avatar" />
        <p>{message.text}</p>
      </div>
    )}
  </div>
))}
</div>
          
        <form onSubmit={handleMessageSubmit}>
        <div className="input-group">
          <input type="text" value={message} onChange={onMessageChange} />
          <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
          <div className="voice-recording">
          <button onClick={onVoiceRecording}><FontAwesomeIcon icon={faMicrophone} /></button>
          {voiceRecording && <audio src={voiceRecording} controls />}
        </div>
        </div>
        
      </form>
        </>
        
      ) : (
        <div className="placeholder">Select a chat to get started!</div>
      )}
      
    </div>

  );
}

export default ChatBox;
