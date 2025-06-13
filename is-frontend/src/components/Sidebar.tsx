import React from 'react';
import { Plus, MessageSquare, Search, BookOpen, Code, Sparkles, Briefcase, FolderPlus, Settings, User } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { clearChat, messages } = useChat();

  const handleNewChat = () => {
    clearChat();
  };

  // Mock chat history - in a real app, this would come from context/state
  const chatHistory = [
    "Healthcare symptoms analysis",
    "Medication interaction check", 
    "Diet recommendations for diabetes",
    "Exercise plan for recovery",
    "Mental health support",
    "Preventive care guidelines",
    "Emergency first aid steps",
    "Chronic pain management",
    "Sleep disorder consultation",
    "Nutrition planning advice"
  ];

  const menuItems = [
    { icon: MessageSquare, label: 'New chat', action: handleNewChat },
    { icon: Search, label: 'Search chats' },
    { icon: BookOpen, label: 'Library' },
    { icon: Code, label: 'Codex' },
    { icon: Sparkles, label: 'Sora' },
    { icon: Briefcase, label: 'AI for your business' },
    { icon: FolderPlus, label: 'New project' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-neutral-900 text-white z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-neutral-700">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">New chat</span>
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-2 border-b border-neutral-700">
          {menuItems.slice(1).map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-left"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="text-xs font-medium text-neutral-400 mb-2 px-3">Chats</div>
          {chatHistory.map((chat, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors mb-1"
            >
              <div className="text-sm text-neutral-200 truncate">{chat}</div>
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-neutral-700">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-left">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-left mt-1">
            <User className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;