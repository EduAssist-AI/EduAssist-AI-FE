import React, { useState, useEffect } from 'react';
import { moduleApi, type ResourceWithSummary, type SummaryRequest } from '../../api/modules';

interface SummaryCreatorProps {
  courseId: string;
  onSummaryCreated?: () => void;
}

const SummaryCreator: React.FC<SummaryCreatorProps> = ({ courseId, onSummaryCreated }) => {
  const [resources, setResources] = useState<ResourceWithSummary[]>([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const [lengthType, setLengthType] = useState<'BRIEF' | 'DETAILED' | 'COMPREHENSIVE'>('DETAILED');
  const [focusAreas, setFocusAreas] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, [courseId]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await moduleApi.getResourcesWithSummaries(courseId);
      setResources(response.resources);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to fetch resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResourceToggle = (resourceId: string) => {
    setSelectedResourceIds(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedResourceIds.length === resources.length) {
      setSelectedResourceIds([]);
    } else {
      setSelectedResourceIds(resources.map(r => r.resourceId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedResourceIds.length === 0) {
      setError('Please select at least one resource to create a summary for.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const requestData: SummaryRequest = {
        length_type: lengthType,
        ...(focusAreas && {
          focus_areas: focusAreas.split(',').map(item => item.trim()).filter(item => item)
        }),
        ...(customPrompt && { custom_prompt: customPrompt })
      };

      // Generate summaries for each selected resource
      for (const resourceId of selectedResourceIds) {
        await moduleApi.generateResourceSummary(resourceId, requestData);
      }

      if (onSummaryCreated) {
        onSummaryCreated();
      }

      // Reset form
      setSelectedResourceIds([]);
      setFocusAreas('');
      setCustomPrompt('');
    } catch (err) {
      console.error('Error creating summaries:', err);
      setError('Failed to create summaries. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full min-h-0">
      <div className="p-6 flex-shrink-0">
        <h3 className="heading-md mb-4">Create New Summaries</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
      </div>

      <div className="flex-grow overflow-y-auto min-h-0 p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Resources:
              </label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                {selectedResourceIds.length === resources.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-gray-50 dark:bg-gray-700">
              {resources.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No resources available</p>
              ) : (
                resources.map(resource => (
                  <div key={resource.resourceId} className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                    <input
                      type="checkbox"
                      id={`resource-${resource.resourceId}`}
                      checked={selectedResourceIds.includes(resource.resourceId)}
                      onChange={() => handleResourceToggle(resource.resourceId)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`resource-${resource.resourceId}`}
                      className="ml-3 flex-1 min-w-0 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                          {resource.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          resource.hasSummary
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {resource.hasSummary ? 'Has Summary' : 'No Summary'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {resource.type} • {resource.status}
                      </p>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Summary Length:
              </label>
              <select
                value={lengthType}
                onChange={(e) => setLengthType(e.target.value as 'BRIEF' | 'DETAILED' | 'COMPREHENSIVE')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={submitting}
              >
                <option value="BRIEF">Brief</option>
                <option value="DETAILED">Detailed</option>
                <option value="COMPREHENSIVE">Comprehensive</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Focus Areas (comma-separated):
            </label>
            <input
              type="text"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
              placeholder="e.g., algorithms, applications, theory"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={submitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Prompt (optional):
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter custom instructions for the summary generation..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || selectedResourceIds.length === 0}
            className={`button-primary w-full flex justify-center ${
              selectedResourceIds.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Summaries...
              </>
            ) : (
              `Create Summary for ${selectedResourceIds.length} Resource${selectedResourceIds.length !== 1 ? 's' : ''}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SummaryCreator;