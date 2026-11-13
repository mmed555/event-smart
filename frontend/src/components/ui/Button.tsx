import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'ai'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  v?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  v = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] select-none';

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 font-bold',
  };

  const variants = {
    primary:
      'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 focus:ring-[#2563EB] border border-transparent',
    ai:
      'bg-[#4F46E5] text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20 focus:ring-[#4F46E5] border border-transparent',
    outline:
      'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-soft focus:ring-slate-400',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 focus:ring-slate-300',
    success:
      'bg-[#059669] text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 focus:ring-[#059669]',
    danger:
      'bg-[#DC2626] text-white hover:bg-red-700 shadow-sm shadow-red-500/20 focus:ring-[#DC2626]',
    link:
      'bg-transparent text-[#2563EB] hover:underline p-0 focus:ring-0',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={clsx(
        base,
        sizes[size],
        variants[v],
        isDisabled && 'opacity-50 cursor-not-allowed active:scale-100',
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="size-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};
