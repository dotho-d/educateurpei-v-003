import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: ReactNode;
  description?: ReactNode;
  className?: string;
  descriptionClassName?: string;
  alignCenter?: boolean;
}

export default function SectionTitle({
  children,
  description,
  className,
  descriptionClassName,
  alignCenter = true,
}: SectionTitleProps) {
  return (
    <div className={cn(
      'mb-10',
      alignCenter && 'text-center',
      className
    )}>
      <h2 className="heading-2 mb-4">{children}</h2>
      {description && (
        <p className={cn(
          'body-text text-muted-foreground max-w-2xl',
          alignCenter && 'mx-auto',
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
}