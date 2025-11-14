import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  ir: string;
  caseId: string;
  onClose: () => void;
  language?: string;
};

export default function CodePreviewModal({
  code,
  ir,
  caseId,
  onClose,
  language = "javascript",
}: Props) {
  const [prompt, setPrompt] = useState("");

  const handlePromptSubmit = async () => {
    try {
      await axiosInstance.put(`/code-generator/${caseId}`, {
        IR: ir,
        tool: language,
        code: code,
      });

      toast.success("Prompt submitted successfully!");
      onClose();
    } catch {
      toast.error("Failed to submit prompt.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90%] overflow-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Generated Code
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div className="rounded border border-gray-300 dark:border-gray-700 overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ fontSize: "0.9rem", padding: "1rem" }}
            wrapLines
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <div className="mt-4">
          <textarea
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            rows={4}
            placeholder="Suggest changes or provide prompt for improved code generation..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handlePromptSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm"
          >
            Submit Prompt
          </button>
        </div>
      </div>
    </div>
  );
}
