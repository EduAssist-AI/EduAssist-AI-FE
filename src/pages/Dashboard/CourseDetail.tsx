import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modules from '../../components/CourseManagement/Modules';
import PageMeta from '../../components/common/PageMeta';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { Course, Module } from '../../components/CourseManagement/CourseTypes';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      fetchCourseAndModules();
    }
  }, [courseId]);

  const fetchCourseAndModules = async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      
      // Fetch course details
      const courseResponse = await axiosInstance.get(`/api/v1/courses/${courseId}`);
      if (courseResponse.status === 200) {
        setCourse(courseResponse.data);
      } else {
        toast.error("Failed to fetch course details");
        navigate("/home");
        return;
      }

      // Fetch modules for this course
      const modulesResponse = await axiosInstance.get(`/api/v1/courses/${courseId}/modules`);
      if (modulesResponse.status === 200) {
        // Check if response.data is an array, if not, extract modules if they are nested
        if (Array.isArray(modulesResponse.data)) {
          setModules(modulesResponse.data);
        } else if (modulesResponse.data.modules && Array.isArray(modulesResponse.data.modules)) {
          setModules(modulesResponse.data.modules);
        } else if (modulesResponse.data.data && Array.isArray(modulesResponse.data.data)) {
          // Common pattern: { data: [...] }
          setModules(modulesResponse.data.data);
        } else {
          // If response is a single object with a list property, or just return empty array
          setModules([]);
        }
      } else {
        toast.error("Failed to fetch modules");
      }
    } catch (error) {
      console.error("Error fetching course or modules:", error);
      toast.error("Unexpected error. Please try again.");
      navigate("/home");
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
          <p className="text-gray-500 dark:text-gray-400">Loading course...</p>
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <PageMeta
          title="EduAssist-AI | Course Not Found"
          description="EduAssist-AI - Educational video and slide summarizer"
        />
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 dark:text-gray-400">Course not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={`EduAssist-AI | ${course.name}`}
        description={`EduAssist-AI - ${course.name}`}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{course.name}</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{course.description}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className={`px-2 py-1 text-xs rounded-full ${
                course.status === 'ACTIVE' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {course.status}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Code: {course.invitationCode}
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Modules</h2>
          </div>
          
          {modules.length > 0 ? (
            <Modules modules={modules} setModules={setModules} courseId={courseId!} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No modules in this course yet.</p>
              <button
                onClick={() => {
                  // Trigger the create module form by setting the modules state
                  // This will be handled by the Modules component
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                Create the first module
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}