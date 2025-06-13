import React from 'react';
import { Settings, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
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
          <div className="text-lg font-semibold">Intelligent-System</div>
          <div className="text-sm text-neutral-400">Healthcare Assistant</div>
        </div>

        {/* Chat History Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-xs font-medium text-neutral-400 mb-3 px-3">Chat History</div>
          <div className="px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700">
            <div className="text-sm text-neutral-200">Current Conversation</div>
            <div className="text-xs text-neutral-400 mt-1">Healthcare assistance session</div>
          </div>
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