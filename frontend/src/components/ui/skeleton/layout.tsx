import React from 'react';
import clsx from 'clsx';
import { Skeleton } from './base';

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
 * Compound Skeleton: DashboardNavSkeleton
 * Matches DashboardNav sticky topbar (title, icon, visitor switcher, language, notif, user menu) 1:1
 */
export const DashboardNavSkeleton: React.FC = () => {
  return (
    <header
      aria-hidden="true"
      className="sticky top-[45px] z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 select-none"
    >
      {/* Left / Start: Mobile trigger & Screen Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Skeleton variant="rectangular" className="lg:hidden size-9 rounded-xl shrink-0" />
        <div className="flex items-center gap-2.5 min-w-0">
          <Skeleton variant="rectangular" className="hidden sm:flex size-8 rounded-xl shrink-0" />
          <Skeleton variant="text" className="w-36 sm:w-48 h-5 rounded-md" />
          <Skeleton variant="badge" className="w-6 h-5 rounded-full" />
        </div>
      </div>

      {/* Right / End: Switch to Visitor, Language, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Switch to Visitor Pill Placeholder */}
        <Skeleton variant="button" className="hidden md:flex w-24 h-8 rounded-xl" />

        {/* Language Switcher Placeholder */}
        <Skeleton variant="button" className="w-20 h-8 rounded-xl" />

        {/* Notifications Button Placeholder */}
        <Skeleton variant="circular" className="size-9 rounded-xl" />

        {/* User Menu Capsule Placeholder */}
        <div className="flex items-center gap-2.5 p-1 pe-3 rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
          <Skeleton variant="circular" className="size-7 rounded-xl" />
          <div className="hidden sm:block space-y-1">
            <Skeleton variant="text" className="w-16 h-3 rounded" />
            <Skeleton variant="text" className="w-12 h-2 rounded opacity-60" />
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * Compound Skeleton: DashboardSidebarSkeleton
 * Matches DashboardSidebar brand header, sections, and navigation links 1:1
 */
export const DashboardSidebarSkeleton: React.FC<{ isMobileDrawer?: boolean }> = ({
  isMobileDrawer = false,
}) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'flex flex-col h-full bg-white text-slate-700 select-none overflow-hidden border-e border-slate-200/80 shadow-2xs',
        isMobileDrawer ? 'w-64' : 'w-56 xl:w-60'
      )}
    >
      {/* Brand Header */}
      <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2.5 min-w-0 w-full">
          <Skeleton variant="rectangular" className="size-8 rounded-xl shrink-0" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-1.5 leading-none">
              <Skeleton variant="text" className="w-12 h-3.5 rounded" />
              <Skeleton variant="badge" className="w-6 h-3 rounded-full" />
              <Skeleton variant="badge" className="w-14 h-3.5 rounded ms-auto" />
            </div>
            <Skeleton variant="text" className="w-24 h-2 rounded opacity-60" />
          </div>
        </div>
      </div>

      {/* Navigation Links with 4 Groups */}
      <nav className="flex-1 overflow-y-auto min-h-0 p-2 space-y-3">
        {/* Section 1: Core & Governance */}
        <div className="space-y-1">
          <div className="px-2.5 py-1">
            <Skeleton variant="text" className="w-24 h-2.5 rounded opacity-50" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5 bg-blue-50/60 border border-blue-100/60">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-28 h-3.5 rounded" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-32 h-3.5 rounded" />
          </div>
        </div>

        {/* Section 2: Verification & Review */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <div className="px-2.5 py-1">
            <Skeleton variant="text" className="w-20 h-2.5 rounded opacity-50" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
              <Skeleton variant="text" className="w-24 h-3.5 rounded" />
            </div>
            <Skeleton variant="badge" className="w-4.5 h-4.5 rounded-full" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
              <Skeleton variant="text" className="w-28 h-3.5 rounded" />
            </div>
            <Skeleton variant="badge" className="w-4.5 h-4.5 rounded-full" />
          </div>
        </div>

        {/* Section 3: Platform Operations */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <div className="px-2.5 py-1">
            <Skeleton variant="text" className="w-20 h-2.5 rounded opacity-50" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-32 h-3.5 rounded" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
              <Skeleton variant="text" className="w-24 h-3.5 rounded" />
            </div>
            <Skeleton variant="badge" className="w-4.5 h-4.5 rounded-full" />
          </div>
        </div>

        {/* Section 4: Infrastructure & Config */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <div className="px-2.5 py-1">
            <Skeleton variant="text" className="w-24 h-2.5 rounded opacity-50" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-28 h-3.5 rounded" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-24 h-3.5 rounded" />
          </div>
          <div className="rounded-xl px-2.5 py-2 flex items-center gap-2.5">
            <Skeleton variant="rectangular" className="size-4 rounded shrink-0" />
            <Skeleton variant="text" className="w-28 h-3.5 rounded" />
          </div>
        </div>
      </nav>
    </div>
  );
};

