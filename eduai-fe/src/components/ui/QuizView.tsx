import React from 'react';

interface QuizViewProps {
  classroomName: string;
}

const QuizView: React.FC<QuizViewProps> = ({ classroomName }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Generator</h2>
      <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-6">
        Access AI-generated quizzes for each video in this classroom.
      </p>
      <div className="bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] p-4">
        <p className="text-center py-10 text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
          Quiz content for {classroomName} will appear here.
        </p>
        <div className="mt-4 space-y-4">
          <div className="p-4 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded">
            <h3 className="font-medium mb-2">Sample Quiz: Introduction to Programming</h3>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">5 questions • 10 min</p>
            <button className="mt-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm hover:bg-[var(--color-secondary)]">
              Start Quiz
            </button>
          </div>
          <div className="p-4 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded">
            <h3 className="font-medium mb-2">Sample Quiz: Data Structures</h3>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">7 questions • 15 min</p>
            <button className="mt-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm hover:bg-[var(--color-secondary)]">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizView;