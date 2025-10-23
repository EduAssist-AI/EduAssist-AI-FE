"use client";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  onCtaClick 
}) => {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-6">
        {title}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-6">
        {subtitle}
      </h2>
      <p className="text-lg text-[var(--color-neutral-dark)] dark:text-[var(--color-neutral-light)] max-w-2xl mx-auto mb-10">
        {description}
      </p>
      <button 
        onClick={onCtaClick}
        className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-secondary)] transition-colors text-lg font-medium"
      >
        {ctaText}
      </button>
    </div>
  );
};

export default Hero;