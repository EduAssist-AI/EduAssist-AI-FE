"use client";

interface CTAProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

const CTA: React.FC<CTAProps> = ({ title, description, buttonLabel, onButtonClick }) => {
  return (
    <div className="py-16 px-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <button 
          onClick={onButtonClick}
          className="px-8 py-3 bg-white text-[var(--color-primary)] rounded-md hover:bg-[var(--color-neutral-light)] transition-colors text-lg font-medium"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default CTA;