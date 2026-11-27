import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { DigitalTicket } from '../../types';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  RefreshCw,
  Camera,
  Activity,
} from 'lucide-react';
import clsx from 'clsx';

export const CheckinGateView: React.FC = () => {
  const { gateScans, gateOpen, toggleGate, verifyGateTicket, tickets } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [inputCode, setInputCode] = useState<string>('');
  const [lastResult, setLastResult] = useState<{
    status: 'ADMIT' | 'DUPLICATE' | 'INVALID';
    reason?: string;
    ticket?: DigitalTicket;
  } | null>(null);

  const [isScanningSim, setIsScanningSim] = useState<boolean>(false);

  const totalTickets = tickets.length || 3;
  const admittedCount = gateScans.filter((s) => s.status === 'ADMIT').length;
  const duplicateCount = gateScans.filter((s) => s.status === 'DUPLICATE').length;
  const invalidCount = gateScans.filter((s) => s.status === 'INVALID').length;
  const remainingCount = Math.max(0, totalTickets - admittedCount);

  const handleManualScan = (codeToScan?: string) => {
    const code = codeToScan || inputCode;
    if (!code.trim()) return;

    setIsScanningSim(true);
    setTimeout(() => {
      const res = verifyGateTicket(code);
      setLastResult(res);
      setIsScanningSim(false);
      if (!codeToScan) setInputCode('');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Title & Gate Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {isAr ? 'لوحة بوابات الدخول والمسح الذكي (Check-in O11–O12)' : 'Live Gate Radar & QR Check-in'}
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'مراقبة الحضور المتصلة بـ WebSocket / Socket.IO، محاكي الكاميرا، ونظام منع تكرار الدخول (Anti-Replay)'
              : 'Real-time Socket.IO attendance tracker, camera scanner simulator, and anti-replay protection'}
          </p>
        </div>

        <button
          onClick={toggleGate}
          className={clsx(
            'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-soft shrink-0',
            gateOpen
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          )}
        >
          {gateOpen ? <Pause className="size-4" /> : <Play className="size-4" />}
          <span>
            {gateOpen
              ? (isAr ? 'إيقاف البوابة مؤقتاً' : 'Pause Gate Scanner')
              : (isAr ? 'استئناف تشغيل البوابة' : 'Resume Gate Scanner')}
          </span>
        </button>
      </div>

      {/* 4 Real-Time Attendance KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-bold">{isAr ? 'إجمالي التذاكر الصادرة' : 'Total Issued'}</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalTickets}</div>
          <p className="text-[10px] text-slate-400">{isAr ? 'تذاكر رقمية مؤكدة' : 'Confirmed bookings'}</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-soft space-y-1">
          <span className="text-xs text-emerald-800 font-bold">{isAr ? 'تم دخولهم (Admitted)' : 'Admitted Attendees'}</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">{admittedCount}</div>
          <p className="text-[10px] text-emerald-700">
            {Math.round((admittedCount / (totalTickets || 1)) * 100)}% {isAr ? 'حضور فعلي' : 'Present'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft space-y-1">
          <span className="text-xs text-slate-500 font-bold">{isAr ? 'المتبقي خارج القاعة' : 'Remaining Outside'}</span>
          <div className="text-2xl font-black text-slate-700 font-mono">{remainingCount}</div>
          <p className="text-[10px] text-slate-400">{isAr ? 'بانتظار وصولهم' : 'Awaiting arrival'}</p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 shadow-soft space-y-1">
          <span className="text-xs text-red-800 font-bold">{isAr ? 'محاولات دخول مرفوضة' : 'Rejected Scans'}</span>
          <div className="text-2xl font-black text-red-600 font-mono">{duplicateCount + invalidCount}</div>
          <p className="text-[10px] text-red-700">
            {duplicateCount} {isAr ? 'تكرار' : 'replay'} · {invalidCount} {isAr ? 'غير صالحة' : 'invalid'}
          </p>
        </div>
      </div>

      {/* Main Gate Scanner & Camera Simulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Camera / Scanner Viewport (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Camera className="size-4 text-emerald-400" />
                <span className="text-xs font-bold">{isAr ? 'كاميرا الماسح الضوئي (Gate Optical Lens)' : 'Gate Optical Scanner Lens'}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                {gateOpen ? 'CAM 01 · 60 FPS' : 'PAUSED'}
              </span>
            </div>

            {/* Viewport Box */}
            <div className="relative my-6 aspect-video max-h-72 w-full rounded-2xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              {/* Scan target reticle */}
              <div className="relative size-44 border-2 border-emerald-400/80 rounded-2xl flex items-center justify-center">
                <QrCode className="size-24 text-slate-600 opacity-60" />

                {/* Animated scan line */}
                {gateOpen && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-500/50 animate-bounce duration-1000" />
                )}
              </div>

              {isScanningSim && (
                <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-2">
                  <RefreshCw className="size-6 text-emerald-400 animate-spin" />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Verifying Cryptographic QR Token...
                  </span>
                </div>
              )}
            </div>

            {/* Quick Test Buttons (Instant Testing for the User) */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 block">
                {isAr ? 'أزرار الاختبار السريع (Quick Simulator Triggers):' : 'Interactive Quick Test Scenarios:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleManualScan('EVQ-2026-TCS-00742')}
                  className="rounded-xl bg-slate-800 border border-slate-700 p-2 text-center hover:bg-slate-700 transition"
                >
                  <span className="block text-[10px] text-emerald-400 font-bold">✓ Scan Valid VIP</span>
                  <span className="text-[9px] text-slate-400 font-mono">Ahmed Hassan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleManualScan('EVQ-2026-UDC-00311')}
                  className="rounded-xl bg-slate-800 border border-slate-700 p-2 text-center hover:bg-slate-700 transition"
                >
                  <span className="block text-[10px] text-blue-400 font-bold">✓ Scan Regular</span>
                  <span className="text-[9px] text-slate-400 font-mono">GrEEK Campus</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleManualScan('EVQ-2026-TCS-00742')}
                  className="rounded-xl bg-slate-800 border border-slate-700 p-2 text-center hover:bg-slate-700 transition"
                >
                  <span className="block text-[10px] text-amber-400 font-bold">⚠ Test Anti-Replay</span>
                  <span className="text-[9px] text-slate-400 font-mono">Scan 2nd Time</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleManualScan('EVQ-FAKE-TOKEN-999')}
                  className="rounded-xl bg-slate-800 border border-slate-700 p-2 text-center hover:bg-slate-700 transition"
                >
                  <span className="block text-[10px] text-red-400 font-bold">✗ Fake Ticket</span>
                  <span className="text-[9px] text-slate-400 font-mono">Tampered Hash</span>
                </button>
              </div>
            </div>

            {/* Manual Code Input Fallback */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder={isAr ? 'أدخل كود التذكرة يدوياً...' : 'Or enter ticket code manually...'}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2 text-xs font-mono text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => handleManualScan()}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
              >
                {isAr ? 'فحص' : 'Verify'}
              </button>
            </div>
          </div>

          {/* Last Verification Visual Feedback Card */}
          {lastResult && (
            <div
              className={clsx(
                'rounded-2xl p-5 border shadow-soft flex items-start gap-4 transition-all',
                lastResult.status === 'ADMIT'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : lastResult.status === 'DUPLICATE'
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-red-50 border-red-200 text-red-900'
              )}
            >
              {lastResult.status === 'ADMIT' ? (
                <CheckCircle2 className="size-8 text-emerald-600 shrink-0 mt-0.5" />
              ) : lastResult.status === 'DUPLICATE' ? (
                <AlertTriangle className="size-8 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="size-8 text-red-600 shrink-0 mt-0.5" />
              )}

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">
                    {lastResult.status === 'ADMIT'
                      ? (isAr ? 'مسموح بالدخول — تم التحقق بنجاح' : 'ADMIT · CHECK-IN VERIFIED')
                      : lastResult.status === 'DUPLICATE'
                      ? (isAr ? 'ممنوع الدخول — تذكرة مستخدمة مسبقاً (Anti-Replay)' : 'DO NOT ADMIT · DUPLICATE REPLAY DETECTED')
                      : (isAr ? 'ممنوع الدخول — تذكرة مزيفة أو غير صالحة' : 'DO NOT ADMIT · INVALID TICKET')}
                  </h3>
                </div>

                {lastResult.ticket && (
                  <p className="text-xs font-semibold">
                    {lastResult.ticket.attendeeName} · {lastResult.ticket.tierName} · {lastResult.ticket.seat || 'General Hall'}
                  </p>
                )}

                {lastResult.reason && (
                  <p className="text-xs opacity-80 font-mono">{lastResult.reason}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Real-time Live Gate Logs Stream (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {isAr ? 'سجل العمليات اللحظي' : 'Live Gate Scans Feed'}
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {gateScans.length} {isAr ? 'عمليات مسجلة' : 'scans logged'}
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto space-y-1">
            {gateScans.map((scan) => (
              <div key={scan.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={clsx(
                        'rounded-md px-1.5 py-0.2 text-[9px] font-bold font-mono',
                        scan.status === 'ADMIT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : scan.status === 'DUPLICATE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      )}
                    >
                      {scan.status}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{scan.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{scan.attendeeName}</h4>
                  <p className="text-[11px] text-slate-500 font-mono">{scan.ticketId}</p>
                  {scan.rejectionReason && (
                    <p className="text-[10px] text-red-600 font-semibold">{scan.rejectionReason}</p>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 shrink-0 font-mono">{scan.gateName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
