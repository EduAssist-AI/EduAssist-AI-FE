import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Courses from '../../components/CourseManagement/Courses';
// import StatisticsChart from '../../components/ecommerce/StatisticsChart';
// import MonthlyTarget from '../../components/ecommerce/MonthlyTarget';
// import RecentOrders from '../../components/ecommerce/RecentOrders';
// import DemographicCard from '../../components/ecommerce/DemographicCard';
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="heading-xl">
              My Courses
            </h1>
            <button
              className="button-secondary text-sm px-4 py-2"
              onClick={fetchCourses}
            >
              Refresh
            </button>
          </div>

          <div className="card p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Search Courses..."
                className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Courses courses={filteredCourses} setCourses={setCourses} />
          )}
        </div>

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
