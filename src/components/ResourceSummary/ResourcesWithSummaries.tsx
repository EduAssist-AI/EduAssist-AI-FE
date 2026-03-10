import React, { useState } from 'react';
import SummaryCreator from '../SummaryManagement/SummaryCreator';
import SummaryList from '../SummaryManagement/SummaryList';

interface ResourcesWithSummariesProps {
  courseId: string;
}

const ResourcesWithSummaries: React.FC<ResourcesWithSummariesProps> = ({ courseId }) => {
  const [showCreator, setShowCreator] = useState(false);

  // Function to refresh summaries when a new one is created
  const handleSummaryCreated = () => {
    setShowCreator(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Module Summaries</h2>
          <button
            className="button-primary flex items-center"
            onClick={() => setShowCreator(!showCreator)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {showCreator ? 'Cancel' : 'Create Summary'}
          </button>
        </div>

        {showCreator && (
          <div className="mb-6">
            <SummaryCreator
              courseId={courseId}
              onSummaryCreated={handleSummaryCreated}
            />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 overflow-auto bg-white dark:bg-gray-800 min-h-0">
        <SummaryList courseId={courseId} />
      </div>
    </div>
  );
};

export default ResourcesWithSummaries;