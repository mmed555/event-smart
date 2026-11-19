import React from 'react';
import { Skeleton } from './base';

/**
 * Compound Skeleton: AdminOverviewSkeleton
 * Matches Admin OverviewView 1:1:
 * - Welcome Banner with live system status, admin greeting, quick action buttons, and 4 mini-metrics
 * - Critical Action Banner with 3 triage queue cards
 * - 6 Primary Metric Stat Cards (Users, Events, Bookings, Vendors, Revenue, Disputes)
 * - 4 Cross-System Domain Operational Telemetry Cards with progress bars
 * - Analytics & Distribution Snapshot (Bar chart container with 8 bars, category distribution progress bars)
 * - Quick Access Governance Matrix
 */
export const AdminOverviewSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton variant="badge" tone="dark" className="w-48 h-6 rounded-full bg-slate-800/90" />
              <Skeleton variant="text" tone="dark" className="w-28 h-4 rounded bg-slate-800/70" />
            </div>
            <Skeleton variant="text" tone="dark" className="w-72 sm:w-96 h-8 rounded-lg bg-slate-800" />
            <Skeleton variant="text" tone="dark" className="w-full max-w-2xl h-4 rounded bg-slate-800/80" />
            <Skeleton variant="text" tone="dark" className="w-4/5 max-w-xl h-4 rounded bg-slate-800/60" />
          </div>

          <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2 shrink-0">
            <Skeleton variant="button" tone="dark" className="w-36 h-9 rounded-xl bg-slate-800" />
            <Skeleton variant="button" tone="dark" className="w-40 h-9 rounded-xl bg-slate-800" />
          </div>
        </div>

        {/* Live Mini Stats Ribbon (4 cols) */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton variant="text" tone="dark" className="w-24 h-3 rounded bg-slate-800/70" />
              <Skeleton variant="text" tone="dark" className="w-16 h-6 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Critical Action Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="size-8 rounded-xl bg-red-100" />
          <div className="space-y-1">
            <Skeleton variant="text" className="w-48 h-4.5 rounded" />
            <Skeleton variant="text" className="w-72 h-3.5 rounded opacity-70" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
              <Skeleton variant="text" className="w-12 h-6 rounded" />
              <Skeleton variant="text" className="w-32 h-4 rounded" />
              <Skeleton variant="text" className="w-24 h-3 rounded opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Primary Metric Stat Cards (6 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <Skeleton variant="text" className="w-16 h-3.5 rounded" />
              <Skeleton variant="circular" className="size-4 rounded" />
            </div>
            <Skeleton variant="text" className="w-20 h-6 rounded-md" />
            <Skeleton variant="text" className="w-16 h-3 rounded" />
          </div>
        ))}
      </div>

      {/* 4. Cross-System Operational Telemetry (4 sectors) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="space-y-1.5">
            <Skeleton variant="text" className="w-64 h-5 rounded" />
            <Skeleton variant="text" className="w-80 h-3.5 rounded opacity-70" />
          </div>
          <Skeleton variant="badge" className="w-36 h-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" className="w-32 h-4 rounded" />
                <Skeleton variant="badge" className="w-16 h-5 rounded-md" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex justify-between items-center">
                    <Skeleton variant="text" className="w-24 h-3 rounded" />
                    <Skeleton variant="text" className="w-12 h-3 rounded" />
                  </div>
                ))}
              </div>
              <Skeleton variant="rectangular" className="w-full h-1.5 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Analytics & Distribution Snapshot (7 cols + 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Curve Chart Simulation (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton variant="text" className="w-56 h-4.5 rounded" />
              <Skeleton variant="text" className="w-72 h-3.5 rounded opacity-70" />
            </div>
            <div className="flex gap-2">
              <Skeleton variant="badge" className="w-16 h-5 rounded" />
              <Skeleton variant="badge" className="w-16 h-5 rounded" />
            </div>
          </div>

          {/* Bar Chart Simulation */}
          <div className="pt-6 grid grid-cols-8 gap-2 items-end h-44 border-b border-slate-100 pb-2">
            {[40, 55, 65, 75, 85, 90, 95, 100].map((h, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  <Skeleton
                    style={{ height: `${h}%` }}
                    className="w-2.5 sm:w-3.5 rounded-t-sm"
                  />
                  <Skeleton
                    style={{ height: `${Math.max(15, h - 20)}%` }}
                    className="w-2.5 sm:w-3.5 rounded-t-sm opacity-60"
                  />
                </div>
                <Skeleton variant="text" className="w-6 h-2.5 rounded" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Skeleton variant="text" className="w-24 h-3 rounded" />
            <Skeleton variant="text" className="w-32 h-3 rounded" />
          </div>
        </div>

        {/* Categories Distribution Skeleton (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton variant="text" className="w-48 h-4.5 rounded" />
            <Skeleton variant="text" className="w-20 h-4 rounded" />
          </div>

          <div className="space-y-3.5 pt-2">
            {[75, 55, 45, 35, 20].map((width, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Skeleton variant="text" className="w-28 h-3.5 rounded" />
                  <Skeleton variant="text" className="w-14 h-3.5 rounded" />
                </div>
                <Skeleton
                  variant="rectangular"
                  style={{ width: `${width}%` }}
                  className="h-2 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Quick Access Governance Modules Matrix */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <Skeleton variant="text" className="w-56 h-4.5 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50">
              <Skeleton variant="circular" className="size-8 rounded-lg shrink-0" />
              <Skeleton variant="text" className="w-28 h-3.5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: AdminTableSkeleton
 * Reusable table skeleton matching UsersListView, VendorQueueView, EventsQueueView, DisputesView, and TaxonomyView 1:1
 */
export const AdminTableSkeleton: React.FC<{
  rows?: number;
  filterPillsCount?: number;
  hasTabs?: boolean;
}> = ({ rows = 7, filterPillsCount = 4, hasTabs = false }) => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none">
      {/* Optional Top Tabs */}
      {hasTabs && (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Skeleton variant="button" className="w-32 h-9 rounded-xl bg-blue-200" />
          <Skeleton variant="button" className="w-32 h-9 rounded-xl opacity-60" />
          <Skeleton variant="button" className="w-32 h-9 rounded-xl opacity-40" />
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
          </div>

          {/* Filter Pills & Action Button */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {Array.from({ length: filterPillsCount }).map((_, i) => (
              <Skeleton key={i} variant="button" className="w-20 h-8 rounded-lg" />
            ))}
            <Skeleton variant="button" className="w-28 h-8 rounded-xl bg-blue-200" />
          </div>
        </div>

        {/* Secondary Filters or Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Skeleton variant="badge" className="w-16 h-6 rounded-md" />
            <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
            <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
          </div>
          <Skeleton variant="text" className="w-24 h-4 rounded" />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold">
          <div className="col-span-4 sm:col-span-3">
            <Skeleton variant="text" className="w-20 h-4 rounded" />
          </div>
          <div className="hidden sm:block col-span-2">
            <Skeleton variant="text" className="w-16 h-4 rounded" />
          </div>
          <div className="col-span-3 sm:col-span-2">
            <Skeleton variant="text" className="w-14 h-4 rounded" />
          </div>
          <div className="hidden md:block col-span-2">
            <Skeleton variant="text" className="w-20 h-4 rounded" />
          </div>
          <div className="col-span-5 sm:col-span-3 text-end flex justify-end">
            <Skeleton variant="text" className="w-16 h-4 rounded" />
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-100">
          {Array.from({ length: rows }).map((_, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              {/* Identity (Avatar + Name + Subtitle) */}
              <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                <Skeleton variant="circular" className="size-9 rounded-xl shrink-0" />
                <div className="space-y-1.5 min-w-0 flex-1">
                  <Skeleton variant="text" className="w-28 sm:w-36 h-4 rounded" />
                  <Skeleton variant="text" className="w-20 sm:w-28 h-3 rounded opacity-60" />
                </div>
              </div>

              {/* Column 2: Role / Category */}
              <div className="hidden sm:flex col-span-2 items-center">
                <Skeleton variant="badge" className="w-20 h-6 rounded-lg" />
              </div>

              {/* Column 3: Status */}
              <div className="col-span-3 sm:col-span-2 flex items-center">
                <Skeleton variant="badge" className="w-16 h-6 rounded-full" />
              </div>

              {/* Column 4: Date / Metric */}
              <div className="hidden md:block col-span-2 space-y-1">
                <Skeleton variant="text" className="w-24 h-3.5 rounded" />
                <Skeleton variant="text" className="w-16 h-3 rounded opacity-50" />
              </div>

              {/* Column 5: Action Buttons */}
              <div className="col-span-5 sm:col-span-3 flex items-center justify-end gap-2">
                <Skeleton variant="button" className="w-16 h-8 rounded-lg" />
                <Skeleton variant="button" className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Table Pagination Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Skeleton variant="text" className="w-36 h-4 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton variant="button" className="w-20 h-8 rounded-lg" />
            <Skeleton variant="button" className="w-8 h-8 rounded-lg" />
            <Skeleton variant="button" className="w-8 h-8 rounded-lg" />
            <Skeleton variant="button" className="w-20 h-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: AdminSystemHealthSkeleton
 * Matches SystemHealthView microservices status, latency gauges, cluster cards & incident telemetry 1:1
 */
export const AdminSystemHealthSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none">
      {/* 1. Master System Status Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="size-10 rounded-xl" />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Skeleton variant="text" className="w-56 h-4.5 rounded" />
              <Skeleton variant="badge" className="w-36 h-5 rounded-full" />
            </div>
            <Skeleton variant="text" className="w-72 h-3.5 rounded opacity-70" />
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
        </div>
      </div>

      {/* 2. Microservices Status Cards Grid (4 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <Skeleton variant="circular" className="size-8 rounded-xl" />
              <Skeleton variant="badge" className="w-16 h-5 rounded-full" />
            </div>
            <div className="space-y-1">
              <Skeleton variant="text" className="w-32 h-4.5 rounded" />
              <Skeleton variant="text" className="w-20 h-3 rounded opacity-60" />
            </div>
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex justify-between">
                <Skeleton variant="text" className="w-16 h-3 rounded" />
                <Skeleton variant="text" className="w-12 h-3 rounded" />
              </div>
              <Skeleton variant="rectangular" className="w-full h-1.5 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Performance & Resource Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton variant="text" className="w-40 h-5 rounded" />
              <Skeleton variant="badge" className="w-24 h-5 rounded" />
            </div>
            <Skeleton variant="rectangular" className="w-full h-44 rounded-xl" />
          </div>
        ))}
      </div>

      {/* 4. Live Telemetry Logs Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Skeleton variant="text" className="w-48 h-4.5 rounded" />
            <Skeleton variant="text" className="w-64 h-3 rounded opacity-60" />
          </div>
          <Skeleton variant="badge" className="w-20 h-6 rounded-md" />
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="badge" className="w-16 h-5 rounded" />
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-48 h-4 rounded" />
                  <Skeleton variant="text" className="w-72 h-3 rounded opacity-60" />
                </div>
              </div>
              <Skeleton variant="badge" className="w-16 h-5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: AdminFormSkeleton
 * Matches SettingsView & BroadcastView configuration panels and form inputs 1:1
 */
export const AdminFormSkeleton: React.FC = () => {
  return (
    <div aria-hidden="true" className="space-y-6 select-none">
      {/* Form Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <Skeleton variant="button" className="w-28 h-9 rounded-xl bg-blue-200" />
        <Skeleton variant="button" className="w-32 h-9 rounded-xl" />
        <Skeleton variant="button" className="w-28 h-9 rounded-xl" />
        <Skeleton variant="button" className="w-36 h-9 rounded-xl" />
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1.5 pb-4 border-b border-slate-100">
          <Skeleton variant="text" className="w-48 h-6 rounded" />
          <Skeleton variant="text" className="w-80 h-4 rounded opacity-70" />
        </div>

        {/* Form Inputs Grid */}
        <div className="space-y-5 max-w-2xl">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton variant="text" className="w-36 h-4 rounded" />
              <Skeleton variant="rectangular" className="w-full h-10 rounded-xl" />
              <Skeleton variant="text" className="w-64 h-3 rounded opacity-60" />
            </div>
          ))}

          {/* Toggle Switches */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton variant="text" className="w-48 h-4 rounded" />
                  <Skeleton variant="text" className="w-64 h-3 rounded opacity-60" />
                </div>
                <Skeleton variant="rectangular" className="w-12 h-6 rounded-full" />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Skeleton variant="button" className="w-24 h-10 rounded-xl" />
            <Skeleton variant="button" className="w-32 h-10 rounded-xl bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compound Skeleton: AdminDashboardSkeleton
 * Smart tab dispatcher matching whatever admin tab is currently selected
 */
export const AdminDashboardSkeleton: React.FC<{ tab?: string }> = ({ tab = 'overview' }) => {
  switch (tab) {
    case 'overview':
      return <AdminOverviewSkeleton />;
    case 'users':
      return <AdminTableSkeleton rows={8} filterPillsCount={4} />;
    case 'kyc-queue':
    case 'kyc-review':
      return <AdminTableSkeleton rows={6} filterPillsCount={3} hasTabs={true} />;
    case 'events-queue':
    case 'event-review':
      return <AdminTableSkeleton rows={6} filterPillsCount={3} hasTabs={true} />;
    case 'categories':
    case 'disputes':
      return <AdminTableSkeleton rows={6} filterPillsCount={3} />;
    case 'system-health':
      return <AdminSystemHealthSkeleton />;
    case 'broadcast':
    case 'settings':
      return <AdminFormSkeleton />;
    default:
      return <AdminOverviewSkeleton />;
  }
};
