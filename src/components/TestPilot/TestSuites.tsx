import { useState } from "react";
import { ArrowUpIcon, GroupIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { FiMoreVertical } from "react-icons/fi";
import ConfirmDeleteModal from "../common/ConfirmDeleteModel";
import { toast } from "react-toastify";


export type TestSuite = {
  _id: string;
  suiteName: string;
  userId: string;
  tool: string;
  createdAt: string;
};

type Props = {
  suites: TestSuite[];
  setSuites: React.Dispatch<React.SetStateAction<TestSuite[]>>;
};

export default function TestSuites({ suites, setSuites }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formValues, setFormValues] = useState({ suiteName: "", tool: "" });
  const [editingSuite, setEditingSuite] = useState<TestSuite | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

const handleCreateOrEdit = async () => {
  try {
    if (editingSuite) {
      const res = await axiosInstance.put(`/test-suites/${editingSuite._id}`, formValues);
      setSuites(prev => prev.map(s => s._id === editingSuite._id ? res.data : s));
      toast.success("Test suite updated!");
    } else {
      const res = await axiosInstance.post("/test-suites", formValues);
      setSuites(prev => [...prev, res.data]);
      toast.success("Test suite created!");
    }
    setShowCreateForm(false);
    setFormValues({ suiteName: "", tool: "" });
    setEditingSuite(null);
  } catch {
    toast.error("Failed to save test suite.");
  }
};

const handleDelete = async () => {
  if (!confirmId) return;
  try {
    await axiosInstance.delete(`/test-suites/${confirmId}`);
    setSuites(prev => prev.filter(s => s._id !== confirmId));
    toast.success("Test suite deleted!");
  } catch {
    toast.error("Failed to delete test suite.");
  } finally {
    setConfirmId(null);
  }
};

  return (
    <div className="relative">
      {/* Floating Button */}
      <button
        onClick={() => {
          setEditingSuite(null);
          setFormValues({ suiteName: "", tool: "" });
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
              {editingSuite ? "Edit Test Suite" : "Create Test Suite"}
            </h2>
            <input
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Suite Name"
              value={formValues.suiteName}
              onChange={e => setFormValues({ ...formValues, suiteName: e.target.value })}
            />
            <input
              className="w-full border px-3 py-2 rounded mb-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
              placeholder="Tool"
              value={formValues.tool}
              onChange={e => setFormValues({ ...formValues, tool: e.target.value })}
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
                {editingSuite ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this test suite?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {suites.map((suite, index) => (
          <div key={suite._id} className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 md:p-6 hover:shadow-lg transition-shadow">
            {/* Top Row */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <GroupIcon className="text-gray-800 dark:text-white size-6" />
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === suite._id ? null : suite._id)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                >
                  <FiMoreVertical size={20} />
                </button>
                {activeMenu === suite._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-20">
                    <button
                      onClick={() => {
                        setEditingSuite(suite);
                        setFormValues({ suiteName: suite.suiteName, tool: suite.tool });
                        setShowCreateForm(true);
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setConfirmId(suite._id);
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
              <span className="text-sm text-gray-500 dark:text-gray-400">Suite #{index + 1}</span>
              <h4 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">
                {suite.suiteName}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{new Date(suite.createdAt).toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Tool: {suite.tool}</p>

              <div className="absolute bottom-5 right-5">
                <Link to={`/test-suites/${suite._id}`} state={{ suite }}>
                  <Badge color="success">
                    <ArrowUpIcon /> Ready
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
