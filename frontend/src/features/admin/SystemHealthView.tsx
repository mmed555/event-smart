import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Server,
  Cpu,
  QrCode,
  Database,
  CheckCircle,
  Zap,
  TrendingUp,
  HardDrive,
  Activity,
  Layers,
  Clock,
  ShieldCheck,
  RefreshCw,
  Lock,
  Gauge,
  Wifi,
} from 'lucide-react';
import clsx from 'clsx';

export const SystemHealthView: React.FC = () => {
  const { adminMetrics } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Mock live telemetry events
  const liveTelemetryLogs = [
    {
      id: 'TEL-101',
      time: '21:30:42',
      type: 'gate',
      titleEn: 'Gate Ingress Anti-Replay Verification',
      titleAr: 'تحقق بوابات الدخول ومكافحة التكرار',
      status: 'success',
      latency: '24ms',
      detailEn: 'Ticket #TCK-8812 verified atomically. Status -> USED. Replay prevention locked.',
      detailAr: 'تم مسح التذكرة TCK-8812 ذرياً. تم التحويل إلى USED وتأمين منع التكرار.',
    },
    {
      id: 'TEL-102',
      time: '21:30:15',
      type: 'ai',
      titleEn: 'FastAPI Intent Extraction Pipeline',
      titleAr: 'استخراج متطلبات واستفسارات بالذكاء الاصطناعي',
      status: 'success',
      latency: '112ms',
      detailEn: 'Processed conversational query "حجز تذكرة مؤتمر الذكاء الاصطناعي". Slots: [event_type, qty]. Confidence: 96.2%',
      detailAr: 'معالجة استفسار المحادثة باللغة العربية. استخراج الأبعاد بدقة 96.2% ووضع مقترح استشاري.',
    },
    {
      id: 'TEL-103',
      time: '21:29:50',
      type: 'db',
      titleEn: 'Prisma Connection Pool Health Check',
      titleAr: 'فحص دوري لمجمع اتصالات قاعدة البيانات MySQL',
      status: 'success',
      latency: '3ms',
      detailEn: '18 active connections healthy. 0 leaked connections. Pool utilization at 28%.',
      detailAr: '18 اتصال نشط بحالة ممتازة. لا توجد اتصالات معلقة، استهلاك المجمع 28%.',
    },
    {
      id: 'TEL-104',
      time: '21:28:30',
      type: 'cache',
      titleEn: 'Redis Cache Hit Rate Sync',
      titleAr: 'تزامن الذاكرة المخبأة المؤقتة Redis',
      status: 'success',
      latency: '0.4ms',
      detailEn: 'Categories and active events keys synced. Cache hit ratio maintained at 94.6%.',
      detailAr: 'تحديث بيانات التصنيفات والفعاليات النشطة. نسبة إصابة الذاكرة 94.6%.',
    },
    {
      id: 'TEL-105',
      time: '21:26:10',
      type: 'security',
      titleEn: 'KYC Vault Encrypted Access Audit',
      titleAr: 'تدقيق الأمان المشفر لمستندات التوثيق',
      status: 'success',
      latency: '12ms',
      detailEn: 'Commercial register document accessed by Super Admin. Vault token verified.',
      detailAr: 'الوصول لمستند السجل التجاري بواسطة المشرف العام. توثيق الرمز المشفر بنجاح.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Master System Status Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shadow-xs">
            <Activity className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                {isAr ? 'حالة المنظومة والخدمات الأساسية' : 'System Operational State & Cluster Pulse'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                {isAr ? 'كافة الخدمات تعمل بكفاءة' : 'ALL 6 CORE ENGINES HEALTHY'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'مراقبة حية للبنية التحتية، قواعد البيانات MySQL، محرك الذكاء الاصطناعي، وبوابات الدخول'
                : 'Real-time telemetry across Core Modular Monolith, Python FastAPI AI, MySQL 8.0, and Socket.IO'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <RefreshCw className={clsx('size-3.5', isRefreshing && 'animate-spin text-blue-600')} />
            <span>{isAr ? 'تحديث القياسات' : 'Refresh Metrics'}</span>
          </button>
        </div>
      </div>

      {/* 2. 8 Comprehensive Telemetry KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* API Gateway */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'استجابة الـ API' : 'REST API Latency'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Server className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">
              {adminMetrics.apiLatencyMs} ms
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="size-3" />
              <span>{adminMetrics.apiSuccessRate}% success rate</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '99.9%' }} />
          </div>
        </div>

        {/* Python AI Microservice */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'خدمة الذكاء الاصطناعي' : 'Python AI Service'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Cpu className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">
              {adminMetrics.aiLatencyMs} ms
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 mt-1">
              <Zap className="size-3" />
              <span>Uptime: {adminMetrics.aiUptimePercent}% (FastAPI)</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '98%' }} />
          </div>
        </div>

        {/* Gate QR Verification */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'سرعة بوابات الـ QR' : 'Gate Verify Latency'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <QrCode className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">
              0.29 s
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-purple-600 mt-1">
              <CheckCircle className="size-3" />
              <span>SLA Target: &lt; 1.0s (Anti-Replay)</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '30%' }} />
          </div>
        </div>

        {/* Database & Pool */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'قواعد البيانات والذاكرة' : 'DB Pool & Memory'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Database className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">
              {adminMetrics.dbPoolUsagePercent}% <span className="text-xs text-slate-400 font-normal">Pool</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mt-1">
              <HardDrive className="size-3" />
              <span>RAM: {adminMetrics.memoryUsagePercent}% utilized</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '44%' }} />
          </div>
        </div>

        {/* Redis Cache Hit Rate */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'الذاكرة المؤقتة Redis' : 'Redis Cache Hits'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Zap className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">94.6%</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <CheckCircle className="size-3" />
              <span>0.4ms average retrieval</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '94.6%' }} />
          </div>
        </div>

        {/* WebSocket Concurrency */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'قنوات الـ Socket.IO' : 'Live Gate Sockets'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Wifi className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">
              {adminMetrics.activeGateSockets} <span className="text-xs text-slate-400 font-normal">gates</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-700 mt-1">
              <Activity className="size-3" />
              <span>{adminMetrics.gateThroughputPerMin} scans/min peak</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-600 h-1.5 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Server CPU Load */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'حمل المعالج (CPU Load)' : 'Server CPU Load'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
              <Gauge className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">18.2%</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="size-3" />
              <span>Optimal load distribution</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-slate-800 h-1.5 rounded-full" style={{ width: '18.2%' }} />
          </div>
        </div>

        {/* KYC Document Security Vault */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'خزينة وثائق التوثيق' : 'KYC Vault Security'}
            </span>
            <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Lock className="size-4" />
            </div>
          </div>
          <div>
            <div className="font-mono text-2xl font-black text-slate-900">100%</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <ShieldCheck className="size-3" />
              <span>Encrypted & Zero Public URLs</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>

      {/* 3. Subsystem Topology & Architecture Services Table */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="size-4 text-blue-600" />
              <span>{isAr ? 'مصفوفة الخدمات المصغرة ومكونات البنية التحتية' : 'Platform Subsystem Matrix & Topology'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr
                ? 'متابعة المنافذ المحلية، بروتوكولات الربط، وحالة كل خدمة في البيئة'
                : 'Local ports, endpoints, protocols, and real-time operational status'}
            </p>
          </div>
          <span className="font-mono text-[11px] font-bold text-slate-500">Node.js Monolith + FastAPI AI</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">{isAr ? 'الخدمة / المكون' : 'Subsystem'}</th>
                <th className="px-4 py-3">{isAr ? 'المسار / المنفذ' : 'Port / Base URI'}</th>
                <th className="px-4 py-3">{isAr ? 'البروتوكول والتقنية' : 'Tech Stack'}</th>
                <th className="px-4 py-3">{isAr ? 'زمن الاستجابة' : 'Latency'}</th>
                <th className="px-4 py-3">{isAr ? 'الحالة الحالية' : 'Health Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  nameEn: 'Core Backend Modular Monolith',
                  nameAr: 'الخادم الخلفي المركزي (Modular Monolith)',
                  port: 'http://localhost:5000/api/v1',
                  tech: 'Node.js 20.x · Express · TypeScript',
                  latency: `${adminMetrics.apiLatencyMs} ms`,
                  status: 'HEALTHY',
                  roleBadge: 'Authority',
                },
                {
                  nameEn: 'Python AI Intelligence Microservice',
                  nameAr: 'محرك الذكاء الاصطناعي (FastAPI)',
                  port: 'http://localhost:8000/internal/v1',
                  tech: 'Python 3.11 · FastAPI · Pydantic',
                  latency: `${adminMetrics.aiLatencyMs} ms`,
                  status: 'HEALTHY',
                  roleBadge: 'Advisory Only (ADR-0002)',
                },
                {
                  nameEn: 'Relational Database (MySQL 8.0)',
                  nameAr: 'قاعدة البيانات العلائقية (MySQL 8.0)',
                  port: 'localhost:3306 (3NF / 6 Domains)',
                  tech: 'MySQL 8.0+ · Prisma ORM',
                  latency: '4 ms',
                  status: 'HEALTHY',
                  roleBadge: '18 / 64 Conns',
                },
                {
                  nameEn: 'Real-Time Gate Sync & Attendance',
                  nameAr: 'بوابة التزامن اللحظي للبوابات',
                  port: 'ws://localhost:5000/socket.io',
                  tech: 'Socket.IO · WebSocket Engine',
                  latency: '18 ms',
                  status: 'HEALTHY',
                  roleBadge: '14 Active Gates',
                },
                {
                  nameEn: 'Mock Sandbox Payment Adapter',
                  nameAr: 'محول بوابة الدفع التجريبي (Phase 1)',
                  port: 'Mock Pipeline (/api/v1/checkout)',
                  tech: 'Sandbox Adapter (Stripe/Paymob ready)',
                  latency: '650 ms',
                  status: 'READY',
                  roleBadge: 'Mock Mode',
                },
                {
                  nameEn: 'KYC Document Vault & Protected Storage',
                  nameAr: 'خزينة وثائق السجلات والبطاقات الضريبية',
                  port: 'Internal Encrypted Vault',
                  tech: 'Restricted Storage · Zero Public URLs',
                  latency: '12 ms',
                  status: 'SECURE',
                  roleBadge: 'Isolated Storage',
                },
              ].map((srv, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{isAr ? srv.nameAr : srv.nameEn}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{srv.nameEn}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{srv.port}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{srv.tech}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{srv.latency}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        <CheckCircle className="size-3" />
                        {srv.status}
                      </span>
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 font-bold">
                        {srv.roleBadge}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Anti-Replay Gate Status & AI Governance Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anti-Replay Gate Operations Detail */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <QrCode className="size-4 text-blue-600" />
              <span>{isAr ? 'بنية التحقق الفوري ومنع التكرار (Anti-Replay Gate)' : 'Real-time Gate & Anti-Replay Architecture'}</span>
            </h3>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold font-mono text-blue-700">
              WebSocket Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'البوابات المتصلة حالياً:' : 'Active Gate Sockets:'}</span>
              <span className="font-mono font-bold text-slate-900">{adminMetrics.activeGateSockets} gates online</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'إجمالي عمليات المسح اليوم:' : 'Total Scans Processed Today:'}</span>
              <span className="font-mono font-bold text-blue-600">{adminMetrics.totalCheckinsToday.toLocaleString()} scans</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'معدل التزامن اللحظي عبر Socket.IO:' : 'Throughput Rate:'}</span>
              <span className="font-mono font-bold text-slate-900">{adminMetrics.gateThroughputPerMin} scans / min</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'محاولات تكرار التذاكر المرفوضة:' : 'Replay Duplicates Rejected:'}</span>
              <span className="font-mono font-bold text-emerald-600">0 Replays Permitted (100% Atomic Blocked)</span>
            </div>
          </div>
        </div>

        {/* Golden Rule of AI Governance (ADR-0002) */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Cpu className="size-4 text-indigo-600" />
              <span>{isAr ? 'حوكمة الذكاء الاصطناعي (ADR-0002 Advisory)' : 'AI Intelligence Microservice (ADR-0002)'}</span>
            </h3>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold font-mono text-indigo-700">
              Strict Advisory Mode
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'دقة استخراج المتطلبات (Intent & Slot Extraction):' : 'Slot Extraction Accuracy:'}</span>
              <span className="font-mono font-bold text-indigo-600">{adminMetrics.aiExtractionAccuracy}%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'حالة محرك التراجع التلقائي (Fallback Engine):' : 'Fallback Engine Status:'}</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="size-3.5" /> Standby (Keyword SQL)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'حد العزل والتأكيد البشري الإلزامي:' : 'Enforcement Authority Boundary:'}</span>
              <span className="font-bold text-slate-800">Node.js Core Backend + User Confirmation</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'متوسط استهلاك الرموز (Tokens/req):' : 'Avg Token Consumption:'}</span>
              <span className="font-mono font-bold text-slate-900">420 tokens / query</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Live Telemetry & System Operations Log Stream */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Clock className="size-4 text-slate-700" />
              <span>{isAr ? 'سجل الأحداث والعمليات الحية (Live Telemetry Stream)' : 'Live Operational Event Stream'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isAr ? 'سجل لحظي بالعمليات المنفذة عبر البوابات وقاعدة البيانات والذكاء الاصطناعي' : 'Real-time telemetry event stream across gate scans, AI queries, and DB pools'}
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 border border-emerald-200">
            Real-Time Stream
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {liveTelemetryLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-slate-50/50 rounded-xl px-2 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">{log.time}</span>
                  <span className="font-mono text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 rounded">
                    {log.id}
                  </span>
                  <span className="font-bold text-slate-800">
                    {isAr ? log.titleAr : log.titleEn}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  {isAr ? log.detailAr : log.detailEn}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="font-mono text-[10px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">
                  {log.latency}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <CheckCircle className="size-2.5" />
                  OK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};