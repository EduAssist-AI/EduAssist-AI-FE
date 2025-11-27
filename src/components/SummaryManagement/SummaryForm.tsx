import React, { useState } from 'react';
import { moduleApi, type SummaryCreate, type SummaryResponse } from '../../api/modules';

interface SummaryFormProps {
  moduleId: string;
  courseId: string;
  videoId?: string;
  resourceId?: string;
  initialSummary?: SummaryResponse;
  onSummaryCreated?: (summary: SummaryResponse) => void;
  onSummaryUpdated?: (summary: SummaryResponse) => void;
  onCancel?: () => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ 
  moduleId, 
  courseId, 
  videoId, 
  resourceId,
  initialSummary,
  onSummaryCreated,
  onSummaryUpdated,
  onCancel
}) => {
  const [formData, setFormData] = useState<SummaryCreate>({
    content: initialSummary?.content || '',
    length_type: initialSummary?.lengthType as 'BRIEF' | 'DETAILED' | 'COMPREHENSIVE' || 'DETAILED',
    focus_areas: initialSummary?.focusAreas || [],
    custom_prompt: initialSummary?.content || '',
    is_published: initialSummary?.isPublished || false,
    video_id: videoId || initialSummary?.videoId,
    resource_id: resourceId || initialSummary?.resourceId,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'is_published' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFocusAreasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const focusAreas = e.target.value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, focus_areas: focusAreas }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (initialSummary) {
        // Update existing summary
        const updatedSummary = await moduleApi.updateSummary(initialSummary.summaryId, formData);
        if (onSummaryUpdated) {
          onSummaryUpdated(updatedSummary);
        }
      } else {
        // Create new summary
        // Add module and course info
        const newSummaryData = {
          ...formData,
          video_id: videoId,
          resource_id: resourceId,
          // Note: moduleApi.createSummary expects SummaryCreate but doesn't include moduleId/couseId
          // which is handled by the backend when associating with module
        };
        const newSummary = await moduleApi.createSummary(newSummaryData);
        if (onSummaryCreated) {
          onSummaryCreated(newSummary);
        }
      }
    } catch (err) {
      console.error('Error saving summary:', err);
      setError('Failed to save summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="heading-md mb-4">
        {initialSummary ? 'Edit Summary' : 'Create New Summary'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Summary Content:
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
            placeholder="Enter the summary content..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Length Type:
            </label>
            <select
              name="length_type"
              value={formData.length_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            >
              <option value="BRIEF">Brief</option>
              <option value="DETAILED">Detailed</option>
              <option value="COMPREHENSIVE">Comprehensive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Published Status:
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {formData.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Focus Areas (comma-separated):
          </label>
          <input
            type="text"
            value={formData.focus_areas.join(', ')}
            onChange={handleFocusAreasChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., algorithms, applications, theory"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Prompt (optional):
          </label>
          <textarea
            name="custom_prompt"
            value={formData.custom_prompt || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter a custom prompt for the summary..."
            disabled={loading}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="button-primary inline-flex justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialSummary ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              initialSummary ? 'Update Summary' : 'Create Summary'
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SummaryForm;