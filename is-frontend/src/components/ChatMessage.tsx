import React from 'react';
import { Activity, User } from 'lucide-react';
import { Message } from '../contexts/ChatContext';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.sender === 'user';
  
  return (
    <div className={`group relative ${isUserMessage ? 'bg-neutral-50' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUserMessage 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-800 text-white'
            }`}>
              {isUserMessage ? (
                <User className="h-4 w-4" />
              ) : (
                <Activity className="h-4 w-4" />
              )}
            </div>
          </div>
          
          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-neutral-900 mb-1">
              {isUserMessage ? 'You' : 'Intelligent-System'}
            </div>
            <div className="prose prose-neutral max-w-none">
              <div className="text-neutral-800 whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;