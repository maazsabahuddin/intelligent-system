import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Maximize2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import Sidebar from '../components/Sidebar';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import WelcomeScreen from '../components/WelcomeScreen';
import TypingIndicator from '../components/TypingIndicator';
import ErrorModal from '../components/ErrorModal';

const ChatPage: React.FC = () => {
  const { logout } = useAuth();
  const { messages, isLoading, error, clearError } = useChat();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if we should show welcome screen (only initial bot message)
  const showWelcomeScreen = messages.length <= 1;
  
  return (
    <div className="h-screen flex bg-white">
      {error && <ErrorModal message={error} onClose={clearError} />}
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-lg font-semibold text-neutral-800">
              Intelligent-System
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Maximize2 className="h-4 w-4 text-neutral-600" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4 text-neutral-600" />
            </button>
          </div>
        </header>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {showWelcomeScreen ? (
            <WelcomeScreen />
          ) : (
            <div className="flex-1 overflow-y-auto">
              {messages.slice(1).map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="bg-white">
                  <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center">
                          <TypingIndicator />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-neutral-900 mb-1">
                          Intelligent-System
                        </div>
                        <div className="flex items-center">
                          <TypingIndicator />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
          
          {/* Input Area */}
          <div className="border-t border-neutral-200 bg-white">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;