import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  Activity,
  Server,
  Cpu,
  QrCode,
  Database,
  CheckCircle,
  Zap,
  TrendingUp,
  HardDrive,
} from 'lucide-react';

export const AD10_SystemHealthView: React.FC = () => {
  const { adminMetrics } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Activity className="size-6 text-blue-600" />
            {isAr ? 'AD10 — تحليلات الأداء التقني وصحة المنظومة' : 'AD10 — System Health & Telemetry'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'مراقبة حية لمعدلات استجابة الـ APIs، خدمة الذكاء الاصطناعي Python، وسرعة بوابات الـ QR'
              : 'Real-time telemetry of Node.js Gateway, Python AI Microservice, MySQL connection pools, and Gate QR operations'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isAr ? 'جميع الخدمات تعمل بكفاءة' : 'ALL SYSTEMS OPERATIONAL'}</span>
          </span>
        </div>
      </div>

      {/* Primary KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core API Gateway */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
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
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
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

        {/* QR Gate Operations Speed */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isAr ? 'سرعة التحقق بالـ QR' : 'Gate Scan Latency'}
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
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
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
      </div>

      {/* Service Topology & Anti-Replay Architecture Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anti-Replay Gate Status */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <QrCode className="size-4 text-blue-600" />
              {isAr ? 'بنية التحقق الفوري ومنع التكرار (Anti-Replay Gate)' : 'Real-time Gate & Anti-Replay Synchronization'}
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
          </div>
        </div>

        {/* Golden Rule of AI Monitoring */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Cpu className="size-4 text-indigo-600" />
              {isAr ? 'حوكمة الذكاء الاصطناعي (ADR-0002 Advisory)' : 'AI Intelligence Microservice (ADR-0002)'}
            </h3>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold font-mono text-indigo-700">
              Advisory Mode
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'دقة استخراج المتطلبات (Intent & Slot Extraction):' : 'Slot Extraction Accuracy:'}</span>
              <span className="font-mono font-bold text-indigo-600">{adminMetrics.aiExtractionAccuracy}%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'حالة التراجع التلقائي (Fallback Mode):' : 'Fallback Engine Ready:'}</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="size-3.5" /> Standby (Keyword SQL)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">{isAr ? 'حد العزل والتأكيد البشري:' : 'Enforcement Authority:'}</span>
              <span className="font-bold text-slate-800">Node.js Core Backend + User Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
