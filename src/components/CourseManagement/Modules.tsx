import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import ConfirmDeleteModal from "../common/ConfirmDeleteModel";
import { toast } from "react-toastify";
import { Module } from "./CourseTypes";

type Props = {
  modules: Module[];
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
  courseId: string; // Course ID this module belongs to
};

export default function Modules({ modules, setModules, courseId }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formValues, setFormValues] = useState({ name: "", description: "" });
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleCreateOrEdit = async () => {
    try {
      if (editingModule) {
        const res = await axiosInstance.put(`/api/v1/modules/${editingModule.moduleId}`, formValues);
        setModules(prev => prev.map(m => m.moduleId === editingModule.moduleId ? res.data : m));
        toast.success("Module updated!");
      } else {
        const res = await axiosInstance.post(`/api/v1/courses/${courseId}/modules`, formValues);
        setModules(prev => [...prev, res.data]);
        toast.success("Module created!");
      }
      setShowCreateForm(false);
      setFormValues({ name: "", description: "" });
      setEditingModule(null);
    } catch (error: any) {
      console.error("Error creating/updating module:", error);
      toast.error(error.response?.data?.detail || "Failed to save module.");
    }
  };

  const handleDelete = async () => {
    if (!confirmId) return;
    setLoading(prev => ({ ...prev, [confirmId]: true }));
    try {
      await axiosInstance.delete(`/api/v1/modules/${confirmId}`);
      setModules(prev => prev.filter(m => m.moduleId !== confirmId));
      toast.success("Module deleted!");
    } catch (error: any) {
      console.error("Error deleting module:", error);
      toast.error(error.response?.data?.detail || "Failed to delete module.");
    } finally {
      setConfirmId(null);
      setLoading(prev => ({ ...prev, [confirmId]: false }));
    }
  };

  return (
    <div className="relative">
      {/* Floating Button */}
      <button
        onClick={() => {
          setEditingModule(null);
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
              {editingModule ? "Edit Module" : "Create Module"}
            </h2>
            <input
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Module Name"
              value={formValues.name}
              onChange={e => setFormValues({ ...formValues, name: e.target.value })}
              required
            />
            <textarea
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Module Description"
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
                {editingModule ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this module? This will also delete all associated content."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {modules.map((module, index) => (
          <div key={module.moduleId} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">M{index + 1}</span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === module.moduleId ? null : module.moduleId)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <FiMoreVertical size={20} />
                </button>
                {activeMenu === module.moduleId && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-20">
                    <button
                      onClick={() => {
                        setEditingModule(module);
                        setFormValues({ name: module.name, description: module.description || "" });
                        setShowCreateForm(true);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setConfirmId(module.moduleId);
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
              <span className="text-sm text-gray-500 dark:text-gray-400">Module #{index + 1}</span>
              <h4 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white max-w-[90%] truncate">
                {module.name}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{new Date(module.createdAt).toLocaleDateString()}</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300 line-clamp-2 max-h-12 overflow-hidden" title={module.description || ''}>
                {module.description || 'No description provided'}
              </p>

              <div className="absolute bottom-5 right-5">
                <Link to={`/courses/${courseId}/modules/${module.moduleId}`} state={{ module, courseId }}>
                  <Badge color="primary" size="sm">
                    View Module
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}