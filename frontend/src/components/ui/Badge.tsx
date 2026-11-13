import React from 'react';
import clsx from 'clsx';

export type BadgeTone = 'gray' | 'blue' | 'ai' | 'green' | 'amber' | 'red' | 'dark';

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  tone = 'gray',
  children,
  dot = false,
  className,
}) => {
  const tones = {
    gray: 'bg-slate-100 text-slate-700 border-slate-200/80',
    blue: 'bg-blue-50 text-[#2563EB] border-blue-200/70',
    ai: 'bg-[#EEF2FF] text-[#4F46E5] border-indigo-200/70 font-semibold',
    green: 'bg-[#DCFCE7] text-[#047857] border-emerald-200/70',
    amber: 'bg-[#FEF3C7] text-[#B45309] border-amber-200/70',
    red: 'bg-[#FEE2E2] text-[#B91C1C] border-red-200/70',
    dark: 'bg-[#0F172A] text-white border-transparent',
  };

  const dotTones = {
    gray: 'bg-slate-400',
    blue: 'bg-[#2563EB]',
    ai: 'bg-[#4F46E5]',
    green: 'bg-[#10B981]',
    amber: 'bg-[#F59E0B]',
    red: 'bg-[#EF4444]',
    dark: 'bg-white',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border select-none',
        tones[tone],
        className
      )}
    >
      {dot && <span className={clsx('size-1.5 rounded-full shrink-0', dotTones[tone])} />}
      {children}
    </span>
  );
};
