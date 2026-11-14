import React from 'react';
import clsx from 'clsx';

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
    rectangular: 'rounded-2xl',
    badge: 'h-6 w-16 rounded-lg',
    button: 'h-10 w-28 rounded-xl',
  }[variant];

  const toneClasses = {
    light:
      'bg-slate-200/75 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
    dark:
      'bg-slate-800/80 before:bg-gradient-to-r before:from-transparent before:via-slate-700/40 before:to-transparent',
    glass:
      'bg-white/10 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent backdrop-blur-sm',
  }[tone];

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer pointer-events-none select-none',
        variantClasses,
        toneClasses,
        className
      )}
      {...props}
    />
  );
};

/**
 * Compound Skeleton: EventCardSkeleton
 * Matches EventCard geometry 1:1 preventing Cumulative Layout Shift (CLS)
 */
export const EventCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft pointer-events-none select-none',
        className
      )}
    >
      {/* 16:10 Thumbnail Image Placeholder */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Top Floating Badges */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Skeleton variant="badge" className="w-16 h-6 rounded-lg bg-slate-300/80" />
            <Skeleton variant="badge" className="w-20 h-6 rounded-lg bg-slate-300/80" />
          </div>
          <Skeleton variant="circular" className="size-8 rounded-full bg-slate-300/80" />
        </div>
      </div>

      {/* Card Content Placeholder */}
      <div className="flex flex-1 flex-col p-5 space-y-3">
        {/* Date Row */}
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="size-3.5 rounded-full" />
          <Skeleton variant="text" className="w-28 h-3.5" />
        </div>

        {/* Title Lines */}
        <div className="space-y-1.5 pt-1">
          <Skeleton variant="text" className="w-4/5 h-4.5 rounded-md" />
          <Skeleton variant="text" className="w-3/5 h-4 rounded-md opacity-70" />
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton variant="circular" className="size-3.5 rounded-full" />
          <Skeleton variant="text" className="w-44 h-3.5" />
        </div>

        {/* Price & Seats Footer */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <Skeleton variant="text" className="w-20 h-5 rounded-md" />
          <Skeleton variant="badge" className="w-16 h-5 rounded-md" />
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: EventDetailsSkeleton
 * Matches EventDetailsView header, content, and sidebar tiers 1:1
 */
export const EventDetailsSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 space-y-8 select-none">
      {/* Top Breadcrumb & Actions Row */}
      <div className="flex items-center justify-between">
        <Skeleton variant="text" className="w-36 h-4" />
        <div className="flex items-center gap-2">
          <Skeleton variant="button" className="w-10 h-10 rounded-xl" />
          <Skeleton variant="button" className="w-10 h-10 rounded-xl" />
        </div>
      </div>

      {/* Hero Panoramic Banner */}
      <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Main Grid: Details Left, Ticket Tiers Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton variant="badge" className="w-24 h-6" />
              <Skeleton variant="badge" className="w-20 h-6" />
            </div>
            <Skeleton variant="text" className="w-3/4 h-8 rounded-lg" />
            <div className="flex flex-wrap gap-4 pt-2">
              <Skeleton variant="text" className="w-32 h-4" />
              <Skeleton variant="text" className="w-40 h-4" />
              <Skeleton variant="text" className="w-28 h-4" />
            </div>
          </div>

          {/* Description Paragraphs */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-soft">
            <Skeleton variant="text" className="w-32 h-5 mb-2" />
            <Skeleton variant="text" className="w-full h-4" />
            <Skeleton variant="text" className="w-full h-4" />
            <Skeleton variant="text" className="w-4/5 h-4" />
            <Skeleton variant="text" className="w-2/3 h-4" />
          </div>

          {/* Speakers Row */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-soft">
            <Skeleton variant="text" className="w-28 h-5 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-2">
                  <Skeleton variant="circular" className="size-16 rounded-full" />
                  <Skeleton variant="text" className="w-20 h-3.5" />
                  <Skeleton variant="text" className="w-14 h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Sidebar Tiers) */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card space-y-5">
            <Skeleton variant="text" className="w-28 h-5" />

            {/* 3 Tier Cards */}
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton variant="text" className="w-24 h-4" />
                    <Skeleton variant="text" className="w-16 h-4" />
                  </div>
                  <Skeleton variant="text" className="w-32 h-3 opacity-60" />
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex justify-between items-center pt-2">
              <Skeleton variant="text" className="w-20 h-4" />
              <Skeleton variant="button" className="w-28 h-9" />
            </div>

            {/* Checkout Button */}
            <Skeleton variant="button" className="w-full h-12 rounded-2xl bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: TicketCardSkeleton
 * Matches TicketsWalletView digital QR pass card
 */
export const TicketCardSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-48 h-7 rounded-lg" />
          <Skeleton variant="text" className="w-64 h-3.5 opacity-70" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="badge" className="w-24 h-8" />
          <Skeleton variant="badge" className="w-24 h-8" />
        </div>
      </div>

      {/* Ticket Pass Hero Card */}
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-card overflow-hidden">
        {/* Pass Header */}
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="space-y-1.5">
            <Skeleton variant="badge" tone="dark" className="w-20 h-5" />
            <Skeleton variant="text" tone="dark" className="w-48 h-5" />
          </div>
          <Skeleton variant="badge" tone="dark" className="w-16 h-6 rounded-full" />
        </div>

        {/* QR Section */}
        <div className="p-8 flex flex-col items-center justify-center space-y-4 bg-slate-50 border-b border-dashed border-slate-200">
          <Skeleton className="size-48 rounded-2xl" />
          <Skeleton variant="text" className="w-40 h-3 opacity-60" />
        </div>

        {/* Pass Details */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton variant="text" className="w-16 h-3 opacity-60" />
              <Skeleton variant="text" className="w-24 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: ChatMessageSkeleton
 * Matches AIAssistantView conversational bubbles during query synthesis
 */
export const ChatMessageSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="flex items-start gap-3 select-none">
      <Skeleton variant="circular" className="size-9 rounded-2xl bg-indigo-200/80 shrink-0" />
      <div className="space-y-3 w-full max-w-lg">
        <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 space-y-2 shadow-soft">
          <Skeleton variant="text" className="w-3/4 h-3.5" />
          <Skeleton variant="text" className="w-full h-3.5" />
          <Skeleton variant="text" className="w-2/3 h-3.5" />
        </div>

        {/* Extracted Slots Badges Placeholder */}
        <div className="flex gap-2">
          <Skeleton variant="badge" className="w-24 h-6" />
          <Skeleton variant="badge" className="w-20 h-6" />
        </div>
      </div>
    </div>
  );
};
