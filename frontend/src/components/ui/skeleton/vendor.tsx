import React from 'react';
import { Skeleton } from './base';

/**
 * Compound Skeleton: VendorOverviewSkeleton
 * Matches OverviewView (V04) 1:1:
 * - Welcome Header Banner with verified badge, title, subtitle, and 2 action buttons
 * - 5 KPI Metric Cards (New RFQs, Active Quotes, Ongoing Orders, Rating, Completed Projects)
 * - AI Matched Opportunities section (2 RFQ opportunity cards with match badges)
 * - Active Orders Progress Tracker (pipeline cards with milestones)
 */
export const VendorOverviewSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Skeleton variant="badge" tone="dark" className="w-48 h-6 rounded-full bg-slate-800" />
              <Skeleton variant="text" tone="dark" className="w-28 h-4 rounded bg-slate-800/60" />
            </div>
            <Skeleton variant="text" tone="dark" className="w-72 sm:w-96 h-8 rounded-lg bg-slate-800" />
            <Skeleton variant="text" tone="dark" className="w-full max-w-xl h-4 rounded bg-slate-800/80" />
          </div>

          <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2 shrink-0">
            <Skeleton variant="button" tone="dark" className="w-44 h-10 rounded-xl bg-slate-800" />
            <Skeleton variant="button" tone="dark" className="w-40 h-10 rounded-xl bg-slate-800" />
          </div>
        </div>
      </div>

      {/* 2. 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-20 h-3.5 rounded" />
              <Skeleton variant="circular" className="size-8 rounded-xl" />
            </div>
            <div className="flex items-baseline gap-2">
              <Skeleton variant="text" className="w-16 h-7 rounded-md" />
              <Skeleton variant="badge" className="w-12 h-4 rounded" />
            </div>
            <Skeleton variant="text" className="w-28 h-3 rounded opacity-60" />
          </div>
        ))}
      </div>

      {/* 3. Main Grid: AI Opportunities + Ongoing Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI-Matched RFQ Opportunities (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="space-y-1">
              <Skeleton variant="text" className="w-56 h-5 rounded" />
              <Skeleton variant="text" className="w-40 h-3.5 rounded opacity-70" />
            </div>
            <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
          </div>

          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton variant="badge" className="w-24 h-5 rounded-full" />
                      <Skeleton variant="badge" className="w-20 h-5 rounded-full" />
                    </div>
                    <Skeleton variant="text" className="w-64 sm:w-80 h-5 rounded" />
                    <Skeleton variant="text" className="w-44 h-3.5 rounded opacity-60" />
                  </div>
                  <Skeleton variant="badge" className="w-16 h-7 rounded-lg" />
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="space-y-1">
                      <Skeleton variant="text" className="w-14 h-3 rounded opacity-60" />
                      <Skeleton variant="text" className="w-20 h-4 rounded" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <Skeleton variant="text" className="w-32 h-3.5 rounded" />
                  <Skeleton variant="button" className="w-32 h-8 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Ongoing Orders Progress Tracker (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="space-y-1">
              <Skeleton variant="text" className="w-44 h-5 rounded" />
              <Skeleton variant="text" className="w-32 h-3.5 rounded opacity-70" />
            </div>
            <Skeleton variant="button" className="w-20 h-8 rounded-xl" />
          </div>

          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3.5">
                <div className="flex items-center justify-between">
                  <Skeleton variant="text" className="w-36 h-4.5 rounded" />
                  <Skeleton variant="badge" className="w-18 h-5 rounded-md" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
                    <Skeleton variant="text" className="w-10 h-3 rounded font-mono" />
                  </div>
                  <Skeleton variant="rectangular" className="w-full h-2 rounded-full" />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="flex items-center gap-2">
                      <Skeleton variant="circular" className="size-4 rounded" />
                      <Skeleton variant="text" className="w-48 h-3.5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorServicesCatalogSkeleton
 * Matches ServicesCatalogView (V06/V07) 1:1:
 * - Action toolbar with search input and category filter chips
 * - 4-Column / 2-Column Responsive Service Cards Grid
 */
export const VendorServicesCatalogSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* Top Toolbar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Skeleton variant="rectangular" className="w-full sm:w-80 h-10 rounded-xl" />
          <Skeleton variant="button" className="w-40 h-10 rounded-xl" />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="badge" className="w-24 h-8 rounded-lg shrink-0" />
          ))}
        </div>
      </div>

      {/* Services Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-soft flex flex-col justify-between">
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <Skeleton variant="rectangular" className="size-20 rounded-2xl shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <Skeleton variant="badge" className="w-24 h-5 rounded-md" />
                    <Skeleton variant="badge" className="w-14 h-5 rounded-md" />
                  </div>
                  <Skeleton variant="text" className="w-3/4 h-5 rounded" />
                  <Skeleton variant="text" className="w-full h-3.5 rounded opacity-70" />
                </div>
              </div>

              {/* Inclusions / Specs list */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} variant="badge" className="w-24 h-6 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Pricing and Action Footer */}
            <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton variant="text" className="w-16 h-3 rounded opacity-60" />
                <Skeleton variant="text" className="w-28 h-5 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" className="size-8 rounded-lg" />
                <Skeleton variant="circular" className="size-8 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorProfileSkeleton
 * Matches VendorProfileView (V05) 1:1:
 * - Cover banner placeholder with change button
 * - White showcase card with avatar, badges, title, bio, contact details
 * - Past work portfolio gallery grid
 */
export const VendorProfileSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Header Showcase Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-soft">
        {/* Cover Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900">
          <Skeleton variant="rectangular" tone="dark" className="w-full h-full rounded-none bg-slate-800" />
          <div className="absolute top-4 start-4">
            <Skeleton variant="button" tone="dark" className="w-36 h-9 rounded-xl bg-slate-800" />
          </div>
          <div className="absolute top-4 end-4">
            <Skeleton variant="button" tone="dark" className="w-32 h-9 rounded-xl bg-slate-800" />
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 pt-0 relative bg-white">
          {/* Top Row: Avatar + Stats Badges */}
          <div className="flex flex-wrap items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
            <Skeleton variant="rectangular" className="size-28 sm:size-32 rounded-2xl border-4 border-white shadow-xl bg-slate-200 shrink-0" />
            <div className="flex items-center gap-2.5 pb-2">
              <Skeleton variant="badge" className="w-20 h-9 rounded-xl" />
              <Skeleton variant="badge" className="w-28 h-9 rounded-xl" />
            </div>
          </div>

          {/* Title & Tagline in clean white area */}
          <div className="space-y-2 pt-1 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Skeleton variant="text" className="w-64 sm:w-96 h-7 rounded-lg" />
              <Skeleton variant="badge" className="w-28 h-6 rounded-full" />
            </div>
            <Skeleton variant="text" className="w-full max-w-xl h-4 rounded opacity-70" />
          </div>

          {/* Categories Chips */}
          <div className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-100">
            <Skeleton variant="text" className="w-20 h-4 rounded opacity-60" />
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="badge" className="w-28 h-7 rounded-lg" />
            ))}
          </div>

          {/* Bio */}
          <div className="pt-4 space-y-2">
            <Skeleton variant="text" className="w-36 h-4 rounded" />
            <Skeleton variant="text" className="w-full max-w-2xl h-3.5 rounded opacity-70" />
            <Skeleton variant="text" className="w-4/5 max-w-xl h-3.5 rounded opacity-60" />
          </div>

          {/* Contact Details Grid (4 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-5 mt-4 border-t border-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1.5">
                <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
                <Skeleton variant="text" className="w-32 h-4 rounded font-medium" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Past Work Portfolio Gallery */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <Skeleton variant="text" className="w-48 h-5 rounded" />
          <Skeleton variant="button" className="w-28 h-8 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden space-y-2.5">
              <Skeleton variant="rectangular" className="w-full h-40 rounded-none" />
              <div className="p-3 space-y-1.5">
                <Skeleton variant="text" className="w-3/4 h-4 rounded" />
                <Skeleton variant="badge" className="w-20 h-5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorRfqInboxSkeleton
 * Matches RfqInboxView (V08/V09) 1:1:
 * - Metrics summary ribbon (New, Response Time, Closing Soon)
 * - Search and Filter toolbar
 * - RFQ cards list with AI Match score, deadline, specs, budget
 */
export const VendorRfqInboxSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Metrics Strip (3 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-28 h-3.5 rounded" />
              <Skeleton variant="circular" className="size-7 rounded-lg" />
            </div>
            <Skeleton variant="text" className="w-16 h-7 rounded-md" />
            <Skeleton variant="text" className="w-36 h-3 rounded opacity-60" />
          </div>
        ))}
      </div>

      {/* 2. Filter Toolbar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Skeleton variant="rectangular" className="w-full sm:w-80 h-10 rounded-xl" />
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="button" className="w-24 h-9 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* 3. RFQ Cards List */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Skeleton variant="badge" className="w-24 h-6 rounded-full" />
                <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
              </div>
              <Skeleton variant="badge" className="w-28 h-6 rounded-full" />
            </div>

            <div className="space-y-1.5">
              <Skeleton variant="text" className="w-3/4 sm:w-1/2 h-6 rounded-md" />
              <Skeleton variant="text" className="w-full max-w-2xl h-4 rounded opacity-70" />
            </div>

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="space-y-1">
                  <Skeleton variant="text" className="w-16 h-3 rounded opacity-60" />
                  <Skeleton variant="text" className="w-24 h-4 rounded font-medium" />
                </div>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <Skeleton variant="text" className="w-36 h-4 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton variant="button" className="w-28 h-9 rounded-xl" />
                <Skeleton variant="button" className="w-36 h-9 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorQuotationsSkeleton
 * Matches MyQuotationsView (V10/V11) 1:1:
 * - Summary KPI banner (Pending, Accepted, Rejected)
 * - Quotations tracker list / table
 */
export const VendorQuotationsSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-24 h-3.5 rounded" />
              <Skeleton variant="circular" className="size-7 rounded-lg" />
            </div>
            <Skeleton variant="text" className="w-14 h-7 rounded-md" />
            <Skeleton variant="text" className="w-32 h-3 rounded opacity-60" />
          </div>
        ))}
      </div>

      {/* 2. Quotations List */}
      <div className="rounded-3xl border border-slate-200/90 bg-white shadow-soft overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Skeleton variant="text" className="w-48 h-5 rounded" />
          <Skeleton variant="rectangular" className="w-64 h-9 rounded-xl" />
        </div>

        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Skeleton variant="text" className="w-48 h-5 rounded" />
                  <Skeleton variant="badge" className="w-20 h-5 rounded-md" />
                </div>
                <Skeleton variant="text" className="w-64 h-3.5 rounded opacity-60" />
                <Skeleton variant="text" className="w-40 h-3 rounded opacity-50" />
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-end space-y-1">
                  <Skeleton variant="text" className="w-24 h-5 rounded ms-auto" />
                  <Skeleton variant="text" className="w-16 h-3 rounded opacity-60 ms-auto" />
                </div>
                <Skeleton variant="button" className="w-28 h-9 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorOrdersSkeleton
 * Matches ServiceOrdersView (V12/V13) 1:1:
 * - Summary Metrics
 * - Orders cards with milestone tracker checklists
 */
export const VendorOrdersSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* Orders List */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Skeleton variant="text" className="w-56 h-6 rounded" />
                  <Skeleton variant="badge" className="w-24 h-5 rounded-full" />
                </div>
                <Skeleton variant="text" className="w-40 h-3.5 rounded opacity-60" />
              </div>
              <div className="text-end space-y-1">
                <Skeleton variant="text" className="w-28 h-6 rounded ms-auto" />
                <Skeleton variant="text" className="w-20 h-3 rounded opacity-60 ms-auto" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Skeleton variant="text" className="w-32 h-3.5 rounded" />
                <Skeleton variant="text" className="w-12 h-3.5 rounded" />
              </div>
              <Skeleton variant="rectangular" className="w-full h-2.5 rounded-full" />
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <Skeleton variant="text" className="w-36 h-4 rounded mb-2" />
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <Skeleton variant="circular" className="size-5 rounded" />
                    <Skeleton variant="text" className="w-48 sm:w-64 h-3.5 rounded" />
                  </div>
                  <Skeleton variant="badge" className="w-16 h-5 rounded-md" />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
              <Skeleton variant="button" className="w-44 h-9 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorReviewsSkeleton
 * Matches VendorReviewsView (V14) 1:1:
 * - Overall rating showcase with criteria breakdown
 * - Review feed cards
 */
export const VendorReviewsSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Rating Showcase Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-2">
            <Skeleton variant="text" className="w-20 h-10 rounded-lg" />
            <Skeleton variant="badge" className="w-28 h-5 rounded-full" />
            <Skeleton variant="text" className="w-24 h-3 rounded opacity-60" />
          </div>

          <div className="lg:col-span-8 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center">
                  <Skeleton variant="text" className="w-32 h-3.5 rounded" />
                  <Skeleton variant="text" className="w-10 h-3.5 rounded" />
                </div>
                <Skeleton variant="rectangular" className="w-full h-2 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Reviews Feed */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-3.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" className="size-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-32 h-4 rounded" />
                  <Skeleton variant="text" className="w-24 h-3 rounded opacity-60" />
                </div>
              </div>
              <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
            </div>

            <Skeleton variant="text" className="w-full max-w-xl h-4 rounded" />
            <Skeleton variant="text" className="w-3/4 max-w-lg h-3.5 rounded opacity-70" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorKycSkeleton
 * Matches VendorKycView (V03) 1:1:
 * - Verification status banner
 * - Official documents cards (Commercial Register & Tax Card)
 */
export const VendorKycSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* Status Banner */}
      <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton variant="badge" tone="dark" className="w-36 h-6 rounded-full bg-slate-800" />
          <Skeleton variant="text" tone="dark" className="w-64 h-6 rounded-lg bg-slate-800" />
          <Skeleton variant="text" tone="dark" className="w-80 h-3.5 rounded bg-slate-800/60" />
        </div>
        <Skeleton variant="circular" tone="dark" className="size-12 rounded-2xl bg-slate-800" />
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-40 h-5 rounded" />
              <Skeleton variant="badge" className="w-20 h-6 rounded-full" />
            </div>
            <Skeleton variant="rectangular" className="w-full h-32 rounded-2xl bg-slate-100" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton variant="text" className="w-28 h-3.5 rounded opacity-60" />
              <Skeleton variant="button" className="w-24 h-8 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorSettingsSkeleton
 * Matches VendorSettingsView (V16) 1:1:
 * - Availability toggle card
 * - Bank account info card
 * - Instant payout wallets card
 * - Notification preferences card
 */
export const VendorSettingsSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none w-full">
      {/* 1. Availability Switch Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton variant="text" className="w-44 h-5 rounded" />
          <Skeleton variant="text" className="w-72 h-3.5 rounded opacity-60" />
        </div>
        <Skeleton variant="rectangular" className="w-14 h-8 rounded-full" />
      </div>

      {/* 2. Official Bank Details Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-5">
        <div className="space-y-1 pb-3 border-b border-slate-100">
          <Skeleton variant="text" className="w-56 h-5 rounded" />
          <Skeleton variant="text" className="w-80 h-3.5 rounded opacity-60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton variant="text" className="w-32 h-3.5 rounded" />
              <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Instant Payout Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft space-y-4">
        <Skeleton variant="text" className="w-48 h-5 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton variant="text" className="w-28 h-3.5 rounded" />
              <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: VendorDashboardSkeleton
 * Smart tab dispatcher matching whatever vendor tab is currently active
 */
export const VendorDashboardSkeleton: React.FC<{ tab?: string }> = ({ tab = 'overview' }) => {
  switch (tab) {
    case 'overview':
      return <VendorOverviewSkeleton />;
    case 'services':
      return <VendorServicesCatalogSkeleton />;
    case 'profile':
      return <VendorProfileSkeleton />;
    case 'rfq-inbox':
      return <VendorRfqInboxSkeleton />;
    case 'my-quotes':
      return <VendorQuotationsSkeleton />;
    case 'orders':
      return <VendorOrdersSkeleton />;
    case 'reviews':
      return <VendorReviewsSkeleton />;
    case 'kyc':
      return <VendorKycSkeleton />;
    case 'settings':
      return <VendorSettingsSkeleton />;
    default:
      return <VendorOverviewSkeleton />;
  }
};
