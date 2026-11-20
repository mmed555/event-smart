import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'badge' | 'button';
  tone?: 'light' | 'dark' | 'glass';
}

/**
 * Base Skeleton component with high-end shimmer wave animation
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  tone = 'light',
  ...props
}) => {
  const variantClasses = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-xl',
    badge: 'h-6 w-16 rounded-lg',
    button: 'h-9 w-24 rounded-xl',
  }[variant];

  const toneClasses = {
    light:
      'bg-slate-200/80 before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent',
    dark:
      'bg-slate-800/80 before:bg-gradient-to-r before:from-transparent before:via-slate-700/50 before:to-transparent',
    glass:
      'bg-white/10 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent backdrop-blur-sm',
  }[tone];

  return (
    <div
      aria-hidden="true"
      className={twMerge(
        clsx(
          'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer pointer-events-none select-none',
          variantClasses,
          toneClasses,
          className
        )
      )}
      {...props}
    />
  );
};
