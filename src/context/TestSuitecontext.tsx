import { createContext, useContext } from "react";

interface TestSuiteContextType {
  suiteId: string;
  suiteName: string;
}

export const TestSuiteContext = createContext<TestSuiteContextType | null>(null);

export const useTestSuite = () => {
  const context = useContext(TestSuiteContext);
  if (!context) {
    throw new Error("useTestSuite must be used within a TestSuiteProvider");
  }
  return context;
};
