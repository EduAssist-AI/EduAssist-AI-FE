import { useParams } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';
import SummaryList from '../../components/SummaryManagement/SummaryList';

export default function SummaryManagementPage() {
  const params = useParams<{ courseId: string; moduleId: string }>();
  const courseId = params.courseId!;
  const moduleId = params.moduleId!;

  return (
    <>
      <PageMeta
        title="EduAssist-AI | Summary Management"
        description="Manage summaries for your module"
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="heading-xl">Summary Management</h1>
          <p className="body-md mt-1 text-gray-600 dark:text-gray-300">
            Create, edit, and manage summaries for resources in this module
          </p>
        </div>

        <SummaryList moduleId={moduleId} courseId={courseId} />
      </div>
    </>
  );
}