import React, { useState } from 'react';
import { moduleApi, type ResourceUploadResponse } from '../../api/modules';

interface ResourceUploadProps {
  moduleId: string;
  onUploadSuccess?: (resource: ResourceUploadResponse) => void;
  onCancel?: () => void;
}

const ResourceUpload: React.FC<ResourceUploadProps> = ({ moduleId, onUploadSuccess, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploadToDrive, setUploadToDrive] = useState(false); // Default to false (do not upload to drive)
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file type is a video, PDF, DOCX, or TXT
      if (
        selectedFile.type.startsWith('video/') || 
        selectedFile.type === 'application/pdf' ||
        selectedFile.type === 'application/msword' ||
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        selectedFile.type === 'text/plain'
      ) {
        setFile(selectedFile);
        // Set default title as the filename without extension
        if (!title) {
          const fileName = selectedFile.name.replace(/\.[^/.]+$/, '');
          setTitle(fileName);
        }
        setError(null);
      } else {
        setError('Please select a valid file (video, PDF, DOCX, or TXT)');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title for the resource');
      return;
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress for better UX (since axios doesn't have built-in progress for uploads)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      const response = await moduleApi.uploadModuleResource(moduleId, file, title, uploadToDrive);

      clearInterval(progressInterval);
      setProgress(100);

      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    } catch (err) {
      console.error('Error uploading resource:', err);
      setError('Failed to upload resource. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upload Resource</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="resourceFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Resource File
        </label>
        <div className="flex items-center">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            {file ? (
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {file.type.startsWith('video/') && 'Video'}
                  {file.type === 'application/pdf' && 'PDF Document'}
                  {file.type === 'application/msword' && 'Word Document'}
                  {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && 'Word Document'}
                  {file.type === 'text/plain' && 'Text File'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, AVI, PDF, DOCX, TXT (MAX. 2GB)</p>
              </div>
            )}
            <input
              id="resourceFile"
              type="file"
              className="hidden"
              accept="video/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="resourceTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Resource Title
        </label>
        <input
          type="text"
          id="resourceTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Enter resource title"
          disabled={isUploading}
        />
      </div>

      <div className="mb-4 flex items-start">
        <div className="flex items-center h-5">
          <input
            id="upload-to-drive"
            type="checkbox"
            checked={uploadToDrive}
            onChange={(e) => setUploadToDrive(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isUploading}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="upload-to-drive" className="font-medium text-gray-700 dark:text-gray-300">
            Upload to Google Drive
          </label>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Check this box to upload resource to Google Drive instead of external source
          </p>
        </div>
      </div>

      {isUploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Uploading... {progress}%</p>
        </div>
      )}

      <div className="flex space-x-3">
        <button
          onClick={handleUpload}
          disabled={isUploading || !file || !title.trim()}
          className={`flex-1 px-4 py-2 rounded-md text-white font-medium ${
            isUploading || !file || !title.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Resource'}
        </button>

        <button
          onClick={handleCancel}
          disabled={isUploading}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 font-medium bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResourceUpload;