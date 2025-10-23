import React from 'react';
import { VideoIcon, UploadIcon } from '@/components/ui/Icons';

interface ResourceItemProps {
  id: string;
  title: string;
  type: string; 
  duration?: string; // For videos
  size?: string; // For files
  uploadDate: string;
  onClick: () => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ 
  title, 
  type, 
  duration, 
  size, 
  uploadDate,
  onClick 
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return <VideoIcon className="w-5 h-5 text-[var(--color-primary)]" />;
      case 'pdf':
        return <UploadIcon className="w-5 h-5 text-red-500" />;
      case 'doc':
        return <UploadIcon className="w-5 h-5 text-blue-500" />;
      case 'ppt':
        return <UploadIcon className="w-5 h-5 text-orange-500" />;
      case 'image':
        return <UploadIcon className="w-5 h-5 text-green-500" />;
      default:
        return <UploadIcon className="w-5 h-5 text-[var(--color-primary)]" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'video': return 'Video';
      case 'pdf': return 'PDF';
      case 'doc': return 'Document';
      case 'ppt': return 'Presentation';
      case 'image': return 'Image';
      default: return 'File';
    }
  };

  return (
    <div 
      className="p-3 rounded hover:bg-[var(--color-neutral-light)] dark:hover:bg-[var(--color-neutral-dark)] cursor-pointer transition-colors border border-transparent hover:border-[var(--color-neutral-light)] dark:hover:border-[var(--color-neutral-dark)]"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {getTypeIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{title}</p>
          <div className="flex flex-wrap gap-2 mt-1 text-xs text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
            <span className="px-2 py-1 bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] rounded">
              {getTypeLabel()}
            </span>
            {duration && (
              <span className="px-2 py-1 bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] rounded">
                {duration}
              </span>
            )}
            {size && (
              <span className="px-2 py-1 bg-[var(--color-neutral-light)] dark:bg-[var(--color-neutral-dark)] rounded">
                {size}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mt-1">
            Uploaded: {uploadDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;