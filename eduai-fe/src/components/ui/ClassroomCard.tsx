import React from 'react';
import Card from '@/components/ui/Card';

interface ClassroomCardProps {
  id: string;
  name: string;
  description: string;
  sourceCount: number;
  lastUpdated: string;
  onClick: () => void;
}

const ClassroomCard: React.FC<ClassroomCardProps> = ({ 
  id, 
  name, 
  description, 
  sourceCount, 
  lastUpdated,
  onClick 
}) => {
  return (
    <div 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <Card
        title={name}
        description={description}
        footer={
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-sm">
              <span className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
                {sourceCount} {sourceCount === 1 ? 'source' : 'sources'}
              </span>
              <span className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
                Updated: {lastUpdated}
              </span>
            </div>
            <button className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] text-sm font-medium">
              View Details →
            </button>
          </div>
        }
      />
    </div>
  );
};

export default ClassroomCard;