// components/common/Breadcrumbs.tsx
import { Link, useLocation } from "react-router-dom";
import { useTestSuite } from "../../context/TestSuitecontext";

export default function Breadcrumbs() {
  const location = useLocation();

  // only try to use context if we are in test-suite routes
  let suiteName = "";
  try {
    const ctx = useTestSuite();
    suiteName = ctx.suiteName;
  } catch (_) {}

  if (location.pathname === "/") return null;

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link to="/" className="hover:underline">Home</Link>
      {suiteName && (
        <>
          {" / "}
          <span className="capitalize text-gray-700 font-medium">{suiteName}</span>
        </>
      )}
    </nav>
  );
}
