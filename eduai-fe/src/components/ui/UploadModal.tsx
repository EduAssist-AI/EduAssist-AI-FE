import React from 'react';
import Button from '@/components/forms/Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onFileSelect }) => {
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
      // Reset the input to allow selecting the same file again if needed
      e.target.value = '';
    }
  };

  const handleUpload = () => {
    // This will be handled by the parent component when a file is selected
    console.log('Uploading file...');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--background)] rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Upload Resource</h2>
          <button 
            onClick={onClose}
            className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] hover:text-[var(--foreground)]"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div 
            className="border-2 border-dashed border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-lg p-8 text-center cursor-pointer hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="flex flex-col items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-[var(--color-primary)] mb-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <p className="text-[var(--foreground)] mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">Video, PDF, DOC, PPT (max 500MB)</p>
              <input 
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="video/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
              />
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-[var(--foreground)] mb-3 text-center">Or upload from cloud storage</p>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center p-3 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-md hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] transition-colors">
                <div className="w-8 h-8 mb-1 bg-blue-500 rounded"></div>
                <span className="text-sm">Google Drive</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-md hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] transition-colors">
                <div className="w-8 h-8 mb-1 bg-blue-400 rounded"></div>
                <span className="text-sm">OneDrive</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded-md hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] transition-colors">
                <div className="w-8 h-8 mb-1 bg-blue-300 rounded"></div>
                <span className="text-sm">Dropbox</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;