import { ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface SectionProps {
  title?: string;
  titleAccent?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export function Section({ title, titleAccent, children, className = '', dark = false }: SectionProps) {
  const ref = useScrollAnimation();
  
  return (
    <section 
      ref={ref.ref} 
      className={`py-20 px-8 ${dark ? 'bg-[#0a0a0a]' : ''} transition-all duration-700 ${
        ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-12">
            {title} {titleAccent && <span className="text-[#fbbf24]">{titleAccent}</span>}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
