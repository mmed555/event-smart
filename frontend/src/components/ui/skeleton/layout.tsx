import React from 'react';
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
