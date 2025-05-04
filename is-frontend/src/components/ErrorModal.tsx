import React from 'react';
import { XCircle, X } from 'lucide-react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <XCircle className="h-6 w-6 text-error-500 mr-2" />
            <h3 className="text-lg font-semibold text-neutral-900">Error</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="bg-error-50 text-error-700 p-4 rounded-md mb-4">
          {message}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal