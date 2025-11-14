import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { TestSuiteContext } from "../context/TestSuitecontext";
import TestCases from "../components/TestPilot/TestCases";

type TestSuite = {
  _id: string;
  suiteName: string;
  userId: string;
  tool: string;
  createdAt: string;
};

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

export default function TestSuiteDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [suite, setSuite] = useState<TestSuite | null>(location.state?.suite || null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuite = async () => {
      try {
        const res = await axios.get(`/test-suites/${id}`);
        setSuite(res.data);
      } catch (err) {
        alert("Failed to load suite. Redirecting to Home.");
        navigate("/home");
      }
    };

    if (!suite && id) {
      fetchSuite();
    }
  }, [suite, id, navigate]);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const res = await axios.get(`/test-cases/${id}`);
        setTestCases(res.data);
      } catch (err) {
        alert("Failed to fetch test cases.");
      } finally {
        setLoading(false);
      }
    };

    if (suite?._id) {
      fetchTestCases();
    }
  }, [suite?._id, id]);

  if (!suite) return null;

  return (
    <TestSuiteContext.Provider value={{ suiteId: suite._id, suiteName: suite.suiteName }}>
      <Breadcrumbs />
      {loading ? (
        <p className="text-gray-500 p-4 dark:text-gray-400">Loading Test Cases...</p>
      ) : (
        <TestCases suiteId={suite._id} testCases={testCases} setTestCases={setTestCases} />
      )}
    </TestSuiteContext.Provider>
  );
}
