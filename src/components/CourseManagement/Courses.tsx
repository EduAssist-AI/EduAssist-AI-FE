import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import ConfirmDeleteModal from "../common/ConfirmDeleteModel";
import { toast } from "react-toastify";
import { Course } from "./CourseTypes";

type Props = {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
};

export default function Courses({ courses, setCourses }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleCreateOrEdit = async () => {
    try {
      if (editingCourse) {
        const res = await axiosInstance.put(`/api/v1/courses/${editingCourse.courseId}`, {
          name: formValues.name,
          description: formValues.description
        });
        setCourses(prev => prev.map(c => c.courseId === editingCourse.courseId ? res.data : c));
        toast.success("Course updated!");
      } else {
        const res = await axiosInstance.post("/api/v1/courses/", formValues);
        setCourses(prev => [...prev, res.data]);
        toast.success("Course created!");
      }
      setShowCreateForm(false);
      setFormValues({ name: "", description: "" });
      setEditingCourse(null);
    } catch (error: any) {
      console.error("Error creating/updating course:", error);
      toast.error(error.response?.data?.detail || "Failed to save course.");
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setLoading(prev => ({ ...prev, [confirmId]: true }));
    try {
      await axiosInstance.delete(`/api/v1/courses/${confirmId}`);
      setCourses(prev => prev.filter(c => c.courseId !== confirmId));
      toast.success("Course deleted!");
    } catch (error: any) {
      console.error("Error deleting course:", error);
      toast.error(error.response?.data?.detail || "Failed to delete course.");
    } finally {
      setConfirmId(null);
      setLoading(prev => ({ ...prev, [confirmId]: false }));
    }
  };

  const handleJoinCourse = async (courseId: string) => {
    try {
      // This would require the course invitation code which we don't have in the card view
      // In a real implementation, this would happen on a separate join course page
      toast.info("Use the invitation code to join this course");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to join course.");
    }
  };

  return (
    <div className="relative">
      {/* Floating Button */}
      <button
        onClick={() => {
          setEditingCourse(null);
          setFormValues({ name: "", description: "" });
          setShowCreateForm(true);
        }}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        +
      </button>

      {/* Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {editingCourse ? "Edit Course" : "Create Course"}
            </h2>
            <input
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Course Name"
              value={formValues.name}
              onChange={e => setFormValues({ ...formValues, name: e.target.value })}
              required
            />
            <textarea
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Course Description"
              value={formValues.description}
              onChange={e => setFormValues({ ...formValues, description: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-600 dark:text-gray-300 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                {editingCourse ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this course? This will also delete all modules and associated content."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {courses.map((course, index) => (
          <div key={course.courseId} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">C{index + 1}</span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === course.courseId ? null : course.courseId)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <FiMoreVertical size={20} />
                </button>
                {activeMenu === course.courseId && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-20">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setFormValues({ name: course.name, description: course.description || "" });
                        setShowCreateForm(true);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setConfirmId(course.courseId);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mt-5">
              <span className="text-sm text-gray-500 dark:text-gray-400">Course #{index + 1}</span>
              <h4 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white max-w-[90%] truncate">
                {course.name}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{new Date(course.createdAt).toLocaleDateString()}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-2 max-h-12 overflow-hidden" title={course.description || ''}>
                {course.description || 'No description provided'}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  course.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {course.status}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 truncate max-w-[100px]" title={course.invitationCode}>
                  Code: {course.invitationCode}
                </span>
              </div>

              <div className="absolute bottom-5 right-5 flex flex-col gap-2">
                <Link to={`/courses/${course.courseId}`} state={{ course }}>
                  <Badge color="primary" size="sm">
                    View Details
                  </Badge>
                </Link>
                <button
                  onClick={() => handleJoinCourse(course.courseId)}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Join Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}