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

/**
 * Compound Skeleton: LandingHeroSkeleton
 * Matches LandingView hero banner, search bar, and summit visual 1:1
 */
export const LandingHeroSkeleton: React.FC = () => {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,#DBEAFE,transparent_55%),radial-gradient(ellipse_at_bottom_left,#EEF2FF,transparent_55%)] pb-16 pt-12 lg:pt-20 select-none"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Left Column: Text & Search */}
          <div className="space-y-5">
            {/* AI Pill Skeleton */}
            <Skeleton variant="badge" className="w-64 h-7 rounded-full bg-indigo-100" />

            {/* Headline Skeletons */}
            <div className="space-y-3 pt-1">
              <Skeleton variant="text" className="w-11/12 h-11 sm:h-12 rounded-xl" />
              <Skeleton variant="text" className="w-3/4 h-11 sm:h-12 rounded-xl" />
            </div>

            {/* Subtitle Skeletons */}
            <div className="space-y-2 pt-1 max-w-xl">
              <Skeleton variant="text" className="w-full h-4 sm:h-5 rounded-md" />
              <Skeleton variant="text" className="w-4/5 h-4 sm:h-5 rounded-md" />
            </div>

            {/* Interactive Search Bar Skeleton Capsule */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70">
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
              <Skeleton variant="button" className="w-24 h-10 rounded-xl bg-blue-200 shrink-0" />
            </div>

            {/* Trending Quick Tags Skeleton */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <Skeleton variant="text" className="w-20 h-4" />
              <Skeleton variant="badge" className="w-20 h-7 rounded-lg" />
              <Skeleton variant="badge" className="w-16 h-7 rounded-lg" />
              <Skeleton variant="badge" className="w-18 h-7 rounded-lg" />
              <Skeleton variant="badge" className="w-16 h-7 rounded-lg" />
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Featured Highlight Card Skeleton */}
              <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-3 shadow-2xl shadow-indigo-100 space-y-4">
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-slate-100">
                  <Skeleton className="h-full w-full rounded-none" />
                  <div className="absolute bottom-4 inset-x-4 space-y-2">
                    <Skeleton variant="badge" className="w-28 h-6 bg-slate-300" />
                    <Skeleton variant="text" className="w-3/4 h-6 bg-slate-300" />
                    <Skeleton variant="text" className="w-1/2 h-3.5 bg-slate-300" />
                  </div>
                </div>

                {/* Bottom Match & Action Row */}
                <div className="flex items-center justify-between px-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Skeleton variant="circular" className="size-8 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton variant="text" className="w-28 h-3.5" />
                      <Skeleton variant="text" className="w-36 h-2.5 opacity-60" />
                    </div>
                  </div>
                  <Skeleton variant="button" className="w-24 h-8 rounded-lg" />
                </div>
              </div>

              {/* Secondary Floating Card */}
              <div className="absolute -bottom-6 -start-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl backdrop-blur-md">
                <Skeleton variant="circular" className="size-10 rounded-xl" />
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-28 h-3.5" />
                  <Skeleton variant="text" className="w-40 h-2.5 opacity-60" />
                </div>
              </div>
            </div>
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
