import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from '../../components/CourseManagement/Courses';
import StatisticsChart from '../../components/ecommerce/StatisticsChart';
import MonthlyTarget from '../../components/ecommerce/MonthlyTarget';
import RecentOrders from '../../components/ecommerce/RecentOrders';
import DemographicCard from '../../components/ecommerce/DemographicCard';
import PageMeta from '../../components/common/PageMeta';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify';
import { Course } from '../../components/CourseManagement/CourseTypes';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/courses/");
      if (response.status === 200) {
        // Check if response.data is an array, if not, extract courses if they are nested
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data.courses && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Common pattern: { data: [...] }
          setCourses(response.data.data);
        } else {
          // If response is a single object with a list property, or just return empty array
          setCourses([]);
        }
      } else {
        toast.error("Failed to fetch courses");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Unexpected error. Please log in again.");
      
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageMeta
        title="EduAssist-AI | Dashboard"
        description="EduAssist-AI - Educational video and slide summarizer"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <div className="col-span-12 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              My Courses
            </h1>
            <button
              className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
              onClick={fetchCourses}
            >
              Refresh
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow px-4 py-2">
            <input
              type="text"
              placeholder="🔍 Search Courses..."
              className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading courses...</p>
          ) : (
            <Courses courses={filteredCourses} setCourses={setCourses} />
          )}
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
