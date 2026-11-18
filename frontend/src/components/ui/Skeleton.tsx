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
 * Compound Skeleton: TicketsWalletSkeleton
 * Matches TicketsWalletView header tabs and list of bookings 1:1
 */
export const TicketsWalletSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-6 select-none">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-2 border-b border-slate-200">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-56 sm:w-72 h-8 rounded-lg" />
          <Skeleton variant="text" className="w-72 sm:w-96 h-4 rounded-md opacity-70" />
        </div>

        {/* Filter Tabs Pill */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
          <Skeleton variant="button" className="w-16 h-8 rounded-xl" />
          <Skeleton variant="button" className="w-16 h-8 rounded-xl" />
          <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
        </div>
      </div>

      {/* Bookings List Cards (2 cards for realistic loading feel) */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-4"
          >
            {/* Booking Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <Skeleton variant="rectangular" className="size-16 sm:size-20 rounded-xl shrink-0" />
                <div className="space-y-2 min-w-0">
                  <Skeleton variant="text" className="w-48 sm:w-72 h-5 rounded-md" />
                  <div className="flex items-center gap-2">
                    <Skeleton variant="text" className="w-24 h-3.5 rounded" />
                    <Skeleton variant="text" className="w-16 h-3.5 rounded" />
                    <Skeleton variant="text" className="w-20 h-3.5 rounded" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <Skeleton variant="text" className="w-20 h-5 rounded-md" />
                <Skeleton variant="badge" className="w-20 h-6 rounded-full" />
                <Skeleton variant="circular" className="size-8 rounded-lg" />
              </div>
            </div>

            {/* Inner Ticket Item Placeholder */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-slate-50/70 p-3 sm:p-3.5 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
                  <div className="space-y-1">
                    <Skeleton variant="text" className="w-28 h-4 rounded" />
                    <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton variant="button" className="w-28 h-8 rounded-lg" />
                  <Skeleton variant="button" className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TicketCardSkeleton = TicketsWalletSkeleton;

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

/**
 * Compound Skeleton: LandingHeroSkeleton
 * Matches LandingView hero banner, search bar, and summit visual 1:1
 */
export const LandingHeroSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden="true"
      className="relative z-20 bg-slate-950 pb-20 pt-16 lg:pb-28 lg:pt-24 select-none"
    >
      {/* Background Atmosphere Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center space-y-6">
          {/* AI Pill Skeleton */}
          <Skeleton variant="badge" className="w-64 h-7 rounded-full bg-slate-800 border border-slate-700/50" />

          {/* Headline Skeletons */}
          <div className="space-y-3 w-full flex flex-col items-center">
            <Skeleton variant="text" className="w-4/5 max-w-2xl h-11 sm:h-14 rounded-2xl bg-slate-800" />
            <Skeleton variant="text" className="w-1/2 max-w-md h-11 sm:h-14 rounded-2xl bg-slate-800" />
          </div>

          {/* Subtitle Skeletons */}
          <div className="space-y-2 w-full flex flex-col items-center max-w-xl">
            <Skeleton variant="text" className="w-full h-4 sm:h-5 rounded-md bg-slate-800/80" />
            <Skeleton variant="text" className="w-4/5 h-4 sm:h-5 rounded-md bg-slate-800/80" />
          </div>

          {/* Interactive Search Bar Skeleton Capsule */}
          <div className="mt-4 flex w-full max-w-3xl flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-white/20 bg-white p-3 shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Skeleton variant="circular" className="size-4 rounded-full" />
              <Skeleton variant="text" className="w-48 h-4 rounded-md" />
            </div>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2 px-3">
              <Skeleton variant="circular" className="size-4 rounded-full" />
              <Skeleton variant="text" className="w-20 h-4 rounded-md" />
            </div>
            <div className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="flex items-center gap-2 px-3">
              <Skeleton variant="circular" className="size-4 rounded-full" />
              <Skeleton variant="text" className="w-20 h-4 rounded-md" />
            </div>
            <Skeleton variant="button" className="w-24 h-10 rounded-xl bg-blue-500/80 shrink-0" />
          </div>

          {/* Trending Quick Tags Skeleton */}
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
            <Skeleton variant="text" className="w-16 h-4 bg-slate-800" />
            <Skeleton variant="badge" className="w-24 h-7 rounded-full bg-slate-800/90 border border-slate-700/60" />
            <Skeleton variant="badge" className="w-20 h-7 rounded-full bg-slate-800/90 border border-slate-700/60" />
            <Skeleton variant="badge" className="w-20 h-7 rounded-full bg-slate-800/90 border border-slate-700/60" />
            <Skeleton variant="badge" className="w-20 h-7 rounded-full bg-slate-800/90 border border-slate-700/60" />
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Compound Skeleton: LandingCategoriesSkeleton
 * Matches LandingView categories grid 1:1
 */
export const LandingCategoriesSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 select-none">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-5 space-y-3">
          <Skeleton variant="circular" className="size-11 rounded-xl" />
          <Skeleton variant="text" className="w-24 h-4 rounded-md" />
          <Skeleton variant="text" className="w-14 h-3 rounded-md opacity-60" />
        </div>
      ))}
    </div>
  );
};

/**
 * Compound Skeleton: LandingViewFullSkeleton
 * Complete full-page skeleton for LandingView from hero to footer call to action
 */
export const LandingViewFullSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="bg-[#F8FAFC] select-none">
      {/* 1. Hero Skeleton */}
      <LandingHeroSkeleton />

      {/* 2. Featured Events Skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <Skeleton variant="badge" className="w-28 h-5" />
              <Skeleton variant="text" className="w-72 sm:w-96 h-8 rounded-lg" />
            </div>
            <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <EventCardSkeleton key={n} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Categories Skeleton */}
      <section className="py-16 bg-white border-y border-slate-200/70">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Skeleton variant="text" className="w-48 h-8 mx-auto rounded-lg" />
            <Skeleton variant="text" className="w-72 h-4 mx-auto opacity-70" />
          </div>
          <LandingCategoriesSkeleton />
        </div>
      </section>

      {/* 4. Metrics Banner Skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#0F172A] p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton tone="dark" variant="text" className="w-28 sm:w-36 h-9 sm:h-10 rounded-lg" />
                  <Skeleton tone="dark" variant="text" className="w-32 sm:w-40 h-4 rounded-md opacity-70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Skeleton */}
      <section className="py-16 bg-white border-b border-slate-200/70">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Skeleton variant="text" className="w-64 h-8 mx-auto rounded-lg" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-4">
                <div className="space-y-2">
                  <Skeleton variant="text" className="w-full h-3.5" />
                  <Skeleton variant="text" className="w-full h-3.5" />
                  <Skeleton variant="text" className="w-4/5 h-3.5" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton variant="circular" className="size-9 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton variant="text" className="w-24 h-3.5" />
                    <Skeleton variant="text" className="w-32 h-2.5 opacity-60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Skeleton */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-blue-50/50">
        <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8 space-y-4">
          <Skeleton variant="text" className="w-72 sm:w-96 h-9 sm:h-10 mx-auto rounded-xl" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton variant="text" className="w-full h-4 rounded-md" />
            <Skeleton variant="text" className="w-4/5 h-4 mx-auto rounded-md" />
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton variant="button" className="w-40 h-12 rounded-2xl bg-blue-200" />
            <Skeleton variant="button" className="w-48 h-12 rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * Compound Skeleton: AuthViewSkeleton
 * Matches split-screen AuthView (form side + dark visual hero side) 1:1
 */
export const AuthViewSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="h-full min-h-0 flex flex-col lg:flex-row overflow-hidden select-none bg-white">
      {/* Left Column: Form Side Skeleton */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-8 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Top Segmented Tab Pill */}
          <div className="mx-auto w-64 h-11 p-1 rounded-full bg-slate-100 flex items-center justify-between">
            <Skeleton variant="button" className="w-1/2 h-full rounded-full" />
            <Skeleton variant="button" className="w-1/2 h-full rounded-full bg-transparent" />
          </div>

          {/* Heading */}
          <div className="text-center space-y-2 pt-2">
            <Skeleton variant="text" className="w-44 h-8 mx-auto rounded-lg" />
            <Skeleton variant="text" className="w-36 h-3.5 mx-auto opacity-70" />
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Skeleton variant="text" className="w-24 h-3.5" />
              <Skeleton variant="rectangular" className="w-full h-12 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Skeleton variant="text" className="w-20 h-3.5" />
                <Skeleton variant="text" className="w-24 h-3 opacity-60" />
              </div>
              <Skeleton variant="rectangular" className="w-full h-12 rounded-xl" />
            </div>
          </div>

          {/* Sign In Button */}
          <Skeleton variant="button" className="w-full h-12 rounded-xl bg-blue-200" />

          {/* Divider */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-px bg-slate-200" />
            <Skeleton variant="text" className="w-28 h-3 opacity-50" />
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton variant="button" className="w-full h-11 rounded-xl" />
            <Skeleton variant="button" className="w-full h-11 rounded-xl" />
          </div>

          {/* Demo Fill Pills */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Skeleton variant="text" className="w-16 h-3 opacity-50" />
            <Skeleton variant="badge" className="w-16 h-6 rounded-lg" />
            <Skeleton variant="badge" className="w-16 h-6 rounded-lg" />
            <Skeleton variant="badge" className="w-16 h-6 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Right Column: Visual Dark Atmosphere Side Skeleton */}
      <div className="hidden lg:flex flex-1 relative bg-[#0B0F19] p-12 flex-col justify-between overflow-hidden">
        {/* Top Branding Pill Skeleton */}
        <div className="relative z-10">
          <Skeleton tone="dark" variant="badge" className="w-28 h-9 rounded-2xl" />
        </div>

        {/* Center Content Skeleton */}
        <div className="relative z-10 max-w-lg space-y-8 my-auto">
          <div className="space-y-3">
            <Skeleton tone="dark" variant="text" className="w-4/5 h-9 rounded-xl" />
            <Skeleton tone="dark" variant="text" className="w-full h-9 rounded-xl" />
          </div>
          <Skeleton tone="dark" variant="text" className="w-3/4 h-4 rounded-md opacity-70" />

          {/* 3 Feature Rows */}
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <Skeleton tone="glass" variant="circular" className="size-10 rounded-xl shrink-0" />
                <Skeleton tone="glass" variant="text" className="w-3/4 h-4" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Testimonial Card Skeleton */}
        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md space-y-2">
          <Skeleton tone="glass" variant="text" className="w-full h-3.5" />
          <Skeleton tone="glass" variant="text" className="w-2/3 h-3.5" />
          <div className="pt-2 flex items-center gap-2">
            <Skeleton tone="glass" variant="circular" className="size-6 rounded-full" />
            <Skeleton tone="glass" variant="text" className="w-28 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: AIAssistantFullSkeleton
 * Matches full AIAssistantView (header, quick prompts, chat thread, input) 1:1
 */
export const AIAssistantFullSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" className="size-7 rounded-lg" />
            <Skeleton variant="text" className="w-52 h-7 rounded-lg" />
          </div>
          <Skeleton variant="text" className="w-80 h-3.5 opacity-70" />
        </div>
        <Skeleton variant="badge" className="w-28 h-8 rounded-full" />
      </div>

      {/* Quick Prompts Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Skeleton variant="badge" className="w-48 h-8 rounded-full shrink-0" />
        <Skeleton variant="badge" className="w-56 h-8 rounded-full shrink-0" />
        <Skeleton variant="badge" className="w-44 h-8 rounded-full shrink-0" />
        <Skeleton variant="badge" className="w-40 h-8 rounded-full shrink-0" />
      </div>

      {/* Conversational Stream */}
      <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-6 min-h-[420px]">
        {/* Welcome Bot Message */}
        <div className="flex items-start gap-3">
          <Skeleton variant="circular" className="size-9 rounded-2xl bg-indigo-200 shrink-0" />
          <div className="space-y-3 w-full max-w-xl">
            <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 space-y-2 shadow-soft">
              <Skeleton variant="text" className="w-full h-4" />
              <Skeleton variant="text" className="w-4/5 h-4" />
            </div>

            {/* Extracted Slots Badges */}
            <div className="flex items-center gap-2">
              <Skeleton variant="badge" className="w-28 h-6 rounded-md" />
              <Skeleton variant="badge" className="w-24 h-6 rounded-md" />
            </div>

            {/* Suggested Event Cards 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Area Skeleton */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-lg flex items-center justify-between">
        <Skeleton variant="text" className="w-80 h-5 ms-3" />
        <Skeleton variant="button" className="w-24 h-10 rounded-xl bg-blue-200" />
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: SearchHeaderSkeleton
 * Matches SearchDiscoveryView top title, subtitle, favorites and sort dropdown
 */
export const SearchHeaderSkeleton: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 select-none"
    >
      <div className="space-y-1.5">
        <Skeleton variant="text" className="w-44 h-7 rounded-lg" />
        <Skeleton variant="text" className="w-56 h-3.5 opacity-70" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton variant="button" className="w-28 h-9 rounded-xl" />
        <Skeleton variant="button" className="w-48 h-9 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: SearchFilterSidebarSkeleton
 * Matches SearchDiscoveryView sidebar filters (search, categories, city, price)
 */
export const SearchFilterSidebarSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="w-64 shrink-0 space-y-6 select-none">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-6 shadow-soft">
        {/* Filter Title & Reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" className="size-4 rounded-full" />
            <Skeleton variant="text" className="w-24 h-4 rounded-md" />
          </div>
          <Skeleton variant="text" className="w-16 h-3 rounded-md opacity-60" />
        </div>

        {/* Search Input Box */}
        <div className="space-y-1.5">
          <Skeleton variant="text" className="w-14 h-3 opacity-70" />
          <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          <Skeleton variant="text" className="w-16 h-3.5 font-bold" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" className="size-3 rounded-full" />
                  <Skeleton variant="text" className="w-28 h-3.5 rounded-md" />
                </div>
                <Skeleton variant="badge" className="w-6 h-4 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* City Filter */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <Skeleton variant="text" className="w-12 h-3.5" />
          <Skeleton variant="rectangular" className="w-full h-9 rounded-xl" />
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <Skeleton variant="text" className="w-20 h-3.5" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton variant="circular" className="size-4 rounded-full" />
                <Skeleton variant="text" className="w-24 h-3 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: TopNavSkeleton
 * Matches TopNav desktop/mobile layout 1:1 with zero Cumulative Layout Shift
 */
export const TopNavSkeleton: React.FC = () => {
  return (
    <nav aria-hidden="true" className="relative z-30 border-b border-slate-200/80 bg-white shadow-soft select-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 py-2 sm:py-2.5">
        {/* Left / Start: Brand Logo & Main Nav */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="flex items-center gap-2">
            <Skeleton variant="rectangular" className="size-8 rounded-lg shrink-0" />
            <div>
              <div className="flex items-center gap-1">
                <Skeleton variant="text" className="w-12 h-3.5 rounded" />
                <Skeleton variant="badge" className="w-6 h-3.5 rounded-full" />
              </div>
              <Skeleton variant="text" className="w-24 h-2 rounded mt-1 hidden sm:block opacity-60" />
            </div>
          </div>

          {/* Divider between Brand and Nav Links */}
          <div className="h-5 w-px bg-slate-200 hidden lg:block shrink-0" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <Skeleton variant="button" className="w-18 h-9 rounded-lg" />
            <Skeleton variant="button" className="w-28 h-9 rounded-lg" />
            <Skeleton variant="button" className="w-24 h-9 rounded-lg" />
          </div>
        </div>

        {/* Center: Search Input */}
        <div className="hidden lg:block relative flex-1 max-w-sm xl:max-w-md mx-3 lg:mx-6">
          <Skeleton variant="rectangular" className="w-full h-9 rounded-lg" />
        </div>

        {/* Right / End: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Skeleton variant="button" className="w-20 h-9 rounded-lg" />
          <Skeleton variant="circular" className="size-9 rounded-lg" />
          <Skeleton variant="circular" className="size-9 rounded-lg" />
          <div className="flex items-center gap-2 h-9 px-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70">
            <Skeleton variant="circular" className="size-6 rounded-full" />
            <Skeleton variant="text" className="w-16 h-3 rounded hidden sm:block" />
          </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Compound Skeleton: FooterSkeleton
 * Matches Footer grid columns & bottom copyright bar 1:1
 */
export const FooterSkeleton: React.FC = () => {
  return (
    <footer aria-hidden="true" className="border-t border-slate-200 bg-white select-none">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <Skeleton variant="circular" className="size-9 rounded-xl bg-blue-300" />
              <Skeleton variant="text" className="w-36 h-6 rounded-md" />
            </div>
            <div className="space-y-2 max-w-sm pt-1">
              <Skeleton variant="text" className="w-full h-3.5" />
              <Skeleton variant="text" className="w-full h-3.5" />
              <Skeleton variant="text" className="w-4/5 h-3.5" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Skeleton variant="badge" className="w-32 h-4" />
              <Skeleton variant="badge" className="w-36 h-4" />
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-3">
            <Skeleton variant="text" className="w-20 h-4 mb-3 font-bold" />
            <div className="space-y-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} variant="text" className="w-24 h-3" />
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <Skeleton variant="text" className="w-20 h-4 mb-3 font-bold" />
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="text" className="w-28 h-3" />
              ))}
            </div>
          </div>

          {/* B2B Solutions Column */}
          <div className="space-y-3">
            <Skeleton variant="text" className="w-24 h-4 mb-3 font-bold" />
            <div className="space-y-2.5">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="text" className="w-32 h-3" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Terms */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton variant="text" className="w-64 h-3.5" />
          <div className="flex items-center gap-4">
            <Skeleton variant="text" className="w-20 h-3.5" />
            <Skeleton variant="text" className="w-20 h-3.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Compound Skeleton: ProfileViewSkeleton
 * Matches Attendee ProfileView hero cover, identity card, stats, tabs, and form 1:1
 */
export const ProfileViewSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="min-h-screen bg-[#F8FAFC] pb-24 pt-6 select-none">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Hero Banner & Profile Identity Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-soft">
          {/* Header Cover Graphic Banner */}
          <div className="relative h-44 sm:h-52 w-full bg-slate-200 overflow-hidden">
            <Skeleton className="h-full w-full rounded-none" />
            <div className="absolute top-4 end-4">
              <Skeleton variant="badge" tone="glass" className="w-24 h-7 rounded-full bg-white/30 backdrop-blur-md" />
            </div>
          </div>

          {/* Profile Identity Details Bar */}
          <div className="relative px-6 pb-6 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-16 sm:-mt-20">
              {/* Avatar placeholder */}
              <div className="relative inline-block self-start">
                <div className="relative size-28 sm:size-36 rounded-3xl overflow-hidden ring-4 ring-white bg-slate-100 shadow-xl">
                  <Skeleton className="size-full rounded-3xl" />
                </div>
              </div>

              {/* Action Buttons in Hero */}
              <div className="flex items-center gap-2.5 flex-wrap sm:mb-2">
                <Skeleton variant="button" className="w-28 h-9 rounded-xl" />
                <Skeleton variant="button" className="w-32 h-9 rounded-xl bg-blue-200" />
              </div>
            </div>

            {/* Name, Headline, Verified Badges */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton variant="text" className="w-44 sm:w-56 h-7 rounded-lg" />
                  <Skeleton variant="badge" className="w-24 h-6 rounded-full" />
                </div>
                <div className="flex items-center gap-2 pt-0.5">
                  <Skeleton variant="text" className="w-48 sm:w-64 h-4 rounded-md" />
                  <Skeleton variant="text" className="w-32 h-4 rounded-md opacity-70" />
                </div>
              </div>

              {/* Profile Completion Meter Pill */}
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200/70 p-3 shrink-0">
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-24 h-3.5 rounded" />
                  <Skeleton variant="text" className="w-36 h-2.5 rounded opacity-60" />
                </div>
                <Skeleton variant="circular" className="size-11 rounded-full" />
              </div>
            </div>
          </div>

          {/* Quick Stats Grid Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-100 bg-slate-50/60 divide-x divide-y sm:divide-y-0 divide-slate-200/60 text-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3.5 space-y-1 flex flex-col items-center">
                <Skeleton variant="text" className="w-8 h-6 rounded-md" />
                <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
              </div>
            ))}
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60 overflow-x-auto max-w-full">
          <Skeleton variant="button" className="w-36 h-9 rounded-xl" />
          <Skeleton variant="button" className="w-44 h-9 rounded-xl" />
          <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
          <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
        </div>

        {/* Tab Content Form Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-soft">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <Skeleton variant="text" className="w-44 h-6 rounded-lg" />
            <Skeleton variant="text" className="w-72 h-3.5 rounded-md opacity-70" />
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton variant="text" className="w-24 h-3.5 rounded" />
                <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Bio Textarea */}
          <div className="space-y-2 pt-2">
            <Skeleton variant="text" className="w-28 h-3.5 rounded" />
            <Skeleton variant="rectangular" className="w-full h-24 rounded-xl" />
          </div>

          {/* Footer Save Row */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Skeleton variant="button" className="w-24 h-10 rounded-xl" />
            <Skeleton variant="button" className="w-32 h-10 rounded-xl bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: SpeakerProfileSkeleton
 * Matches SpeakerProfileView top breadcrumb, speaker card, and 2-column layout 1:1
 */
export const SpeakerProfileSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="min-h-screen bg-[#F8FAFC] pb-24 select-none">
      {/* Top Header & Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Skeleton variant="text" className="w-56 h-4 rounded" />
          <Skeleton variant="button" className="w-28 h-8 rounded-xl" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
        {/* Speaker Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <Skeleton variant="rectangular" className="size-28 sm:size-36 rounded-2xl shrink-0" />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton variant="badge" className="w-24 h-6 rounded-lg" />
                <Skeleton variant="badge" className="w-28 h-6 rounded-lg" />
              </div>

              <Skeleton variant="text" className="w-56 sm:w-72 h-8 rounded-lg" />
              <Skeleton variant="text" className="w-64 sm:w-80 h-4.5 rounded-md" />

              {/* Social Channels */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
                <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
                <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
                <Skeleton variant="button" className="w-28 h-8 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Content 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Upcoming Events (1 Col) */}
          <div className="space-y-4">
            <Skeleton variant="text" className="w-44 h-6 rounded-md" />
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-soft">
                  <Skeleton variant="text" className="w-4/5 h-4.5 rounded-md" />
                  <Skeleton variant="text" className="w-1/2 h-3.5 rounded opacity-70" />
                  <Skeleton variant="badge" className="w-24 h-6 rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Right / Speaker Bio & Expertise (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-soft">
              <Skeleton variant="text" className="w-36 h-6 rounded-md" />
              <div className="space-y-2 pt-1">
                <Skeleton variant="text" className="w-full h-4" />
                <Skeleton variant="text" className="w-full h-4" />
                <Skeleton variant="text" className="w-4/5 h-4" />
                <Skeleton variant="text" className="w-3/5 h-4" />
              </div>
            </div>

            {/* Expertise Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-soft">
              <Skeleton variant="text" className="w-36 h-6 rounded-md" />
              <div className="flex flex-wrap gap-2 pt-1">
                <Skeleton variant="badge" className="w-24 h-7 rounded-lg" />
                <Skeleton variant="badge" className="w-32 h-7 rounded-lg" />
                <Skeleton variant="badge" className="w-28 h-7 rounded-lg" />
                <Skeleton variant="badge" className="w-24 h-7 rounded-lg" />
                <Skeleton variant="badge" className="w-20 h-7 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
