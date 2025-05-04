import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading } = useChat();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await sendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-4 pr-12 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={2}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`absolute right-3 bottom-3 p-2 rounded-full ${
            message.trim() && !isLoading
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          } transition-colors`}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;