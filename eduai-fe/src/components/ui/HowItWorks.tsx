"use client";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold mr-4">
        {step}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{title}</h3>
        <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
          {description}
        </p>
      </div>
    </div>
  );
};

interface HowItWorksProps {
  steps: {
    title: string;
    description: string;
  }[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({ steps }) => {
  return (
    <div className="py-16 px-4 bg-[var(--color-neutral-light)] dark:bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-4">
          How It Works
        </h2>
        <p className="text-center text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-12 max-w-2xl mx-auto">
          Transform your video learning experience with our simple 3-step process
        </p>
        
        <div className="max-w-3xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;