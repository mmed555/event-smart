import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { EventStatus } from '../../types';
import { AdminTableSkeleton } from '../../components/ui/Skeleton';
import { EventModerationView } from './EventModerationView';
import {
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  MapPin,
  Calendar,
  Shield,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

interface EventsQueueViewProps {
  initialTab?: 'queue' | 'moderation';
}

export const EventsQueueView: React.FC<EventsQueueViewProps> = ({ initialTab = 'queue' }) => {
  const { adminEventsQueue, selectedAdminEventId, setSelectedAdminEventId, isLoading } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'queue' | 'moderation'>(initialTab);
  const [statusFilter, setStatusFilter] = useState<'ALL' | EventStatus>('PendingApproval');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <AdminTableSkeleton rows={6} filterPillsCount={3} hasTabs={true} />;
  }

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const filteredEvents = useMemo(() => {
    return adminEventsQueue.filter((ev) => {
      if (statusFilter !== 'ALL' && ev.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          ev.title.toLowerCase().includes(q) ||
          (ev.titleAr && ev.titleAr.includes(q));
        const matchOrg = ev.organizerName.toLowerCase().includes(q);
        const matchCity = ev.city.toLowerCase().includes(q);
        if (!matchTitle && !matchOrg && !matchCity) return false;
      }
      return true;
    });
  }, [adminEventsQueue, statusFilter, searchQuery]);

  const pendingCount = adminEventsQueue.filter((e) => e.status === 'PendingApproval').length;
  const approvedCount = adminEventsQueue.filter((e) => e.status === 'Approved').length;
  const rejectedCount = adminEventsQueue.filter((e) => e.status === 'Rejected').length;

  const currentSelectedEvent = adminEventsQueue.find((e) => e.id === selectedAdminEventId);

  const handleOpenModeration = (eventId: number) => {
    setSelectedAdminEventId(eventId);
    setActiveTab('moderation');
  };

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Tabs: Queue vs In-Page Moderation */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={clsx(
              'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs',
              activeTab === 'queue'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            <Calendar className="size-4" />
            <span>{isAr ? 'طابور مراجعة الفعاليات' : 'Events Moderation Queue'}</span>
            <span
              className={clsx(
                'rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold',
                activeTab === 'queue' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'
              )}
            >
              {pendingCount} {isAr ? 'معلق' : 'pending'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={clsx(
              'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs',
              activeTab === 'moderation'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            )}
          >
            <Shield className="size-4" />
            <span>{isAr ? 'فحص واعتماد الفعالية' : 'Event Audit & Approval'}</span>
            {currentSelectedEvent && (
              <span
                className={clsx(
                  'rounded-md px-1.5 py-0.5 text-[10px] font-bold truncate max-w-[140px]',
                  activeTab === 'moderation' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
                )}
              >
                {isAr ? currentSelectedEvent.titleAr || currentSelectedEvent.title : currentSelectedEvent.title}
              </span>
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Sparkles className="size-4 text-indigo-600" />
          <span>{isAr ? 'تدقيق السياسات ومراجعة تذاكر الفعاليات' : 'Policy & Content Moderation'}</span>
        </div>
      </div>

      {/* Tab 1: Events Queue Table */}
      {activeTab === 'queue' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'البحث بعنوان الفعالية أو المنظم أو المدينة...' : 'Search by title, organizer, or city...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 ps-10 pe-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setStatusFilter('PendingApproval')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    statusFilter === 'PendingApproval'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                  )}
                >
                  <Clock className="size-3.5" />
                  <span>{isAr ? 'قيد الانتظار' : 'Pending'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{pendingCount}</span>
                </button>

                <button
                  onClick={() => setStatusFilter('Approved')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    statusFilter === 'Approved'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  )}
                >
                  <CheckCircle className="size-3.5" />
                  <span>{isAr ? 'معتمدة' : 'Approved'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{approvedCount}</span>
                </button>

                <button
                  onClick={() => setStatusFilter('Rejected')}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    statusFilter === 'Rejected'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'text-red-800 bg-red-50 hover:bg-red-100'
                  )}
                >
                  <XCircle className="size-3.5" />
                  <span>{isAr ? 'مرفوضة' : 'Rejected'}</span>
                  <span className="rounded-md bg-white/20 px-1.5 text-[10px] font-mono">{rejectedCount}</span>
                </button>

                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={clsx(
                    'rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0',
                    statusFilter === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  )}
                >
                  {isAr ? 'الكل' : 'All'}
                </button>
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3.5">{isAr ? 'الفعالية' : 'Event'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'الجهة المنظمة' : 'Organizer'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'المكان والمدينة' : 'Venue & City'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'الحالة' : 'Status'}</th>
                    <th className="px-4 py-3.5">{isAr ? 'تاريخ التقديم' : 'Submitted'}</th>
                    <th className="px-5 py-3.5 text-end">{isAr ? 'الفحص والقرار' : 'Audit'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                        {isAr ? 'لا توجد فعاليات مطابقة لمعايير البحث' : 'No events in this filter queue'}
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={ev.coverImage}
                              alt={ev.title}
                              className="size-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {isAr ? ev.titleAr || ev.title : ev.title}
                                <span className="font-mono text-[10px] text-slate-400">({ev.id})</span>
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="font-semibold text-blue-600">
                                  {isAr ? ev.categoryAr || ev.category : ev.category}
                                </span>
                                <span>·</span>
                                <span>{ev.date}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-slate-800">{ev.organizerName}</div>
                          <div className="font-mono text-[10px] text-slate-400">{ev.organizerEmail}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 text-slate-700">
                            <MapPin className="size-3 text-slate-400 shrink-0" />
                            <span className="font-medium truncate max-w-[150px]">{ev.venue}</span>
                          </div>
                          <div className="font-mono text-[10px] text-slate-500">{ev.city}</div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={clsx(
                              'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                              ev.status === 'Approved' && 'bg-emerald-100 text-emerald-800',
                              ev.status === 'PendingApproval' && 'bg-amber-100 text-amber-800',
                              ev.status === 'Rejected' && 'bg-red-100 text-red-800',
                              ev.status === 'Cancelled' && 'bg-slate-800 text-white'
                            )}
                          >
                            <span className="size-1.5 rounded-full bg-current" />
                            {ev.status}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                            <Clock className="size-3 text-slate-400" />
                            {ev.submittedAt}
                          </div>
                        </td>

                        <td className="px-5 py-3.5 text-end">
                          <button
                            onClick={() => handleOpenModeration(ev.id)}
                            className={clsx(
                              'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition shadow-xs',
                              ev.status === 'PendingApproval'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            )}
                          >
                            <Eye className="size-3.5" />
                            <span>
                              {ev.status === 'PendingApproval'
                                ? isAr ? 'فحص الفعالية' : 'Audit Event'
                                : isAr ? 'عرض الفعالية' : 'View Event'}
                            </span>
                            <ChevronRight className="size-3 text-current opacity-70" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: In-Page Event Moderation & Audit */}
      {activeTab === 'moderation' && (
        <EventModerationView onBackToQueue={() => setActiveTab('queue')} />
      )}
    </div>
  );
};