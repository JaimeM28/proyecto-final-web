import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />;
};

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className={cn('leading-none tracking-tight', className)} {...props} />;
};

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn('text-sm text-muted-foreground', className)} {...props} />;
};

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
};

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />;
};
