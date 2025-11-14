import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { Module } from '../../components/CourseManagement/CourseTypes';
import RAGView from '../../components/CourseManagement/RAGView';
import Card from '../../components/CourseManagement/Card';
import ResourceUpload from '../../components/CourseManagement/ResourceUpload';
import { moduleApi, type Resource, type ResourceUploadResponse} from '../../api/modules';

// Define the ChatMessage interface
interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'system';
  timestamp: string;
}

export default function ModuleDetail() {
  const params = useParams<{ courseId: string; moduleId: string }>();
  const courseId = params.courseId!;
  const moduleId = params.moduleId!;
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [leftColumnExpanded, setLeftColumnExpanded] = useState(true);
  const [rightColumnExpanded, setRightColumnExpanded] = useState(true);
  const [activeView, setActiveView] = useState<'quiz' | 'chat' | 'notes' | 'resources'>('chat');
  const [resources, setResources] = useState<Resource[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId && moduleId) {
      fetchModule();
      fetchResources();
    }
  }, [courseId, moduleId]);

  const fetchModule = async () => {
    if (!courseId || !moduleId) return;

    try {
      setLoading(true);

      // Fetch module details
      const response = await axiosInstance.get(`/api/v1/modules/${moduleId}`);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
            // If it returns an array, treat as Module[] and find by ID
            const moduleData = (response.data as Module[]).find((m: Module) => m.moduleId === moduleId);
            setModule(moduleData || null);
          } else {
            setModule(response.data as Module);
          }
      } else {
        toast.error("Failed to fetch module details");
        navigate(`/courses/${courseId}`);
        return;
      }
    } catch (error) {
      console.error("Error fetching module:", error);
      toast.error("Unexpected error. Please try again.");
      navigate(`/courses/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    if (!moduleId) return;

    try {
      const response = await moduleApi.getModuleResources(moduleId);
      setResources(response.resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to fetch resources");
    }
  };

  // const handleVideoUploadSuccess = (response: VideoUploadResponse) => {
  //   toast.success(`Video "${response.title}" uploaded successfully!`);
  //   setShowUploadForm(false);
  //   // Refresh the resources list to show the newly uploaded resource
  //   fetchResources();
  // };

  const handleResourceUploadSuccess = (response: ResourceUploadResponse) => {
    toast.success(`Resource "${response.title}" uploaded successfully!`);
    setShowUploadForm(false);
    // Refresh the resources list to show the newly uploaded resource
    fetchResources();
  };

  const handleUploadCancel = () => {
    setShowUploadForm(false);
  };

  const handleRenameResource = async (resource: Resource) => {
    // Prompt for new name
    const newName = prompt('Enter new name for the resource:', resource.title);

    if (newName && newName.trim() !== '' && newName.trim() !== resource.title) {
      try {
        const response = await axiosInstance.put(`/api/v1/courses/resources/${resource.id}`, {
          title: newName.trim()
        });

        if (response.status === 200) {
          toast.success(`Resource renamed to "${newName}"`);
          // Update the resources state to reflect the change
          setResources(prevResources =>
            prevResources.map(r =>
              r.id === resource.id ? { ...r, title: newName.trim() } : r
            )
          );
        } else {
          toast.error('Failed to rename resource');
        }
      } catch (error) {
        console.error('Error renaming resource:', error);
        toast.error('Failed to rename resource. Please try again.');
      }
    }
  };

  const handleDeleteResource = async (resource: Resource) => {
    if (!window.confirm(`Are you sure you want to delete "${resource.title}"? This action cannot be undone.`)) {
      return; // User canceled the deletion
    }

    try {
      const response = await axiosInstance.delete(`/api/v1/courses/resources/${resource.id}`);

      if (response.status === 200) {
        toast.success(`Resource "${resource.title}" deleted successfully!`);
        // Update the resources state to remove the deleted resource
        setResources(prevResources =>
          prevResources.filter(r => r.id !== resource.id)
        );
      } else {
        toast.error('Failed to delete resource');
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource. Please try again.');
    }
  };

  // Initialize chat messages
  const initialChatMessages: ChatMessage[] = [
    {
      id: '1',
      message: `Hello! I'm your AI assistant for ${module?.name}. How can I help you with this module today?`,
      sender: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ];

  // Function to render the active view in the center column
  const renderActiveView = () => {
    switch (activeView) {
      case 'chat':
        return <RAGView initialMessages={initialChatMessages} title="Module Chat" moduleId={moduleId} />;
      case 'quiz':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quiz Generator</h2>
            <p className="text-gray-600 dark:text-gray-300">Quiz functionality for {module?.name}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/quizzes`)}
            >
              Take Quiz
            </button>
          </div>
        );
      case 'notes':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Summary Notes</h2>
            <p className="text-gray-600 dark:text-gray-300">AI-generated summary notes for {module?.name}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/notes`)}
            >
              View Notes
            </button>
          </div>
        );
      case 'resources':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Resources</h2>
            {resources && resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded mr-3">
                        {resource.type === "pdf" && (
                          <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        )}
                        {resource.type === "docx" && (
                          <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {resource.type === "txt" && (
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {(resource.type === "video" || !resource.type) && (
                          <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{resource.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{resource.type || 'resource'}</p>
                        <div className="mt-1 flex items-center space-x-4">
                          {/* <span className={`text-xs px-2 py-1 rounded-full ${
                            resource.status === 'COMPLETE'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : resource.status === 'PROCESSING'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {resource.status}
                          </span> */}
                          {/* {resource.hasTranscript && (
                            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">
                              Transcript
                            </span>
                          )} */}
                          {/* {resource.hasSummary && (
                            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-full">
                              Summary
                            </span>
                          )} */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRenameResource(resource);
                        }}
                      >
                        Rename
                      </button>
                      <button
                        className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteResource(resource);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No resources available for this module</p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="p-6 flex justify-center items-center">
            <p className="text-gray-600 dark:text-gray-300">Select a feature from the right column to view its content.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <>
        <PageMeta
          title="EduAssist-AI | Loading..."
          description="EduAssist-AI - Educational video and slide summarizer"
        />
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 dark:text-gray-400">Loading module...</p>
        </div>
      </>
    );
  }

  if (!module) {
    return (
      <>
        <PageMeta
          title="EduAssist-AI | Module Not Found"
          description="EduAssist-AI - Educational video and slide summarizer"
        />
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 dark:text-gray-400">Module not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={`EduAssist-AI | ${module.name}`}
        description={`EduAssist-AI - ${module.name}`}
      />

      <div className="flex flex-col flex-1 min-h-0 w-full"> {/* Use flex-1 to fill available space, min-h-0 to prevent overflow */}
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white mr-4"
              >
                Back
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white inline">{module.name}</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(module.createdAt).toLocaleDateString()}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{module.description}</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Left Column - Resources */}
          <div
            className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${
              leftColumnExpanded ? 'w-64' : 'w-16'
            }`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              {leftColumnExpanded && <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Resources</h2>}
              <button
                onClick={() => setLeftColumnExpanded(!leftColumnExpanded)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {leftColumnExpanded ? (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {leftColumnExpanded && (
              <div className="p-4 flex-1 overflow-auto min-h-0">
                {showUploadForm ? (
                  <ResourceUpload
                    moduleId={moduleId}
                    onUploadSuccess={handleResourceUploadSuccess}
                    onCancel={handleUploadCancel}
                  />
                ) : (
                  <>
                    <div className="mb-6">
                      <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
                        onClick={() => setShowUploadForm(true)}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Resource
                      </button>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 dark:text-white mb-3">Module Resources</h3>
                      <div className="space-y-2">
                        {resources && resources.length > 0 ? (
                          resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            >
                              <div className="flex items-center">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded mr-3">
                                  {resource.type === "pdf" && (
                                    <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                  {resource.type === "docx" && (
                                    <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                  {resource.type === "txt" && (
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                  {(resource.type === "video" || !resource.type) && (
                                    <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{resource.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{resource.type || 'video'} </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">No resources available for this module</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Center Column - Viewer Section */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex-1 overflow-auto min-h-0">
              {renderActiveView()}
            </div>
          </div>

          {/* Right Column - Feature Cards */}
          <div
            className={`bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ${
              rightColumnExpanded ? 'w-80' : 'w-16'
            }`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              {rightColumnExpanded && <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Features</h2>}
              <button
                onClick={() => setRightColumnExpanded(!rightColumnExpanded)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {rightColumnExpanded ? (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {rightColumnExpanded && (
              <div className="p-4 flex-1 min-h-0" style={{ overflowY: 'auto', maxHeight: '500px' }}>
                <div className="space-y-4 h-full">
                  <Card
                    title="Module Chat"
                    description="Ask questions and interact with the AI trained on module content."
                    onClick={() => setActiveView('chat')}
                    className="cursor-pointer hover:shadow-md"
                  />

                  <Card
                    title="Quiz Generator"
                    description="Generate and take AI-powered quizzes based on module content."
                    onClick={() => setActiveView('quiz')}
                    className="cursor-pointer hover:shadow-md"
                  />

                  <Card
                    title="Summary Notes"
                    description="Access AI-generated summaries for each resource in the module."
                    onClick={() => setActiveView('notes')}
                    className="cursor-pointer hover:shadow-md"
                  />

                  <Card
                    title="Resources"
                    description="View and manage all resources for this module."
                    onClick={() => setActiveView('resources')}
                    className="cursor-pointer hover:shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}