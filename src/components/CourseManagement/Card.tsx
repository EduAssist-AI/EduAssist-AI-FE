interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, onClick, className = '' }) => {
  return (
    <div 
      className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow ${className}`}
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default Card;