import React from 'react';
import { Skeleton } from './base';

/**
 * Compound Skeleton: OrganizerOverviewSkeleton (O01)
 * Matches Organizer OverviewView:
 * - Welcome Banner with stats & quick actions
 * - 6 KPI Metric Cards
 * - Pending Approval / Action alerts
 * - Active Events Table + Live Gate ticker
 */
export const OrganizerOverviewSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton variant="badge" tone="dark" className="w-36 h-6 rounded-full bg-slate-800" />
              <Skeleton variant="text" tone="dark" className="w-24 h-4 rounded bg-slate-800/60" />
            </div>
            <Skeleton variant="text" tone="dark" className="w-72 sm:w-96 h-8 rounded-lg bg-slate-800" />
            <Skeleton variant="text" tone="dark" className="w-full max-w-xl h-4 rounded bg-slate-800/80" />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <Skeleton variant="button" tone="dark" className="w-36 h-10 rounded-xl bg-slate-800" />
            <Skeleton variant="button" tone="dark" className="w-32 h-10 rounded-xl bg-slate-800" />
          </div>
        </div>
      </div>

      {/* 2. 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-16 h-3 rounded" />
              <Skeleton variant="circular" className="size-7 rounded-lg" />
            </div>
            <Skeleton variant="text" className="w-20 h-6 rounded" />
            <Skeleton variant="text" className="w-24 h-3 rounded opacity-60" />
          </div>
        ))}
      </div>

      {/* 3. Action Alert Banner Skeleton */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="size-6 rounded-full" />
          <Skeleton variant="text" className="w-80 h-4 rounded" />
        </div>
        <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
      </div>

      {/* 4. Main Two Column Grid: My Events + Live Gate Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton variant="text" className="w-40 h-5 rounded" />
            <Skeleton variant="button" className="w-20 h-7 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100">
                <div className="space-y-1.5">
                  <Skeleton variant="text" className="w-56 h-4 rounded" />
                  <Skeleton variant="text" className="w-32 h-3 rounded opacity-60" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton variant="badge" className="w-20 h-5 rounded-full" />
                  <Skeleton variant="button" className="w-16 h-7 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
          <Skeleton variant="text" className="w-36 h-5 rounded" />
          <div className="rounded-xl bg-slate-900 p-4 space-y-3">
            <Skeleton variant="text" tone="dark" className="w-24 h-3 rounded bg-slate-800" />
            <Skeleton variant="text" tone="dark" className="w-40 h-8 rounded bg-slate-800" />
            <Skeleton variant="text" tone="dark" className="w-full h-2 rounded-full bg-slate-800" />
          </div>
          <Skeleton variant="button" className="w-full h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerEventsSkeleton (O02)
 */
export const OrganizerEventsSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Skeleton variant="text" className="w-48 h-7 rounded" />
          <Skeleton variant="text" className="w-72 h-4 rounded opacity-70" />
        </div>
        <Skeleton variant="button" className="w-36 h-10 rounded-xl" />
      </div>

      <div className="flex flex-wrap items-center gap-2 pb-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="badge" className="w-24 h-8 rounded-xl" />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Skeleton variant="rectangular" className="w-72 h-10 rounded-xl" />
          <Skeleton variant="button" className="w-28 h-10 rounded-xl" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" className="size-16 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton variant="text" className="w-64 h-5 rounded" />
                  <Skeleton variant="text" className="w-44 h-3 rounded opacity-60" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton variant="badge" className="w-24 h-6 rounded-full" />
                <Skeleton variant="button" className="w-20 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerWizardSkeleton (O03 / O04)
 */
export const OrganizerWizardSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full max-w-4xl mx-auto">
      <div className="space-y-2 text-center">
        <Skeleton variant="text" className="w-64 h-8 rounded mx-auto" />
        <Skeleton variant="text" className="w-96 h-4 rounded mx-auto opacity-70" />
      </div>

      {/* Stepper bar */}
      <div className="grid grid-cols-5 gap-2 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton variant="text" className="w-full h-2 rounded-full" />
            <Skeleton variant="text" className="w-16 h-3 rounded mx-auto" />
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft space-y-6">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-40 h-5 rounded" />
          <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-28 h-5 rounded" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-28 h-5 rounded" />
            <Skeleton variant="rectangular" className="w-full h-11 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" className="w-32 h-5 rounded" />
          <Skeleton variant="rectangular" className="w-full h-28 rounded-2xl" />
        </div>
        <div className="flex justify-between pt-4 border-t border-slate-100">
          <Skeleton variant="button" className="w-28 h-10 rounded-xl" />
          <Skeleton variant="button" className="w-32 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerCommandCenterSkeleton (O05 - O10)
 */
export const OrganizerCommandCenterSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* Event Header Banner */}
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="badge" tone="dark" className="w-32 h-6 rounded-full bg-slate-800" />
          <Skeleton variant="button" tone="dark" className="w-28 h-9 rounded-xl bg-slate-800" />
        </div>
        <Skeleton variant="text" tone="dark" className="w-80 sm:w-96 h-8 rounded-lg bg-slate-800" />
        <div className="flex gap-4">
          <Skeleton variant="text" tone="dark" className="w-32 h-4 rounded bg-slate-800/80" />
          <Skeleton variant="text" tone="dark" className="w-40 h-4 rounded bg-slate-800/80" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Skeleton key={i} variant="badge" className="w-28 h-9 rounded-xl" />
        ))}
      </div>

      {/* Panel Content */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
        <Skeleton variant="text" className="w-48 h-6 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 space-y-2">
              <Skeleton variant="text" className="w-24 h-4 rounded" />
              <Skeleton variant="text" className="w-16 h-7 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerCheckinSkeleton (O11 & O12)
 */
export const OrganizerCheckinSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* Title & Gate control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Skeleton variant="text" className="w-64 h-7 rounded" />
          <Skeleton variant="text" className="w-48 h-4 rounded opacity-70" />
        </div>
        <Skeleton variant="button" className="w-32 h-10 rounded-xl" />
      </div>

      {/* 4 Gate KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
            <Skeleton variant="text" className="w-24 h-3.5 rounded" />
            <Skeleton variant="text" className="w-16 h-8 rounded" />
          </div>
        ))}
      </div>

      {/* Camera Viewport & Test Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 p-6 border border-slate-800 shadow-xl space-y-4">
          <Skeleton variant="text" tone="dark" className="w-40 h-5 rounded bg-slate-800" />
          <Skeleton variant="rectangular" tone="dark" className="w-full h-64 rounded-2xl bg-slate-800" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" tone="dark" className="flex-1 h-10 rounded-xl bg-slate-800" />
            <Skeleton variant="button" tone="dark" className="w-24 h-10 rounded-xl bg-slate-800" />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
          <Skeleton variant="text" className="w-36 h-5 rounded" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-32 h-4 rounded" />
                  <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
                </div>
                <Skeleton variant="badge" className="w-16 h-5 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerAiPlannerSkeleton (O13 & O14)
 */
export const OrganizerAiPlannerSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      <div className="space-y-1">
        <Skeleton variant="text" className="w-64 h-7 rounded" />
        <Skeleton variant="text" className="w-96 h-4 rounded opacity-70" />
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton variant="text" className="w-24 h-4 rounded" />
              <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
            </div>
          ))}
        </div>
        <Skeleton variant="button" className="w-48 h-10 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton variant="badge" className="w-28 h-5 rounded-full" />
              <Skeleton variant="text" className="w-20 h-5 rounded" />
            </div>
            <Skeleton variant="text" className="w-48 h-5 rounded" />
            <Skeleton variant="text" className="w-full h-10 rounded opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerMarketplaceSkeleton (O15 & O16)
 */
export const OrganizerMarketplaceSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Skeleton variant="text" className="w-56 h-7 rounded" />
          <Skeleton variant="text" className="w-72 h-4 rounded opacity-70" />
        </div>
        <Skeleton variant="button" className="w-36 h-10 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" className="size-12 rounded-xl" />
              <div className="space-y-1 flex-1">
                <Skeleton variant="text" className="w-32 h-5 rounded" />
                <Skeleton variant="text" className="w-20 h-3.5 rounded opacity-60" />
              </div>
            </div>
            <Skeleton variant="text" className="w-full h-10 rounded" />
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <Skeleton variant="badge" className="w-20 h-5 rounded-full" />
              <Skeleton variant="button" className="w-24 h-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerQuotesSkeleton (O19 - O21)
 */
export const OrganizerQuotesSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      <div className="space-y-1">
        <Skeleton variant="text" className="w-64 h-7 rounded" />
        <Skeleton variant="text" className="w-80 h-4 rounded opacity-70" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3">
          <Skeleton variant="text" className="w-24 h-5 rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-xl border border-slate-100 space-y-2">
              <Skeleton variant="text" className="w-32 h-4 rounded" />
              <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-6">
          <Skeleton variant="text" className="w-48 h-6 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 space-y-3">
                <Skeleton variant="text" className="w-32 h-5 rounded" />
                <Skeleton variant="text" className="w-20 h-7 rounded" />
                <Skeleton variant="button" className="w-full h-9 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: OrganizerOrdersSkeleton (O22 & O23)
 */
export const OrganizerOrdersSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      <div className="space-y-1">
        <Skeleton variant="text" className="w-56 h-7 rounded" />
        <Skeleton variant="text" className="w-72 h-4 rounded opacity-70" />
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton variant="text" className="w-48 h-5 rounded" />
                <Skeleton variant="text" className="w-32 h-3.5 rounded opacity-60" />
              </div>
              <Skeleton variant="badge" className="w-24 h-6 rounded-full" />
            </div>
            <Skeleton variant="text" className="w-full h-2 rounded-full" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton variant="text" className="w-32 h-4 rounded" />
              <Skeleton variant="button" className="w-28 h-8 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
