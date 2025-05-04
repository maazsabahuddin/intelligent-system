import React from 'react';
import { Message } from '../contexts/ChatContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`rounded-lg shadow-message px-4 py-3 max-w-[80%] ${
          isUserMessage 
            ? 'bg-primary-500 text-white rounded-br-none' 
            : 'bg-white text-neutral-800 rounded-bl-none'
        }`}
      >
        <div className="text-sm sm:text-base">{message.content}</div>
        <div 
          className={`text-xs mt-1 ${
            isUserMessage ? 'text-primary-100' : 'text-neutral-500'
          }`}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;