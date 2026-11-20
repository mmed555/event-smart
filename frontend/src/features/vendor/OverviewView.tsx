import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Briefcase,
  TrendingUp,
  FileText,
  Star,
  DollarSign,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  MapPin,
  Plus,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

export const OverviewView: React.FC = () => {
  const {
    vendorProfile,
    vendorRfqs,
    vendorQuotations,
    vendorOrders,
    setActiveVendorTab,
    setSelectedVendorRfqId,
    setSelectedVendorOrderId,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const newRfqsCount = vendorRfqs.filter((r) => r.status === 'NEW').length;
  const pendingQuotesCount = vendorQuotations.filter((q) => q.status === 'PENDING').length;
  const activeOrdersCount = vendorOrders.filter((o) => o.status === 'IN_PROGRESS').length;

  return (
    <div className="space-y-6">
      {/* 1. Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute -end-10 -bottom-10 size-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute start-1/3 -top-10 size-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                {isAr ? 'الشركة معتمدة ونشطة في السوق' : 'Verified Vendor & Market Active'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5">
              <span>{isAr ? vendorProfile.nameAr : vendorProfile.name}</span>
              <ShieldCheck className="size-6 text-emerald-400 shrink-0" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr ? vendorProfile.taglineAr : vendorProfile.tagline}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => setActiveVendorTab('rfq-inbox')}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
            >
              <Sparkles className="size-4" />
              <span>{isAr ? 'استعراض الفرص الذكية (RFQs)' : 'Browse Matching RFQs'}</span>
            </button>
            <button
              onClick={() => setActiveVendorTab('services')}
              className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 px-4 py-2 text-xs font-bold transition backdrop-blur-sm"
            >
              <Plus className="size-4 text-blue-300" />
              <span>{isAr ? 'إدارة كتالوج الخدمات' : 'Manage Services'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metrics (5 KPIs) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* KPI 1: New RFQs */}
        <div
          onClick={() => setActiveVendorTab('rfq-inbox')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-md hover:border-blue-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'طلبات RFQ جديدة' : 'New RFQs'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition">
              <Briefcase className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{newRfqsCount}</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {isAr ? 'فرص متوافقة' : 'Active'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {isAr ? 'بانتظار تقديم عروض الأسعار' : 'Awaiting your proposal'}
          </p>
        </div>

        {/* KPI 2: Active Quotations */}
        <div
          onClick={() => setActiveVendorTab('my-quotes')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-md hover:border-indigo-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'عروض قيد المراجعة' : 'Active Quotes'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
              <FileText className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{pendingQuotesCount}</span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              {isAr ? 'مقدمة للمنظمين' : 'Pending'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {isAr ? 'معدل القبول 75%' : '75% win rate'}
          </p>
        </div>

        {/* KPI 3: Ongoing Orders */}
        <div
          onClick={() => setActiveVendorTab('orders')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-md hover:border-amber-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'عقود قيد التنفيذ' : 'Ongoing Orders'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{activeOrdersCount}</span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {isAr ? 'تشغيل حي' : 'In Progress'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {isAr ? 'متابعة مراحل التسليم' : 'Milestones on schedule'}
          </p>
        </div>

        {/* KPI 4: Rating */}
        <div
          onClick={() => setActiveVendorTab('reviews')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:shadow-md hover:border-amber-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'متوسط التقييم' : 'Organizer Rating'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition">
              <Star className="size-4 fill-current" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{vendorProfile.averageRating}</span>
            <span className="text-[10px] font-bold text-slate-600">/ 5.0</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {isAr ? `من إجمالي ${vendorProfile.totalReviews} تقييم` : `From ${vendorProfile.totalReviews} reviews`}
          </p>
        </div>

        {/* KPI 5: Total Revenue */}
        <div className="col-span-2 lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAr ? 'إجمالي العقود' : 'Total Pipeline'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <DollarSign className="size-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {(vendorProfile.totalEarnings / 1000).toLocaleString()}k
            </span>
            <span className="text-xs font-bold text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-semibold">
            {isAr ? '42 فعالية تم إنجازها' : '42 delivered projects'}
          </p>
        </div>
      </div>

      {/* 3. Two-Column Dashboard Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Recommended RFQ Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="size-5 text-[#2563EB]" />
                <span>{isAr ? 'أفضل الفرص المرشحة بالذكاء الاصطناعي (AI Matching)' : 'Top AI-Matched RFQ Opportunities'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'تم ترشيح هذه الطلبات بناءً على معداتك وموقعك وسجل تقييمك'
                  : 'Ranked by 6-factor AI matching engine against your equipment and capability'}
              </p>
            </div>
            <button
              onClick={() => setActiveVendorTab('rfq-inbox')}
              className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1"
            >
              <span>{isAr ? 'عرض الكل' : 'View All'}</span>
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            {vendorRfqs.slice(0, 2).map((rfq) => (
              <div
                key={rfq.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#2563EB] border border-blue-100">
                      <Sparkles className="size-3" />
                      <span>{rfq.aiMatchScore}% {isAr ? 'توافق' : 'Match'}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">{rfq.rfqCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="size-3.5 text-amber-500" />
                    <span>{isAr ? 'الموعد النهائي: 28 نوفمبر' : 'Deadline: Nov 28'}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 hover:text-[#2563EB] transition">
                    {isAr ? rfq.eventTitleAr : rfq.eventTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {isAr ? rfq.scopeDescriptionAr : rfq.scopeDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-slate-400" />
                    <span>{new Date(rfq.eventDate).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{rfq.eventCity}</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-900">
                    <DollarSign className="size-3.5 text-emerald-600" />
                    <span>{isAr ? 'الميزانية التقديرية:' : 'Max Budget:'} {rfq.estimatedBudgetMax.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                </div>

                {/* Match Reasons Pill */}
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <span className="font-bold text-slate-700 block">
                    {isAr ? '💡 أسباب الترشيح الذكي:' : '💡 AI Recommendation Factors:'}
                  </span>
                  <p className="text-slate-600">
                    {isAr ? rfq.matchReasonsAr[0] : rfq.matchReasons[0]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">
                    {isAr ? 'المنظم:' : 'Organizer:'} <strong className="text-slate-700">{rfq.organizerName}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedVendorRfqId(rfq.id);
                      setActiveVendorTab('rfq-inbox');
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-3.5 py-1.5 text-xs transition"
                  >
                    <span>{isAr ? 'معاينة وتقديم عرض' : 'Review & Submit Quote'}</span>
                    <ArrowRight className="size-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Active Service Orders Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="size-5 text-amber-500" />
              <span>{isAr ? 'متابعة مراحل التنفيذ' : 'Active Orders Progress'}</span>
            </h2>
            <button
              onClick={() => setActiveVendorTab('orders')}
              className="text-xs font-bold text-[#2563EB] hover:text-blue-700"
            >
              {isAr ? 'العقود' : 'All Orders'}
            </button>
          </div>

          <div className="space-y-3">
            {vendorOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => {
                  setSelectedVendorOrderId(order.id);
                  setActiveVendorTab('orders');
                }}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-soft hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">{order.orderNumber}</span>
                  <span
                    className={clsx(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full',
                      order.status === 'IN_PROGRESS'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    )}
                  >
                    {isAr
                      ? order.status === 'IN_PROGRESS'
                        ? 'جاري العمل'
                        : 'مكتمل'
                      : order.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {isAr ? order.eventTitleAr : order.eventTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{order.venueCity}</p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">{isAr ? 'نسبة الإنجاز:' : 'Completion:'}</span>
                    <span className="font-bold font-mono text-slate-900">{order.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${order.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-500">
                    {order.milestones.filter((m) => m.isCompleted).length} / {order.milestones.length}{' '}
                    {isAr ? 'مراحل منجزة' : 'milestones'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {order.contractValue.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Reputation Box */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Star className="size-4 text-amber-500 fill-current" />
                <span>{isAr ? 'سمعة الشركة لدى المنظمين' : 'Reputation & Trust Score'}</span>
              </h4>
              <span className="text-xs font-bold text-emerald-600">99% {isAr ? 'التزام' : 'On-time'}</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {isAr
                ? 'تحافظ الشركة على تقييم 4.9 ومعدل تسليم في الموعد 99%، مما يمنحك أولوية الظهور في مطابقة الذكاء الاصطناعي.'
                : 'Your 4.9 rating and 99% on-time completion gives you priority ranking in the AI matching engine.'}
            </p>
            <button
              onClick={() => setActiveVendorTab('reviews')}
              className="w-full rounded-xl bg-white border border-slate-200 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              {isAr ? 'استعراض جميع التقييمات' : 'View All Reviews'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
