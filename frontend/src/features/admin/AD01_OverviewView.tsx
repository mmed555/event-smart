import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Users,
  Calendar,
  Building,
  Ticket,
  DollarSign,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Shield,
  ShieldAlert,
  ChevronRight,
  Clock,
  Activity,
  Radio,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';

export const AD01_OverviewView: React.FC = () => {
  const {
    adminKycQueue,
    adminEventsQueue,
    adminDisputes,
    setActiveAdminTab,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const pendingEvents = adminEventsQueue.filter((e) => e.status === 'PendingApproval');
  const pendingKyc = adminKycQueue.filter((k) => k.status === 'PENDING');
  const openDisputes = adminDisputes.filter((d) => d.status === 'Open');

  const totalActionNeeded = pendingEvents.length + pendingKyc.length + openDisputes.length;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Shield className="size-6 text-slate-900" />
            {isAr ? 'AD01 — لوحة القيادة المركزية والمؤشرات (Super Admin)' : 'AD01 — Platform Overview & Governance Dashboard'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'متابعة العمليات اليومية، طوابير التدقيق والاعتماد، ومؤشرات نمو المنصة الحية'
              : 'Central command for executive governance, live verification queues, and marketplace health'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'المشرف العام · نشط' : 'Super Admin Active'}</span>
          </span>
        </div>
      </div>

      {/* Critical Action Banner */}
      {totalActionNeeded > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50/90 via-amber-50/60 to-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                <AlertCircle className="size-4" />
              </div>
              <div>
                <h3 className="font-black text-sm text-red-950">
                  {isAr ? 'إجراءات عاجلة بانتظار قرار المشرف' : 'Action Required on Governance Queues'}
                </h3>
                <p className="text-xs text-red-700">
                  {isAr
                    ? `${totalActionNeeded} طلبات تتطلب التحقق والاعتماد لضمان استمرار عمليات المنظومة`
                    : `${totalActionNeeded} pending items require human administrative audit`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pending Events Button */}
            <button
              onClick={() => setActiveAdminTab('events-queue')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-red-200/80 shadow-xs hover:border-red-300 transition text-left group"
            >
              <div>
                <div className="font-mono text-xl font-black text-red-700">
                  {pendingEvents.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'اعتمادات الفعاليات AD06' : 'Pending Event Reviews'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {pendingEvents[0]?.title ? `Latest: ${pendingEvents[0].title.slice(0, 22)}...` : 'Queue ready'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-red-600 transition" />
            </button>

            {/* Pending KYC Button */}
            <button
              onClick={() => setActiveAdminTab('kyc-queue')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 transition text-left group"
            >
              <div>
                <div className="font-mono text-xl font-black text-amber-700">
                  {pendingKyc.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'توثيق الشركات AD04' : 'Vendor KYC Reviews'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {pendingKyc[0]?.companyName ? `Latest: ${pendingKyc[0].companyName}` : 'Queue ready'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-amber-600 transition" />
            </button>

            {/* Open Complaints Button */}
            <button
              onClick={() => setActiveAdminTab('disputes')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition text-left group"
            >
              <div>
                <div className="font-mono text-xl font-black text-slate-900">
                  {openDisputes.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'النزاعات والشكاوى AD09' : 'Open Disputes & SLA'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {openDisputes[0]?.title ? `Latest: ${openDisputes[0].title.slice(0, 22)}...` : 'Arbitration clear'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-slate-900 transition" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <CheckCircle className="size-5 text-emerald-600 shrink-0" />
          <span>
            {isAr
              ? 'كافة طوابير المراجعة خالية! لا توجد طلبات معلقة تتطلب التدخل حالياً.'
              : 'All moderation queues clear! No pending approvals or open disputes need attention.'}
          </span>
        </div>
      )}

      {/* 6 Key Performance Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'المستخدمون' : 'Users'}</span>
            <Users className="size-4 text-blue-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">8,214</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="size-3" /> +9.1% {isAr ? 'هذا الشهر' : 'mo.'}
          </div>
        </div>

        {/* Total Events */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'الفعاليات' : 'Events'}</span>
            <Calendar className="size-4 text-indigo-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">148</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="size-3" /> +12.0% {isAr ? 'نشط' : 'active'}
          </div>
        </div>

        {/* Total Bookings */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'الحجوزات' : 'Bookings'}</span>
            <Ticket className="size-4 text-cyan-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">11,930</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="size-3" /> +15.3%
          </div>
        </div>

        {/* Verified Vendors */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'الشركات' : 'Vendors'}</span>
            <Building className="size-4 text-purple-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">46</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle className="size-3" /> 100% KYC
          </div>
        </div>

        {/* Platform Gross Revenue */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'المبيعات' : 'Revenue'}</span>
            <DollarSign className="size-4 text-emerald-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">1.84M</div>
          <div className="text-[10px] font-mono font-bold text-slate-500">EGP Volume</div>
        </div>

        {/* Open Complaints */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'الشكاوى' : 'Disputes'}</span>
            <ShieldAlert className="size-4 text-red-600" />
          </div>
          <div className="font-mono text-xl font-black text-red-600">{openDisputes.length}</div>
          <div className="text-[10px] font-bold text-red-600">
            {openDisputes.length > 0 ? (isAr ? 'يتطلب تدخلاً' : 'Needs Action') : (isAr ? 'مستقر' : 'Clear')}
          </div>
        </div>
      </div>

      {/* Analytics & Distribution Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Growth Visual Curve Simulation (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {isAr ? 'نمو المنظومة (المستخدمون وحجوزات التذاكر)' : 'Platform Marketplace Growth'}
              </h3>
              <p className="text-xs text-slate-500">Monthly cumulative user registrations and ticket sales</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="size-2 rounded-full bg-blue-600" /> Users
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="size-2 rounded-full bg-indigo-500" /> Bookings
              </span>
            </div>
          </div>

          {/* Bar Chart Bars */}
          <div className="pt-6 grid grid-cols-8 gap-2 items-end h-44 border-b border-slate-100 pb-2">
            {[
              { m: 'Jul', u: 25, b: 18 },
              { m: 'Aug', u: 35, b: 28 },
              { m: 'Sep', u: 45, b: 40 },
              { m: 'Oct', u: 58, b: 52 },
              { m: 'Nov', u: 70, b: 65 },
              { m: 'Dec', u: 82, b: 78 },
              { m: 'Jan', u: 92, b: 89 },
              { m: 'Feb', u: 100, b: 96 },
            ].map((col) => (
              <div key={col.m} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  <div
                    style={{ height: `${col.u}%` }}
                    className="w-2.5 sm:w-3.5 bg-blue-600 rounded-t-sm group-hover:bg-blue-700 transition"
                  />
                  <div
                    style={{ height: `${col.b}%` }}
                    className="w-2.5 sm:w-3.5 bg-indigo-500 rounded-t-sm group-hover:bg-indigo-600 transition"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">{col.m}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Baseline: Q3 2025</span>
            <button
              onClick={() => setActiveAdminTab('system-health')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>{isAr ? 'تفاصيل الأداء AD10' : 'Detailed Telemetry'}</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Categories Distribution (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              {isAr ? 'توزيع الفعاليات حسب التصنيف' : 'Active Events by Category'}
            </h3>
            <button
              onClick={() => setActiveAdminTab('categories')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              {isAr ? 'إدارة AD08' : 'Taxonomy'}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { name: 'Technology & AI', count: 42, color: 'bg-blue-600', percent: '38%' },
              { name: 'Business & Finance', count: 28, color: 'bg-slate-900', percent: '25%' },
              { name: 'Music & Concerts', count: 24, color: 'bg-purple-600', percent: '21%' },
              { name: 'Design & Creative', count: 19, color: 'bg-pink-600', percent: '17%' },
              { name: 'Health & Sports', count: 11, color: 'bg-emerald-600', percent: '10%' },
            ].map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{cat.name}</span>
                  <span className="font-mono text-slate-900">{cat.count} events</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={clsx(cat.color, 'h-2 rounded-full')}
                    style={{ width: cat.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Matrix (12 screens) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900">
          {isAr ? 'الوصول السريع لشاشات الحوكمة الـ 12 (Screen Directory AD01 - AD12)' : 'Governance Modules Directory (AD01 — AD12)'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'overview', code: 'AD01', title: isAr ? 'لوحة القيادة المركزية' : 'Platform Overview', icon: Shield },
            { id: 'users', code: 'AD02', title: isAr ? 'إدارة المستخدمين' : 'Users Management', icon: Users },
            { id: 'kyc-queue', code: 'AD04', title: isAr ? 'طابور توثيق الشركات' : 'Vendor KYC Queue', icon: Building },
            { id: 'kyc-review', code: 'AD05', title: isAr ? 'فاحص مستندات KYC' : 'KYC Reviewer', icon: CheckCircle },
            { id: 'events-queue', code: 'AD06', title: isAr ? 'طابور الفعاليات' : 'Events Queue', icon: Calendar },
            { id: 'event-review', code: 'AD07', title: isAr ? 'اعتماد ونشر الفعالية' : 'Event Moderation', icon: Clock },
            { id: 'categories', code: 'AD08', title: isAr ? 'التصنيفات والهيكل' : 'Categories Taxonomy', icon: Activity },
            { id: 'disputes', code: 'AD09', title: isAr ? 'الشكاوى والنزاعات' : 'Disputes Center', icon: ShieldAlert },
            { id: 'system-health', code: 'AD10', title: isAr ? 'الأداء وصحة النظام' : 'System Health', icon: Activity },
            { id: 'broadcast', code: 'AD11', title: isAr ? 'بث الإشعارات' : 'Broadcast Center', icon: Radio },
            { id: 'settings', code: 'AD12', title: isAr ? 'الإعدادات والسياسات' : 'System Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.code}
                onClick={() => setActiveAdminTab(item.id as any)}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition text-left group"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition text-slate-700">
                  <Icon className="size-4" />
                </div>
                <div>
                  <span className="block font-mono text-[10px] font-bold text-blue-600">
                    {item.code}
                  </span>
                  <span className="block text-xs font-bold text-slate-800 leading-tight">
                    {item.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
