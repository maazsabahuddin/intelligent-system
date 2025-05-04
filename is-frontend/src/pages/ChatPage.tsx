import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import TypingIndicator from '../components/TypingIndicator';
import ErrorModal from '../components/ErrorModal';

const ChatPage: React.FC = () => {
  const { logout } = useAuth();
  const { messages, isLoading, error, clearChat, clearError } = useChat();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {error && <ErrorModal message={error} onClose={clearError} />}
      
      <header className="bg-white border-b border-neutral-200 py-3 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary-500 text-white p-1.5 rounded-full mr-3">
              <Activity className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold text-primary-800">Intelligent-System</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={clearChat}
              className="p-2 text-neutral-500 hover:text-error-600 hover:bg-neutral-100 rounded-full transition-colors"
              title="Clear chat history"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-neutral-100 rounded-full transition-colors ml-2"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg shadow-message px-4 py-3 max-w-[80%]">
                <TypingIndicator />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t border-neutral-200 bg-white p-4">
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;