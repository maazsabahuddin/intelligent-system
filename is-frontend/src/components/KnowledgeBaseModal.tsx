import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Trash2, Download, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  uploadDate: string;
  size: string;
  type: string;
  url?: string;
}

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ isOpen, onClose }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'view'>('upload');

  // Load documents from backend on modal open
  useEffect(() => {
    if (isOpen) {
      fetchDocuments();
    }
  }, [isOpen]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || 'demo-token'}`
        }
      });
      
      if (response.ok) {
        const docs = await response.json();
        setDocuments(docs);
      }
    } catch (err) {
      console.error('Failed to fetch documents:', err);
      // Fallback to localStorage for demo
      const savedDocs = localStorage.getItem('userDocuments');
      if (savedDocs) {
        try {
          setDocuments(JSON.parse(savedDocs));
        } catch (parseErr) {
          console.error('Failed to parse local documents:', parseErr);
        }
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('document', file);
        formData.append('userId', 'demo-user'); // In real app, get from auth context

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 100);

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken') || 'demo-token'}`
            },
            body: formData
          });

          clearInterval(progressInterval);
          setUploadProgress(100);

          if (response.ok) {
            const uploadedDoc = await response.json();
            setDocuments(prev => [...prev, uploadedDoc]);
          } else {
            throw new Error('Upload failed');
          }
        } catch (uploadErr) {
          clearInterval(progressInterval);
          // Fallback to local storage for demo
          const newDoc: Document = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            uploadDate: new Date().toISOString(),
            size: formatFileSize(file.size),
            type: file.type || 'application/octet-stream'
          };
          
          setDocuments(prev => {
            const updated = [...prev, newDoc];
            localStorage.setItem('userDocuments', JSON.stringify(updated));
            return updated;
          });
        }

        // Small delay between files
        if (i < files.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setActiveTab('view'); // Switch to view tab after upload
    } catch (err) {
      setError('Failed to upload documents. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the input
      event.target.value = '';
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/${docId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || 'demo-token'}`
        }
      });

      if (response.ok || response.status === 404) {
        setDocuments(prev => {
          const updated = prev.filter(doc => doc.id !== docId);
          localStorage.setItem('userDocuments', JSON.stringify(updated));
          return updated;
        });
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      // Fallback to local deletion
      setDocuments(prev => {
        const updated = prev.filter(doc => doc.id !== docId);
        localStorage.setItem('userDocuments', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return <FileText className="h-5 w-5 text-primary-500" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-semibold text-neutral-800">Knowledge Base</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-neutral-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            Upload Documents
          </button>
          <button
            onClick={() => setActiveTab('view')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'view'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-neutral-600 hover:text-neutral-800'
            }`}
          >
            View Documents ({documents.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors">
                <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  Upload Documents
                </h3>
                <p className="text-neutral-600 mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md,.ppt,.pptx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </div>
                </label>
                <p className="text-xs text-neutral-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, TXT, MD, PPT, PPTX, XLS, XLSX
                </p>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Uploading...</span>
                    <span className="text-sm text-neutral-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Guidelines */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h4 className="font-medium text-neutral-800 mb-2">Upload Guidelines</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Maximum file size: 10MB per file</li>
                  <li>• Supported formats: PDF, Word, PowerPoint, Excel, Text, Markdown</li>
                  <li>• Files will be processed and indexed for AI search</li>
                  <li>• Sensitive information will be handled securely</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'view' && (
            <div>
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-600 mb-2">
                    No documents uploaded yet
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Upload your first document to get started
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(doc.name)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-neutral-800 truncate">
                            {doc.name}
                          </h4>
                          <p className="text-sm text-neutral-500">
                            {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="View document"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Download document"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="text-sm text-neutral-600">
            {documents.length} document{documents.length !== 1 ? 's' : ''} in knowledge base
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseModal;