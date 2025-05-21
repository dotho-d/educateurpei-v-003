import { ReactNode, forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: 'primary' | 'secondary' | 'none';
  containerSize?: 'sm' | 'md' | 'lg';
  withPadding?: boolean;
}

const containerSizes = {
  sm: 'max-w-[90%] sm:max-w-[86%] md:max-w-[82%]',
  md: 'max-w-[90%] sm:max-w-[90%] md:max-w-[86%] lg:max-w-[82%] xl:max-w-[76%]',
  lg: 'max-w-[90%] sm:max-w-[92%] md:max-w-[90%] lg:max-w-[86%] xl:max-w-[80%]',
};

const backgrounds = {
  primary: 'section-bg-1',
  secondary: 'section-bg-2',
  none: '',
};

const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  className,
  children,
  background = 'none',
  containerSize = 'md',
  withPadding = true,
}, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        backgrounds[background],
        withPadding && 'py-12 md:py-16 lg:py-20',
        className
      )}
    >
      <div
        className={cn(
          'mx-auto px-4',
          containerSizes[containerSize]
        )}
      >
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;