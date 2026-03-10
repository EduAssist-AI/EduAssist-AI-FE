import React, { useState, useEffect } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import Checkbox from '../form/input/Checkbox';
import { Resource, moduleApi } from '../../api/modules';
import { useAuth } from '../../hooks/useAuth';

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  moduleId: string;
  selectedResourceIds: string[];
  onResourceSelect: (resourceId: string, selected: boolean) => void;
  onApply: () => void;
  onClear: () => void;
}

const ResourcesDropdown: React.FC<ResourcesDropdownProps> = ({
  isOpen,
  onClose,
  moduleId,
  selectedResourceIds,
  onResourceSelect,
  onApply,
  onClear,
}) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (isOpen && moduleId && moduleId !== '' && token) {
      loadResources();
    } else if (isOpen && (!moduleId || moduleId === '')) {
      // If no module ID is provided, set resources to empty
      setResources([]);
      setIsLoading(false);
    }
  }, [isOpen, moduleId, token]);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const response = await moduleApi.getModuleResources(moduleId);
      setResources(response.resources);
    } catch (error) {
      console.error('Error loading resources:', error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResourceToggle = (resourceId: string) => {
    const isSelected = selectedResourceIds.includes(resourceId);
    onResourceSelect(resourceId, !isSelected);
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleClear = () => {
    onClear();
    onClose();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      position="top"
      className="w-[380px] max-h-[480px] flex flex-col rounded-xl border border-gray-200 bg-white p-0 shadow-xl dark:border-gray-700 dark:bg-gray-dark z-50"
    >
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resources
          </h3>
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-80">
        {isLoading ? (
          <div className="py-8 px-5 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 dark:text-gray-400">Loading resources...</p>
          </div>
        ) : moduleId === '' ? (
          <div className="py-8 px-5 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306" />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">No module selected</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="py-8 px-5 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306" />
            </svg>
            <p className="mt-2 text-gray-500 dark:text-gray-400">No resources available</p>
          </div>
        ) : (
          <div className="py-3 px-1">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`flex items-start gap-3 p-3.5 mx-3 rounded-lg transition-colors ${
                  selectedResourceIds.includes(resource.id)
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Checkbox
                  checked={selectedResourceIds.includes(resource.id)}
                  onChange={() => handleResourceToggle(resource.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 dark:text-white truncate">
                    {resource.title}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-600/60 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      {resource.type.toUpperCase()}
                    </span>
                    {resource.durationSeconds > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-600/60 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {Math.floor(resource.durationSeconds / 60)} min
                      </span>
                    )}
                    {resource.hasTranscript && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Transcript
                      </span>
                    )}
                    {resource.hasSummary && (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Summary
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleApply}
          disabled={selectedResourceIds.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
            selectedResourceIds.length === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform'
          }`}
        >
          {selectedResourceIds.length > 0 && (
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
          Apply Resources ({selectedResourceIds.length})
        </button>
      </div>
    </Dropdown>
  );
};

export default ResourcesDropdown;