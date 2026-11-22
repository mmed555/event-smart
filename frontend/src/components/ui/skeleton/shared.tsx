import React from 'react';
import { Skeleton } from './base';

export const HelpCenterSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Skeleton variant="rectangular" className="h-8 w-64 mx-auto rounded-xl" />
        <Skeleton variant="text" className="h-4 w-96 mx-auto" />
        <Skeleton variant="rectangular" className="h-12 w-full rounded-2xl" />
      </div>

      {/* Category Tabs Skeleton */}
      <div className="flex items-center justify-center gap-2 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rectangular" className="h-9 w-24 rounded-xl" />
        ))}
      </div>

      {/* FAQ Accordion List Skeleton */}
      <div className="space-y-3 pt-6 max-w-3xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <Skeleton variant="text" className="h-5 w-3/4" />
            <Skeleton variant="text" className="h-3.5 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const TermsPrivacySkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Table of Contents Skeleton */}
        <div className="space-y-4">
          <Skeleton variant="rectangular" className="h-8 w-40 rounded-xl" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="text" className="h-4 w-48" />
          ))}
        </div>

        {/* Document Content Skeleton */}
        <div className="lg:col-span-3 space-y-8 bg-white p-8 rounded-3xl border border-slate-200">
          <Skeleton variant="rectangular" className="h-9 w-3/4 rounded-xl" />
          <Skeleton variant="text" className="h-4 w-full" />
          <Skeleton variant="text" className="h-4 w-5/6" />
          <Skeleton variant="text" className="h-4 w-4/6" />

          <div className="space-y-4 pt-6">
            <Skeleton variant="rectangular" className="h-7 w-1/2 rounded-lg" />
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-11/12" />
          </div>

          <div className="space-y-4 pt-6">
            <Skeleton variant="rectangular" className="h-7 w-2/5 rounded-lg" />
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthCardSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-md w-full px-4 py-16 animate-pulse">
      <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-soft space-y-6">
        <div className="text-center space-y-3">
          <Skeleton variant="circular" className="size-12 mx-auto" />
          <Skeleton variant="rectangular" className="h-7 w-48 mx-auto rounded-xl" />
          <Skeleton variant="text" className="h-3.5 w-64 mx-auto" />
        </div>

        <div className="space-y-4 pt-4">
          <Skeleton variant="rectangular" className="h-10 w-full rounded-xl" />
          <Skeleton variant="rectangular" className="h-10 w-full rounded-xl" />
        </div>

        <Skeleton variant="rectangular" className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
};
