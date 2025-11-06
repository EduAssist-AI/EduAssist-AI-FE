import { useMemo, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";
import ConfirmDeleteModal from "../common/ConfirmDeleteModel";
import { AiOutlineFileText } from "react-icons/ai";
import CodePreviewModal from "../TestPilot/CodePreviewModel"; // adjust path if needed

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

type TestCase = {
  _id: string;
  testCaseName: string;
  suiteId: string;
  IR: string;
  code: string;
  tool: string;
  createdAt: string;
  status: "Ready" | "Running" | "Completed" | "Error";
};

type Props = {
  suiteId: string;
  testCases: TestCase[];
  setTestCases: React.Dispatch<React.SetStateAction<TestCase[]>>;
};

export default function TestCases({ suiteId, testCases, setTestCases }: Props) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [editingCase, setEditingCase] = useState<TestCase | null>(null);
  const [formValues, setFormValues] = useState({
    testCaseName: "",
    IR: "",
    code: "",
    tool: "",
  });
  const [previewCode, setPreviewCode] = useState<{ code: string; lang: string; ir: string; caseId: string } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Ready" | "Completed" | "Running" | "Error">("All");

  const resetForm = () => {
    setEditingCase(null);
    setFormValues({ testCaseName: "", IR: "", code: "", tool: "" });
    setFormOpen(false);
  };

  const getStatus = (tc: TestCase): "Completed" | "Ready" | "Running" | "Error" => {
    if (tc.status === "Error") return "Error";
    if (tc.code && tc.IR) return "Completed";
    if (!tc.code && tc.IR) return "Running";
    return "Ready";
  };

  const handleCreateOrEdit = async () => {
    try {
      if (editingCase) {
        const { _id } = editingCase;
        const res = await axiosInstance.put(`/test-cases/${_id}`, {...formValues,
          suiteId,
        });
        setTestCases(prev => prev.map(tc => (tc._id === _id ? res.data : tc)));
        toast.success("Test case updated!");
      } else {
        const res = await axiosInstance.post("/test-cases", {...formValues,
          suiteId,
        });
        setTestCases(prev => [...prev, res.data]);
        toast.success("Test case created!");
      }
      resetForm();
    } catch {
      toast.error("Failed to save test case");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/test-cases/${id}`);
      setTestCases(prev => prev.filter(tc => tc._id !== id));
      toast.success("Test case deleted!");
    } catch {
      toast.error("Failed to delete test case");
    } finally {
      setConfirmId(null);
    }
  };

  const handleRun = async (tc: TestCase) => {
    try {
      toast.info("Generating code...");
      const updateIndex = testCases.findIndex(t => t._id === tc._id);
      const updatedTestCases = [...testCases];
      updatedTestCases[updateIndex].status = "Running"; // Set status to "Running"
      setTestCases(updatedTestCases);

      const res = await axiosInstance.put(`/code-generator/${tc._id}`, {
        IR: tc.IR,
        tool: tc.tool,
        code: tc.code,
      });

      updatedTestCases[updateIndex].code = res.data.code;
      updatedTestCases[updateIndex].status = res.data.code && tc.IR ? "Completed" : "Ready"; // Set status based on code and IR
      setTestCases(updatedTestCases);
      toast.success("Code generated!");
    } catch {
      const updateIndex = testCases.findIndex(t => t._id === tc._id);
      const updatedTestCases = [...testCases];
      updatedTestCases[updateIndex].status = "Error"; // Set status to "Error"
      setTestCases(updatedTestCases);
      toast.error("Failed to generate code");
    }
  };

  const handleIRRecord = (tc: TestCase) => {
    window.postMessage({
      type: 'FETCH_LATEST_IR'
    }, '*');

    const handleIRResult = async (event: MessageEvent) => {
      if (event.data?.type === 'LATEST_IR_RESPONSE') {
        const IRData = event.data.payload.ir;

        try {
          const updateIndex = testCases.findIndex(t => t._id === tc._id);
          const updatedTestCases = [...testCases];
          updatedTestCases[updateIndex].IR = JSON.stringify(IRData);
          await axiosInstance.put(`/test-cases/${tc._id}`, {
            testCaseName: tc.testCaseName,
            tool: tc.tool,
            code: tc.code,
            IR: JSON.stringify(IRData),
          });
          updatedTestCases[updateIndex].status = updatedTestCases[updateIndex].code && IRData ? "Completed" : "Ready"; // Update status
          setTestCases(updatedTestCases);
          toast.success("IR recording saved.");
        } catch {
          toast.error("Failed to save IR.");
        }

        window.removeEventListener('message', handleIRResult); // Cleanup listener
      }
    };

    window.addEventListener('message', handleIRResult);
  };

  const filteredTestCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchQuery = tc.testCaseName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && getStatus(tc) === "Completed") ||
        (statusFilter === "Running" && getStatus(tc) === "Running") ||
        (statusFilter === "Ready" && getStatus(tc) === "Ready") ||
        (statusFilter === "Error" && getStatus(tc) === "Error");
      return matchQuery && matchStatus;
    });
  }, [searchQuery, statusFilter, testCases]);

  const exportCSV = () => {
    const headers = ["Test Case Name", "Tool", "Created At"];
    const rows = filteredTestCases.map(tc => [tc.testCaseName, tc.tool, new Date(tc.createdAt).toLocaleString()]);
    const csvContent = [headers,...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test-cases.csv";
    a.click();
  };

  return (
    <div className="relative px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Test Cases</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total: {filteredTestCases.length}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Search..."
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Ready">Ready</option>
            <option value="Completed">Completed</option>
            <option value="Running">Running</option>
            <option value="Error">Error</option>
          </select>
          <button
            onClick={exportCSV}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Floating Create Button */}
      <button
        onClick={() => {
          setEditingCase(null);
          setFormOpen(true);
        }}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        +
      </button>

      {/* Create/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              {editingCase ? "Edit Test Case" : "Create Test Case"}
            </h2>
            {["testCaseName", "IR", "code", "tool"].map((field) => (
              <input
                key={field}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-3 text-sm rounded mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                placeholder={field}
                value={(formValues as any)[field]}
                onChange={(e) => setFormValues({...formValues, [field]: e.target.value })}
              />
            ))}
            <div className="flex justify-end gap-4 mt-2">
              <button onClick={resetForm} className="text-gray-600 dark:text-gray-300 hover:underline">Cancel</button>
              <button
                onClick={handleCreateOrEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm"
              >
                {editingCase ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmId && (
        <ConfirmDeleteModal
          message="Are you sure you want to delete this test suite?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/[0.03]">
        <Table className="w-full">
          <TableHeader className="border-y dark:border-gray-700 border-gray-200">
            <TableRow className="h-14 bg-gray-50 dark:bg-gray-800">
              <TableCell className="w-12 text-xs text-center font-medium text-gray-500 dark:text-gray-400">#</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400">Test Case Name</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400">Tool</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400">Created</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400">Code</TableCell>
              <TableCell className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTestCases.map((test, idx) => (
              <TableRow key={test._id} className="h-[70px]">
                <TableCell className="text-sm text-center text-gray-500 dark:text-gray-400">{idx + 1}</TableCell>
                <TableCell className="text-sm text-gray-800 dark:text-white">{test.testCaseName}</TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-300">{test.tool}</TableCell>
                <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(test.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    color={
                      getStatus(test) === "Completed"
                        ? "success"
                        : getStatus(test) === "Running"
                        ? "warning"
                        : getStatus(test) === "Error"
                        ? "warning"
                        : "primary"
                    }
                    size="sm"
                  >
                    {getStatus(test)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {test.code && (
                    <button
                      onClick={() =>
                        setPreviewCode({ code: test.code, lang: test.tool || "text", ir: test.IR || "", caseId: test._id || "" })
                      }
                      title="View Generated Code"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <AiOutlineFileText size={20} />
                    </button>
                  )}
                </TableCell>

                <TableCell className="relative text-center">
                  <button
                    onClick={() => setActiveMenu(activeMenu === test._id ? null : test._id)}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                  >
                    <FiMoreVertical size={18} />
                  </button>
                  {activeMenu === test._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-20">
                      <button
                        onClick={() => {
                          setEditingCase(test);
                          setFormValues({
                            testCaseName: test.testCaseName,
                            IR: test.IR,
                            code: test.code,
                            tool: test.tool,
                          });
                          setFormOpen(true);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmId(test._id);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleIRRecord(test);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        IR Recorder
                      </button>
                      <button
                        onClick={() => {
                          handleRun(test);
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Run
                      </button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {previewCode && (
          <CodePreviewModal
            code={previewCode.code}
            language={previewCode.lang}
            ir={previewCode.ir}
            caseId={previewCode.caseId}
            onClose={() => setPreviewCode(null)}
          />
        )}
      </div>
    </div>
  );
}