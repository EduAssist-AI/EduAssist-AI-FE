// components/metrics/TestSuites.tsx
import { ArrowUpIcon, GroupIcon } from "../../icons";
import Badge from "../ui/badge/Badge";

type TestSuite = {
  _id: string;
  suiteName: string;
  userId: string;
  tool: string;
  createdAt: string;
};

type Props = {
  suites: TestSuite[];
};

export default function TestSuites({ suites }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {suites.map((suite, index) => (
        <div
          key={suite._id}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Suite #{index + 1}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {suite.suiteName}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(suite.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tool: {suite.tool}
              </p>
            </div>

            <Badge color="success">
              <ArrowUpIcon />
              Ready
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
