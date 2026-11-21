import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Calendar,
  Ticket,
  DollarSign,
  Users,
  Briefcase,
  Sparkles,
  QrCode,
  ArrowUpRight,
  Plus,
  AlertTriangle,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

export const OverviewView: React.FC = () => {
  const {
    events,
    organizerProfile,
    organizerRfqs,
    organizerOrders,
    setActiveOrganizerTab,
    setSelectedCommandCenterEventId,
    publishOrganizerEvent,
    gateOpen,
    gateScans,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const myEvents = events.filter((e) => e.organizer === organizerProfile.organization || e.id === 1 || e.id === 2);
  const totalTicketsSold = myEvents.reduce((acc, ev) => acc + (ev.sold || 0), 0);
  const totalCapacity = myEvents.reduce((acc, ev) => acc + (ev.capacity || 500), 0);
  const totalRevenue = myEvents.reduce((acc, ev) => acc + (ev.sold || 0) * ev.price, 0);

  // Checked in count for today's active event (event 1)
  const checkedInCount = gateScans.filter((s) => s.status === 'ADMIT').length;
  const duplicateAttemptsCount = gateScans.filter((s) => s.status === 'DUPLICATE').length;

  // Alerts for pending/approved events
  const pendingEvents = myEvents.filter((e) => e.status === 'PendingApproval');

  return (
    <div className="space-y-6">
      {/* 1. Welcome & High-Impact Performance Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute -end-16 -top-16 size-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute end-1/3 -bottom-16 size-72 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 px-3 py-1 text-[11px] font-bold text-blue-300">
                <ShieldCheck className="size-3.5 text-blue-400" />
                <span>{isAr ? 'منظم فعاليات معتمد' : 'Verified Event Organizer'}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {organizerProfile.organization}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isAr ? `مرحباً، ${organizerProfile.name}` : `Welcome back, ${organizerProfile.name}`}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'إدارة متكاملة لفعالياتك، مراقبة لحظية لبوابات الـ QR، وتخطيط لوجستي ومشتريات ذكية مدعومة بالذكاء الاصطناعي.'
                : 'Comprehensive event management, live gate QR monitoring, and AI-powered logistics procurement marketplace.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <button
              onClick={() => setActiveOrganizerTab('wizard')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
            >
              <Plus className="size-4" />
              <span>{isAr ? 'إنشاء فعالية جديدة' : 'Create Event'}</span>
            </button>
            <button
              onClick={() => setActiveOrganizerTab('checkin')}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              <QrCode className="size-4 text-emerald-400" />
              <span>{isAr ? 'ماسح البوابات الحية' : 'Live Gate Scanner'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Events */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'إجمالي الفعاليات' : 'Total Events'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
              <Calendar className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{myEvents.length}</div>
          <p className="text-[10px] text-slate-400">{isAr ? 'فعاليات مسجلة' : 'Registered events'}</p>
        </div>

        {/* Tickets Sold */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'التذاكر المباعة' : 'Tickets Sold'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Ticket className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalTicketsSold.toLocaleString()}</div>
          <p className="text-[10px] text-emerald-600 font-bold">
            {Math.round((totalTicketsSold / (totalCapacity || 1)) * 100)}% {isAr ? 'نسبة الإشغال' : 'Capacity sold'}
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'إجمالي الإيرادات' : 'Total Revenue'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="size-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            {totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">ج.م</span>
          </div>
          <p className="text-[10px] text-slate-400">{isAr ? 'مبيعات حية' : 'Live ticket sales'}</p>
        </div>

        {/* Gate Attendance */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'الحضور الفعلي' : 'Live Checked-in'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600">{checkedInCount}</div>
          <p className="text-[10px] text-slate-400 font-mono">
            {gateOpen ? (isAr ? 'البوابة مفتوحة' : 'Gate active') : (isAr ? 'البوابة متوقفة' : 'Gate paused')}
          </p>
        </div>

        {/* Active RFQs */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'طلبات الـ RFQ' : 'Active RFQs'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Briefcase className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{organizerRfqs.length}</div>
          <p className="text-[10px] text-amber-600 font-bold">{isAr ? 'عروض قيد المقارنة' : 'Under comparison'}</p>
        </div>

        {/* Active Orders */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">{isAr ? 'عقود التنفيذ' : 'Service Orders'}</span>
            <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Sparkles className="size-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{organizerOrders.length}</div>
          <p className="text-[10px] text-slate-400">{isAr ? 'مشاريع قيد التسليم' : 'Active contracts'}</p>
        </div>
      </div>

      {/* 3. Operational Banners & Notifications */}
      {pendingEvents.length > 0 && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563EB]">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {isAr
                  ? `هناك ${pendingEvents.length} فعالية بانتظار اعتماد الإدارة المركزية (Super Admin Moderation Queue)`
                  : `${pendingEvents.length} event is currently under review in the Moderation Queue`}
              </p>
              <p className="text-[11px] text-slate-500">
                {pendingEvents[0].title} — {isAr ? 'سيصلك إشعار فوري عند صدور قرار المراجعة.' : 'You will be notified once reviewed.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveOrganizerTab('events')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shrink-0"
          >
            <span>{isAr ? 'عرض الفعاليات' : 'View Events'}</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      )}

      {/* 4. Main Two Column Grid: My Events + Real-time Gate & Logistics Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Events Command Overview (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isAr ? 'الفعاليات الحالية ومتابعة المبيعات' : 'Current Events & Sales Progress'}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? 'متابعة أداء الإشغال وحالة النشر لكل فعالية' : 'Occupancy progress and status for each event'}
              </p>
            </div>
            <button
              onClick={() => setActiveOrganizerTab('events')}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              {isAr ? 'عرض الكل' : 'View All'}
            </button>
          </div>

          <div className="space-y-3">
            {myEvents.map((ev) => {
              const occupancy = Math.round(((ev.sold || 0) / (ev.capacity || 500)) * 100);
              return (
                <div
                  key={ev.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-soft hover:shadow-md transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={ev.img}
                        alt={ev.title}
                        className="size-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              'rounded-md px-2 py-0.5 text-[10px] font-bold',
                              ev.status === 'Published'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : ev.status === 'PendingApproval'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-slate-100 text-slate-700'
                            )}
                          >
                            {ev.status || 'Published'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{ev.date}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mt-0.5">{ev.title}</h3>
                        <p className="text-xs text-slate-500">{ev.venue} · {ev.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCommandCenterEventId(ev.id);
                          setActiveOrganizerTab('command-center', { eventId: ev.id });
                        }}
                        className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                      >
                        {isAr ? 'إدارة الفعالية' : 'Command Center'}
                      </button>
                      {ev.status === 'Draft' && (
                        <button
                          onClick={() => publishOrganizerEvent(ev.id)}
                          className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                        >
                          {isAr ? 'نشر' : 'Publish'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>{isAr ? 'التذاكر المباعة:' : 'Tickets Sold:'} <b className="text-slate-900 font-mono">{ev.sold || 0} / {ev.capacity || 500}</b></span>
                      <span className="font-bold font-mono text-blue-600">{occupancy}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, occupancy)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Gate Ticker & Quick Procurement Hub (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Live Gate Widget */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative flex size-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'مراقبة البوابات اللحظية' : 'Live Gate Radar'}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500">Gate A</span>
            </div>

            <div className="rounded-xl bg-slate-900 p-4 text-white space-y-2">
              <div className="text-xs text-slate-400">{isAr ? 'الحضور الفعلي المكتمل' : 'Admitted Attendees'}</div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {checkedInCount} <span className="text-xs font-normal text-slate-400">/ {totalTicketsSold}</span>
              </div>
              {duplicateAttemptsCount > 0 && (
                <div className="text-[11px] text-amber-400 flex items-center gap-1 font-mono pt-1">
                  <AlertTriangle className="size-3" />
                  <span>{duplicateAttemptsCount} {isAr ? 'محاولات دخول مكررة تم صدها' : 'duplicate scans blocked'}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveOrganizerTab('checkin')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition"
            >
              <QrCode className="size-4" />
              <span>{isAr ? 'فتح شاشة المسح الضوئي' : 'Open Gate Scanner'}</span>
            </button>
          </div>

          {/* AI Logistics Quick Launch Widget */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-blue-50/30 p-5 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-indigo-700">
              <Sparkles className="size-4.5" />
              <h3 className="text-sm font-bold">{isAr ? 'المخطط اللوجستي الذكي' : 'AI Logistics Planner'}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr
                ? 'هل تخطط لفعالية جديدة؟ أدخل عدد الحضور والميزانية ليقترح الذكاء الاصطناعي قائمة التجهيزات الصوتية والمسارح والشاشات فورياً.'
                : 'Plan your next summit with automated audio, lighting, stage, and LED screen equipment recommendations.'}
            </p>
            <button
              onClick={() => setActiveOrganizerTab('ai-planner')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-indigo-700 transition"
            >
              <Sparkles className="size-4" />
              <span>{isAr ? 'بدء التخطيط الذكي' : 'Start AI Planning'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
