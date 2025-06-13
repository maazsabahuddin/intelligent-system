import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchChatbotResponse } from '../services/chatbotService';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearChat: () => void;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: async () => {},
  isLoading: false,
  error: null,
  clearChat: () => {},
  clearError: () => {},
});

export const useChat = () => useContext(ChatContext);

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error('Failed to parse chat history:', err);
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content: "Hello! I'm Intelligent-System, your Sales & Marketing assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;

    setError(null);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetchChatbotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    initializeChat();
    localStorage.setItem('chatHistory', JSON.stringify([messages[0]]));
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, error, clearChat, clearError }}>
      {children}
    </ChatContext.Provider>
  );
};