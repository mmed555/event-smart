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
  Activity,
  Radio,
  Settings,
  Sparkles,
  BadgeCheck,
  Layers,
  UserPlus,
} from 'lucide-react';
import clsx from 'clsx';

export const OverviewView: React.FC = () => {
  const {
    adminKycQueue,
    adminEventsQueue,
    adminDisputes,
    adminUsers,
    adminMetrics,
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
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-lg border border-slate-800">
        <div className="absolute -end-10 -bottom-10 size-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute start-1/3 -top-10 size-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                {isAr ? 'المنظومة متصلة وتعمل بكفاءة' : 'System Operational & Live'}
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

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>{isAr ? 'مرحباً بك مجدداً، المشرف العام' : 'Welcome back, Super Administrator'}</span>
              <BadgeCheck className="size-6 text-blue-400 shrink-0" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'لوحة القيادة والمراقبة المركزية لمنصة Smart Event — متابعة حية لجميع قطاعات الحضور، المنظمين، شركات التنفيذ، وبوابات الدخول ومحرك الذكاء الاصطناعي.'
                : 'Centralized Governance & Operations suite for Smart Event — Live telemetry across Attendees, Organizers, B2B Vendors, Gate Ingress, and AI Microservices.'}
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => setActiveAdminTab('users')}
              className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-xs font-bold transition shadow-sm"
            >
              <UserPlus className="size-4" />
              <span>{isAr ? 'إدارة وإضافة مستخدمين' : 'Manage & Add Users'}</span>
            </button>
            <button
              onClick={() => setActiveAdminTab('system-health')}
              className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 px-4 py-2 text-xs font-bold transition backdrop-blur-sm"
            >
              <Activity className="size-4 text-emerald-400" />
              <span>{isAr ? 'صحة المنظومة والشبكة' : 'System Health Monitor'}</span>
            </button>
          </div>
        </div>

        {/* Live Mini Stats Ribbon */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-400 text-[11px] font-medium">{isAr ? 'المستخدمون المسجلون' : 'Active Users'}</div>
            <div className="font-mono text-lg font-black text-white mt-0.5">{adminUsers.length.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] font-medium">{isAr ? 'طلبات التحقق المعلقة' : 'Pending Verification'}</div>
            <div className="font-mono text-lg font-black text-amber-400 mt-0.5">{pendingKyc.length} {isAr ? 'شركات' : 'Vendors'}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] font-medium">{isAr ? 'فعاليات قيد المراجعة' : 'Pending Events'}</div>
            <div className="font-mono text-lg font-black text-blue-400 mt-0.5">{pendingEvents.length} {isAr ? 'فعالية' : 'Events'}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px] font-medium">{isAr ? 'سرعة بوابات الـ QR' : 'Gate Verify Speed'}</div>
            <div className="font-mono text-lg font-black text-emerald-400 mt-0.5">0.29s (SLA &lt; 1s)</div>
          </div>
        </div>
      </div>

      {/* 2. Critical Action Banner (if pending items exist) */}
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
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-red-200/80 shadow-xs hover:border-red-300 transition text-start group"
            >
              <div>
                <div className="font-mono text-xl font-black text-red-700">
                  {pendingEvents.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'اعتمادات الفعاليات' : 'Pending Event Reviews'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[180px]">
                  {pendingEvents[0]?.title ? `Latest: ${pendingEvents[0].title}` : 'Queue ready'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-red-600 transition shrink-0" />
            </button>

            {/* Pending KYC Button */}
            <button
              onClick={() => setActiveAdminTab('kyc-queue')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs hover:border-amber-300 transition text-start group"
            >
              <div>
                <div className="font-mono text-xl font-black text-amber-700">
                  {pendingKyc.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'توثيق الشركات' : 'Vendor KYC Reviews'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[180px]">
                  {pendingKyc[0]?.companyName ? `Latest: ${pendingKyc[0].companyName}` : 'Queue ready'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-amber-600 transition shrink-0" />
            </button>

            {/* Open Complaints Button */}
            <button
              onClick={() => setActiveAdminTab('disputes')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition text-start group"
            >
              <div>
                <div className="font-mono text-xl font-black text-slate-900">
                  {openDisputes.length}
                </div>
                <div className="text-xs font-bold text-slate-800">
                  {isAr ? 'النزاعات والشكاوى' : 'Open Disputes & SLA'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-[180px]">
                  {openDisputes[0]?.title ? `Latest: ${openDisputes[0].title}` : 'Arbitration clear'}
                </div>
              </div>
              <ChevronRight className="size-4 text-slate-400 group-hover:text-slate-900 transition shrink-0" />
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

      {/* 3. Primary Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-blue-200 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'المستخدمون' : 'Users'}</span>
            <Users className="size-4 text-blue-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">{adminUsers.length.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <TrendingUp className="size-3" /> +9.1% {isAr ? 'هذا الشهر' : 'mo.'}
          </div>
        </div>

        {/* Total Events */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-indigo-200 transition">
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
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-cyan-200 transition">
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
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-purple-200 transition">
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
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-emerald-200 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">{isAr ? 'المبيعات' : 'Revenue'}</span>
            <DollarSign className="size-4 text-emerald-600" />
          </div>
          <div className="font-mono text-xl font-black text-slate-900">1.84M</div>
          <div className="text-[10px] font-mono font-bold text-slate-500">EGP Volume</div>
        </div>

        {/* Open Complaints */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs space-y-2 hover:border-red-200 transition">
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

      {/* 4. EXPANDED COMPREHENSIVE SECTOR STATISTICS (إحصائيات لكل قطاعات النظام) */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="size-4 text-blue-600" />
              <span>{isAr ? 'إحصائيات ومؤشرات الأداء لكافة قطاعات المنظومة' : 'Cross-System Operational Telemetry by Domain'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'تحليل مباشر لتدفقات الحضور، المنظمين، شركات التنفيذ، والذكاء الاصطناعي'
                : 'Direct telemetry across Attendee Ticketing, Event Organizing, B2B Logistics, and AI Engine'}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-mono font-bold text-slate-600 self-start sm:self-auto">
            Live Synchronization (Socket.IO)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sector 1: Attendee & Ticketing */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Ticket className="size-3.5 text-cyan-600" />
                {isAr ? 'قطاع التذاكر والجمهور' : 'Ticketing & Audience'}
              </span>
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
                8,214 {isAr ? 'مستخدم' : 'Users'}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'إجمالي التذاكر الصادرة:' : 'Total Issued Tickets:'}</span>
                <span className="font-mono font-bold text-slate-900">18,420</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'معدل الحضور الفعلي:' : 'Gate Attendance Rate:'}</span>
                <span className="font-mono font-bold text-emerald-600">88.4%</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'متوسط سعر التذكرة:' : 'Avg Ticket Price:'}</span>
                <span className="font-mono font-bold text-slate-900">154 EGP</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'تذاكر مستردة:' : 'Refunded Tickets:'}</span>
                <span className="font-mono font-bold text-slate-500">42 (0.2%)</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-600 h-1.5 rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          {/* Sector 2: Organizers & Events */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Calendar className="size-3.5 text-indigo-600" />
                {isAr ? 'منظمو الفعاليات' : 'Organizers & Events'}
              </span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                148 {isAr ? 'فعالية' : 'Events'}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'منظمون معتمدون:' : 'Verified Organizers:'}</span>
                <span className="font-mono font-bold text-slate-900">312</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'فعاليات منشورة حالياً:' : 'Active Published:'}</span>
                <span className="font-mono font-bold text-emerald-600">42</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'فعاليات منتهية بنجاح:' : 'Completed Events:'}</span>
                <span className="font-mono font-bold text-slate-900">96</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'فعاليات قيد المراجعة:' : 'Under Review Queue:'}</span>
                <span className="font-mono font-bold text-amber-600">{pendingEvents.length}</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '74%' }} />
            </div>
          </div>

          {/* Sector 3: B2B Vendors & Logistics */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Building className="size-3.5 text-purple-600" />
                {isAr ? 'سوق الموردين والـ RFQ' : 'B2B Vendors & RFQ'}
              </span>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                46 {isAr ? 'شركة' : 'Vendors'}
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'طلبات عروض نشطة (RFQs):' : 'Active RFQ Requests:'}</span>
                <span className="font-mono font-bold text-slate-900">68</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'عروض أسعار مقدمة:' : 'Quotes Submitted:'}</span>
                <span className="font-mono font-bold text-purple-600">342</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'عقود تنفيذ مكتملة:' : 'Contracts Awarded:'}</span>
                <span className="font-mono font-bold text-emerald-600">89</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'متوسط سرعة الرد:' : 'Avg Response SLA:'}</span>
                <span className="font-mono font-bold text-slate-900">4.2h</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          {/* Sector 4: AI Microservice & Gate Ingress */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-blue-600" />
                {isAr ? 'الذكاء الاصطناعي والبوابات' : 'AI & Gate Ingress'}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                99.98% SLA
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'استشارات الذكاء الاصطناعي:' : 'AI Suggestions Count:'}</span>
                <span className="font-mono font-bold text-indigo-600">24,810</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'دقة استخراج المتطلبات:' : 'Slot Extraction Rate:'}</span>
                <span className="font-mono font-bold text-emerald-600">94.6%</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'مسح تذاكر اليوم:' : 'Total Scans Today:'}</span>
                <span className="font-mono font-bold text-slate-900">{adminMetrics.totalCheckinsToday.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>{isAr ? 'محاولات تكرار ممنوعة:' : 'Replays Blocked:'}</span>
                <span className="font-mono font-bold text-slate-900">0 (Anti-Replay)</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '99%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. Analytics & Distribution Snapshot */}
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
              <span>{isAr ? 'تفاصيل الأداء وصحة المنظومة' : 'Detailed Telemetry'}</span>
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
              {isAr ? 'إدارة التصنيفات' : 'Taxonomy'}
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

      {/* 6. Quick Access Matrix */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900">
          {isAr ? 'أقسام ووحدات الحوكمة السريعة' : 'Governance Modules Directory'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { id: 'overview', title: isAr ? 'لوحة القيادة المركزية' : 'Platform Overview', icon: Shield },
            { id: 'users', title: isAr ? 'إدارة المستخدمين' : 'Users Management', icon: Users },
            { id: 'kyc-queue', title: isAr ? 'طابور توثيق الشركات' : 'Vendor KYC Queue', icon: Building },
            { id: 'events-queue', title: isAr ? 'طابور مراجعة الفعاليات' : 'Events Queue', icon: Calendar },
            { id: 'categories', title: isAr ? 'التصنيفات والهيكل' : 'Categories Taxonomy', icon: Activity },
            { id: 'disputes', title: isAr ? 'الشكاوى والنزاعات' : 'Disputes Center', icon: ShieldAlert },
            { id: 'system-health', title: isAr ? 'الأداء وصحة النظام' : 'System Health', icon: Activity },
            { id: 'broadcast', title: isAr ? 'بث الإشعارات' : 'Broadcast Center', icon: Radio },
            { id: 'settings', title: isAr ? 'الإعدادات والسياسات' : 'System Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveAdminTab(item.id as any)}
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition text-start group"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition text-slate-700">
                  <Icon className="size-4" />
                </div>
                <div>
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