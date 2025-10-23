import React from 'react';

interface NotesViewProps {
  classroomName: string;
}

const NotesView: React.FC<NotesViewProps> = ({ classroomName }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Summary Notes</h2>
      <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-6">
        Access AI-generated summaries for each video in this classroom.
      </p>
      <div className="bg-[var(--background)] rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] p-4">
        <p className="text-center py-10 text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-6">
          Summary notes for {classroomName} will appear here.
        </p>
        <div className="space-y-4">
          <div className="p-4 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded">
            <h3 className="font-medium mb-2">Introduction to Programming</h3>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-3">Key topics: variables, data types, control structures</p>
            <div className="text-sm">
              <p className="mb-2"><span className="font-medium">Variables:</span> Named storage locations for data</p>
              <p className="mb-2"><span className="font-medium">Data Types:</span> Specify what kind of value a variable can hold</p>
              <p><span className="font-medium">Control Structures:</span> Determine the flow of execution in a program</p>
            </div>
            <button className="mt-3 px-3 py-1 bg-[var(--color-primary)] text-white rounded-md text-sm hover:bg-[var(--color-secondary)]">
              View Full Notes
            </button>
          </div>
          <div className="p-4 border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] rounded">
            <h3 className="font-medium mb-2">Data Structures</h3>
            <p className="text-sm text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-3">Key topics: arrays, linked lists, trees</p>
            <div className="text-sm">
              <p className="mb-2"><span className="font-medium">Arrays:</span> Collections of elements stored at contiguous memory locations</p>
              <p className="mb-2"><span className="font-medium">Linked Lists:</span> Linear collections of elements connected via pointers</p>
              <p><span className="font-medium">Trees:</span> Hierarchical data structures with parent-child relationships</p>
            </div>
            <button className="mt-3 px-3 py-1 bg-[var(--color-primary)] text-white rounded-md text-sm hover:bg-[var(--color-secondary)]">
              View Full Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesView;