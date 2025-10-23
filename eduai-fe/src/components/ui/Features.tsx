"use client";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-[var(--background)] p-6 rounded-xl border border-[var(--color-neutral-light)] dark:border-[var(--color-neutral-dark)] shadow-sm hover:shadow-md transition-shadow">
      <div className="text-[var(--color-primary)] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{title}</h3>
      <p className="text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)]">
        {description}
      </p>
    </div>
  );
};

interface FeaturesProps {
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--foreground)] mb-4">
          Powerful Features
        </h2>
        <p className="text-center text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] mb-12 max-w-2xl mx-auto">
          Our AI-powered tools help you learn and understand video content more effectively
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;