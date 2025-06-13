import React, { useState } from 'react';
import { Send, Plus, Paperclip, Mic } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto px-4 pb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end bg-white border border-neutral-300 rounded-2xl shadow-sm focus-within:border-neutral-400 focus-within:shadow-md transition-all">
          <button
            type="button"
            className="p-3 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
          
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 px-2 py-3 bg-transparent border-none outline-none resize-none text-neutral-800 placeholder-neutral-500"
            rows={1}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{
              minHeight: '24px',
              maxHeight: '200px',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          
          <div className="flex items-center gap-1 pr-2">
            <button
              type="button"
              className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            
            {message.trim() ? (
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-neutral-800 text-white rounded-full hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="text-xs text-neutral-500 text-center mt-2">
          Intelligent-System can make mistakes. Check important info.
        </div>
      </form>
    </div>
  );
};

export default ChatInput;