import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Ticket,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

export const AD07_EventModerationView: React.FC = () => {
  const {
    adminEventsQueue,
    selectedAdminEventId,
    moderateEvent,
    setActiveAdminTab,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const event =
    adminEventsQueue.find((e) => e.id === selectedAdminEventId) ||
    adminEventsQueue[0];

  const [notes, setNotes] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  if (!event) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
        <AlertTriangle className="size-10 text-slate-400 mx-auto" />
        <h3 className="mt-3 text-sm font-bold text-slate-800">
          {isAr ? 'لا توجد فعالية محددة للمراجعة' : 'No event selected for audit'}
        </h3>
        <button
          onClick={() => setActiveAdminTab('events-queue')}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
        >
          {isAr ? 'العودة لطابور الفعاليات' : 'Back to Events Queue'}
        </button>
      </div>
    );
  }

  const handleApprove = () => {
    moderateEvent(event.id, 'Approved');
  };

  const handleReject = () => {
    if (!notes.trim()) return;
    moderateEvent(event.id, 'Rejected', notes);
    setShowRejectBox(false);
  };

  const handleSuspend = () => {
    moderateEvent(event.id, 'Cancelled', 'Administrative emergency suspension');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAdminTab('events-queue')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            {isAr ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
            <span>{isAr ? 'العودة لطابور AD06' : 'Back to AD06 Queue'}</span>
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Calendar className="size-6 text-blue-600" />
              {isAr ? 'AD07 — فحص واعتماد الفعالية ونشرها' : 'AD07 — Event Moderation & Audit Desk'}
            </h2>
            <span className="font-mono text-xs text-slate-500 font-bold">
              ID #{event.id} · {event.organizerName}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider',
              event.status === 'Approved' && 'bg-emerald-100 text-emerald-800 border border-emerald-300',
              event.status === 'PendingApproval' && 'bg-amber-100 text-amber-800 border border-amber-300',
              event.status === 'Rejected' && 'bg-red-100 text-red-800 border border-red-300',
              event.status === 'Cancelled' && 'bg-slate-800 text-white'
            )}
          >
            <span className="size-2 rounded-full bg-current" />
            {event.status}
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Event Profile & Content Inspection (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Banner Card */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="relative h-56 sm:h-64 w-full">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block rounded-lg bg-blue-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold">
                  {isAr ? event.categoryAr || event.category : event.category}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black">
                  {isAr ? event.titleAr || event.title : event.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-200">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" /> {event.venue}, {event.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {isAr ? 'وصف الفعالية' : 'Event Description'}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isAr ? event.descriptionAr || event.description : event.description}
                </p>
              </div>

              {/* Ticket Tiers Inspection */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Ticket className="size-4 text-blue-600" />
                  {isAr ? 'فئات التذاكر والتسعير المعتمد' : 'Ticket Tiers & Capacity Audit'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">{tier.name}</span>
                        <span className="font-mono text-sm font-black text-blue-600">
                          EGP {tier.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Capacity: {tier.capacity} seats</span>
                        <span>Tier ID: {tier.id}</span>
                      </div>
                      {tier.perks && tier.perks.length > 0 && (
                        <div className="text-[10px] text-slate-600 border-t border-slate-200/60 pt-1.5">
                          {tier.perks.join(' · ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Agenda Audit */}
              {event.agenda.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                    {isAr ? 'جدول الأعمال والجلسات' : 'Agenda & Session Schedule'}
                  </h4>
                  <div className="space-y-2">
                    {event.agenda.map((ag) => (
                      <div
                        key={ag.id}
                        className="flex items-start gap-3 rounded-lg bg-slate-50 p-2.5 text-xs border border-slate-100"
                      >
                        <span className="font-mono font-bold text-blue-600 shrink-0">{ag.time}</span>
                        <span className="font-medium text-slate-800">{ag.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Safety, Compliance & Governance Decisions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Organizer Dossier */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <User className="size-4 text-blue-600" />
              {isAr ? 'جهة التنظيم' : 'Organizer Details'}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'الاسم:' : 'Name:'}</span>
                <span className="font-bold text-slate-800">{event.organizerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'البريد:' : 'Email:'}</span>
                <span className="font-mono text-slate-800 truncate max-w-[170px]">{event.organizerEmail}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{isAr ? 'تاريخ التقديم:' : 'Submitted:'}</span>
                <span className="font-mono text-slate-800">{event.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* AI Content & Safety Engine Audit */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sparkles className="size-4 text-indigo-600" />
              {isAr ? 'فحص الذكاء الاصطناعي والأمان' : 'AI Safety & Policy Scan'}
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-emerald-600" />
                  {isAr ? 'النص خالٍ من المحتوى المحظور' : 'Content Safety Pass'}
                </span>
                <span className="font-mono text-[10px] font-bold">100% CLEAN</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-emerald-600" />
                  {isAr ? 'تأكيد حجز القاعة والترخيص' : 'Venue & Permits Verified'}
                </span>
                <span className="font-mono text-[10px] font-bold">VALID</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="size-3.5 text-emerald-600" />
                  {isAr ? 'تسعير التذاكر يطابق الشروط' : 'Pricing Matrix Compliant'}
                </span>
                <span className="font-mono text-[10px] font-bold">OK</span>
              </div>
            </div>
          </div>

          {/* Governance Decision Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              {isAr ? 'قرار اعتماد الفعالية' : 'Moderation Verdict'}
            </h3>

            {showRejectBox && (
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-red-900">
                  {isAr ? 'ملاحظات رفض الفعالية (تصل للمنظم):' : 'Rejection Feedback for Organizer:'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isAr
                      ? 'وضح أسباب الرفض (مثل: عدم وجود تصريح، أسعار مضللة، نقص تفاصيل الأجندة...)'
                      : 'State explicit reasons why this event cannot be published...'
                  }
                  rows={3}
                  className="w-full rounded-xl border border-red-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleApprove}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <CheckCircle className="size-4" />
                <span>{isAr ? 'اعتماد ونشر في السوق (Approve & Publish)' : 'Approve & Publish Event'}</span>
              </button>

              <button
                onClick={() => {
                  if (!showRejectBox) {
                    setShowRejectBox(true);
                  } else {
                    handleReject();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition"
              >
                <XCircle className="size-3.5" />
                <span>
                  {showRejectBox
                    ? isAr ? 'تأكيد الرفض مع الملاحظات' : 'Confirm Rejection'
                    : isAr ? 'رفض مع إبداء ملاحظات' : 'Reject with Feedback'}
                </span>
              </button>

              <button
                onClick={handleSuspend}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                <AlertTriangle className="size-3.5 text-slate-500" />
                <span>{isAr ? 'إيقاف فوري (Emergency Suspend)' : 'Emergency Suspend'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
