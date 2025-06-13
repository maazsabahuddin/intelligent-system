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

        {/* Bottom Section */}
        <div className="p-4 border-t border-neutral-700">
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