import React, { useState, useEffect, useRef } from 'react';
import { moduleApi, type ResourceWithSummary } from '../../api/modules';

interface SummaryListProps {
  moduleId: string;
  courseId: string;
}

const SummaryList: React.FC<SummaryListProps> = ({ moduleId, courseId }) => {
  const [resources, setResources] = useState<ResourceWithSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<ResourceWithSummary | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchResourcesWithSummaries();
  }, [courseId]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchResourcesWithSummaries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the correct API endpoint that returns resources with their summaries
      const response = await moduleApi.getResourcesWithSummaries(courseId);
      // Filter to only resources that have summaries
      const resourcesWithSummaries = response.resources.filter(r => r.hasSummary);
      setResources(resourcesWithSummaries);
    } catch (err) {
      console.error('Error fetching resources with summaries:', err);
      setError('Failed to fetch resources with summaries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (resourceId: string, currentStatus: boolean) => {
    // Find the resource to get its summaryId
    const resource = resources.find(r => r.resourceId === resourceId);
    if (!resource || !resource.summaryId) return;

    try {
      const response = await moduleApi.updateSummaryPublishStatus(resource.summaryId, !currentStatus);

      // Update the resource with the new summary status
      setResources(prev =>
        prev.map(r =>
          r.resourceId === resourceId
            ? {
                ...r,
                isPublished: response.isPublished,
                summaryContent: response.content
              }
            : r
        )
      );
    } catch (err) {
      console.error('Error updating summary publish status:', err);
      setError('Failed to update summary status. Please try again.');
    }
  };

  const handleDelete = async (resourceId: string) => {
    const resource = resources.find(r => r.resourceId === resourceId);
    if (!resource || !resource.summaryId) return;

    if (!window.confirm('Are you sure you want to delete this summary? This action cannot be undone.')) {
      return;
    }

    try {
      await moduleApi.deleteSummary(resource.summaryId);
      setResources(prev => prev.filter(r => r.resourceId !== resourceId));
    } catch (err) {
      console.error('Error deleting summary:', err);
      setError('Failed to delete summary. Please try again.');
    }
  };

  const downloadSummaryAsPDF = (summaryId: string, title: string, content: string) => {
    // Create a properly formatted text document that can be opened in text editors or document viewers
    const summaryText = `====================================================================
                    SUMMARY REPORT
====================================================================

Title: ${title}

Summary Type: ${resources.find(r => r.summaryId === summaryId)?.summaryLengthType || 'N/A'}
Published: ${resources.find(r => r.summaryId === summaryId)?.isPublished ? 'Yes' : 'No'}
Generated on: ${new Date().toLocaleString()}

====================================================================
SUMMARY CONTENT:
====================================================================

${content}

====================================================================
END OF SUMMARY
====================================================================`;

    // Create a text file with .txt extension that looks more like a document
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link for download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[<>:"/\\|?*]/g, '_')}_summary.txt`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const viewSummaryDetails = (summaryId: string) => {
    // Find the resource with the matching summaryId and set it as selected
    const resource = resources.find(r => r.summaryId === summaryId);
    if (resource) {
      setSelectedSummary(resource);
    }
  };

  const closeModal = () => {
    setSelectedSummary(null);
  };

  const toggleDropdown = (resourceId: string) => {
    setOpenDropdownId(openDropdownId === resourceId ? null : resourceId);
  };

  const toggleExpand = (resourceId: string) => {
    setExpandedSummaryId(expandedSummaryId === resourceId ? null : resourceId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="flex flex-col h-full">
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Resource Summaries</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {resources.length} summary{resources.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {resources.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No summaries</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No summaries have been created for resources in this module yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
          {resources.map((resource) => (
            <div 
              key={resource.resourceId}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {resource.title}
                    </h3>
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      resource.isPublished 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {resource.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {resource.summaryLengthType}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {expandedSummaryId === resource.resourceId ? (
                      <div className="whitespace-pre-line">
                        {resource.summaryContent}
                      </div>
                    ) : (
                      <>
                        {resource.summaryContent?.substring(0, 200)}
                        {resource.summaryContent && resource.summaryContent.length > 200 && '...'}
                      </>
                    )}
                  </div>

                  {resource.hasTranscript && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mr-2 mb-1">
                      Transcript Available
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleExpand(resource.resourceId)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title={expandedSummaryId === resource.resourceId ? "Collapse" : "Expand"}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {expandedSummaryId === resource.resourceId ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      )}
                    </svg>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(resource.resourceId)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdownId === resource.resourceId && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleTogglePublish(resource.resourceId, resource.isPublished);
                              setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {resource.isPublished ? 'Unpublish' : 'Publish'}
                          </button>

                          <button
                            onClick={() => {
                              downloadSummaryAsPDF(resource.summaryId || '', resource.title, resource.summaryContent || '');
                              setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Download PDF
                          </button>

                          <button
                            onClick={() => {
                              viewSummaryDetails(resource.summaryId || '');
                              setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              handleDelete(resource.resourceId);
                              setOpenDropdownId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                Created: {resource.createdAt ? new Date(resource.createdAt).toLocaleString() : 'N/A'} | Type: {resource.type}
              </div>
            </div>
          ))}
        </div>
      )}
      </div> {/* Close the flex-grow container */}

      {/* Modal for viewing full summary */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Modal header - document-like title bar */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold truncate max-w-xs md:max-w-md">
                  {selectedSummary.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal content - document viewer style */}
            <div className="p-6 overflow-y-auto flex-grow bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <div className="prose prose-gray max-w-none bg-white dark:bg-gray-700 p-6 rounded-lg shadow min-h-full border border-gray-200 dark:border-gray-600">
                <div className="whitespace-pre-line text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  {selectedSummary.summaryContent}
                </div>
              </div>
            </div>

            {/* Modal footer - document controls */}
            <div className="bg-gray-100 dark:bg-gray-700 p-3 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedSummary.summaryLengthType} • {selectedSummary.isPublished ? 'Published' : 'Draft'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedSummary.summaryContent ? `${selectedSummary.summaryContent.split(/\s+/).length} words` : '0 words'}
                </span>
              </div>
              <button
                onClick={() => selectedSummary.summaryId && downloadSummaryAsPDF(selectedSummary.summaryId, selectedSummary.title, selectedSummary.summaryContent || '')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryList;