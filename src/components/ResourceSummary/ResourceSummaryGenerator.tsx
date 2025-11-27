import React, { useState } from 'react';
import { moduleApi, type SummaryRequest } from '../../api/modules';

interface ResourceSummaryGeneratorProps {
  resourceId: string;
  moduleId: string;
  courseId: string;
  onSummaryGenerated?: (summary: string) => void;
}

const ResourceSummaryGenerator: React.FC<ResourceSummaryGeneratorProps> = ({ 
  resourceId, 
  moduleId,
  courseId,
  onSummaryGenerated 
}) => {
  const [lengthType, setLengthType] = useState<'BRIEF' | 'DETAILED' | 'COMPREHENSIVE'>('DETAILED');
  const [focusAreas, setFocusAreas] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestData: SummaryRequest = {
        length_type: lengthType,
        ...(focusAreas && {
          focus_areas: focusAreas.split(',').map(item => item.trim()).filter(item => item)
        }),
        ...(customPrompt && { custom_prompt: customPrompt })
      };

      // Generate summary for the resource
      const response = await moduleApi.generateResourceSummary(resourceId, requestData);

      if (onSummaryGenerated) {
        onSummaryGenerated(response.content);
      }
    } catch (err) {
      console.error('Error generating summary:', err);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="heading-md mb-4">Generate Resource Summary</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Summary Length:
          </label>
          <select
            value={lengthType}
            onChange={(e) => setLengthType(e.target.value as 'BRIEF' | 'DETAILED' | 'COMPREHENSIVE')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
          >
            <option value="BRIEF">Brief</option>
            <option value="DETAILED">Detailed</option>
            <option value="COMPREHENSIVE">Comprehensive</option>
          </select>
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
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Prompt:
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Optional custom prompt (use {content} to insert the resource content)"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="button-primary w-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Summary'
          )}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResourceSummaryGenerator;