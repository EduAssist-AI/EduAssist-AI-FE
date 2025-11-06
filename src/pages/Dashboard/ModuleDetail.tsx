import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { Module } from '../../components/CourseManagement/CourseTypes';

export default function ModuleDetail() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId && moduleId) {
      fetchModule();
    }
  }, [courseId, moduleId]);

  const fetchModule = async () => {
    if (!courseId || !moduleId) return;
    
    try {
      setLoading(true);
      
      // Fetch module details
      const response = await axiosInstance.get(`/api/v1/modules/${moduleId}`);
      if (response.status === 200) {
        setModule(response.data);
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
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{module.name}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{module.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Created: {new Date(module.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
          >
            Back
          </button>
        </div>

        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Module Content</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white">Videos</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">This module contains video lectures and materials.</p>
                <button 
                  className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  onClick={() => navigate(`/courses/${courseId}/videos`)}
                >
                  View Videos
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white">Quizzes</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Test your knowledge with module quizzes.</p>
                <button 
                  className="mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  onClick={() => navigate(`/courses/${courseId}/modules/${moduleId}/quizzes`)}
                >
                  Take Quizzes
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white">Resources</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Additional resources for this module.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}