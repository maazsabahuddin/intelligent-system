import React from 'react';
import { Settings, User, FileText, Upload, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadDate: Date;
  size: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [documents, setDocuments] = React.useState<Document[]>([]);

  // Load documents from localStorage on component mount
  React.useEffect(() => {
    const savedDocs = localStorage.getItem('userDocuments');
    if (savedDocs) {
      try {
        const parsedDocs = JSON.parse(savedDocs).map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate)
        }));
        setDocuments(parsedDocs);
      } catch (error) {
        console.error('Failed to parse documents:', error);
      }
    }
  }, []);

  // Save documents to localStorage whenever documents change
  React.useEffect(() => {
    localStorage.setItem('userDocuments', JSON.stringify(documents));
  }, [documents]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc: Document = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          uploadDate: new Date(),
          size: formatFileSize(file.size)
        };
        setDocuments(prev => [...prev, newDoc]);
      });
    }
    // Reset the input
    event.target.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const industryPractices = [
    { icon: FileText, label: "Healthcare Guidelines", description: "Medical best practices" },
    { icon: Settings, label: "Compliance Standards", description: "Industry regulations" },
    { icon: User, label: "Patient Care Protocols", description: "Treatment guidelines" }
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
        {/* Top Section - Industry Best Practices */}
        <div className="p-4 border-b border-neutral-700">
          <div className="text-sm font-medium text-neutral-300 mb-3">Industry Best Practices</div>
          <div className="space-y-2">
            {industryPractices.map((practice, index) => (
              <button
                key={index}
                className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-left"
              >
                <practice.icon className="h-4 w-4 mt-0.5 text-neutral-400" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-neutral-200 truncate">{practice.label}</div>
                  <div className="text-xs text-neutral-400 truncate">{practice.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-neutral-300">Knowledge Base</div>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="p-1.5 hover:bg-neutral-800 rounded transition-colors">
                <Upload className="h-4 w-4 text-neutral-400" />
              </div>
            </label>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-8 w-8 text-neutral-600 mx-auto mb-2" />
              <div className="text-sm text-neutral-400 mb-2">No documents uploaded</div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Upload your first document
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <FileText className="h-4 w-4 mt-0.5 text-neutral-400" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-neutral-200 truncate">{doc.name}</div>
                    <div className="text-xs text-neutral-400">
                      {doc.size} • {doc.uploadDate.toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteDocument(doc.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded transition-all"
                  >
                    <Trash2 className="h-3 w-3 text-neutral-400 hover:text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section - Profile */}
        <div className="p-4 border-t border-neutral-700">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-left">
            <User className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;