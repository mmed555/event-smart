import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { ServerCrash, RefreshCw, Home, Sparkles, Terminal, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const ServerErrorView: React.FC = () => {
  const { showToast } = useApp();
  const { language } = useI18n();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const [isRetrying, setIsRetrying] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const [incidentId] = useState('ERR-500-' + Math.floor(100000 + Math.random() * 900000));

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      showToast(
        isAr ? 'تمت استعادة الاتصال بالخادم بنجاح!' : 'Connection to server successfully restored!',
        'ok'
      );
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Server Crash Graphic */}
        <div className="relative mx-auto size-24 flex items-center justify-center rounded-3xl bg-amber-50 text-amber-600 border border-amber-100 shadow-xl">
          <ServerCrash className="size-12 animate-bounce" />
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            <Sparkles className="size-3" />
            <span>S09 · {isAr ? 'خطأ 500 - خطأ داخلي بالخادم' : 'Error 500 - Internal Server Error'}</span>
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'حدث عطل فني غير متوقع في الخادم' : 'An Unexpected Server Error Occurred'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'واجه نظامنا مشكلة أثناء معالجة هذا الطلب. تم تسجيل الحادث تلقائياً في مركز المراقبة، ونحن نعمل على إصلاحه حالياً.'
              : 'Our system encountered an unexpected condition while processing this request. The incident has been logged and our engineering team has been notified.'}
          </p>
        </div>

        {/* Incident Tracking Pill */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-1.5 text-xs text-slate-600 font-mono">
          <span>Incident ID:</span>
          <span className="font-bold text-slate-900 select-all">{incidentId}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white shadow-soft hover:bg-blue-600 active:scale-[0.99] transition disabled:opacity-50"
          >
            <RefreshCw className={clsx('size-4', isRetrying && 'animate-spin')} />
            <span>{isRetrying ? (isAr ? 'جاري إعادة الاتصال...' : 'Reconnecting...') : (isAr ? 'إعادة المحاولة' : 'Retry Request')}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-700 border border-slate-200 shadow-soft hover:bg-slate-50 transition"
          >
            <Home className="size-4" />
            <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Return Home'}</span>
          </button>
        </div>

        {/* Technical Diagnostics Accordion */}
        <div className="pt-4 max-w-md mx-auto">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <Terminal className="size-3.5" />
            <span>{isAr ? 'عرض التفاصيل التقنية للتشخيص' : 'View Diagnostic Logs'}</span>
            <ChevronDown className={clsx('size-3.5 transition-transform', showTechnical && 'rotate-180')} />
          </button>

          {showTechnical && (
            <div className="mt-3 p-3.5 rounded-2xl bg-slate-900 text-slate-200 text-start text-[11px] font-mono leading-relaxed space-y-1 shadow-inner border border-slate-800" dir="ltr">
              <p className="text-red-400 font-bold">500 Internal Server Error: Gateway Handshake Timeout</p>
              <p className="text-slate-400">Route: /api/v1/internal/health-check</p>
              <p className="text-slate-400">Cluster: node-cairo-prod-02 | Service: core-monolith</p>
              <p className="text-emerald-400">Fallback Handler: Activated (Graceful Degradation)</p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200/80">
          <p className="text-xs text-slate-400">
            {isAr ? 'تحقق من حالة المنظومة والخوادم:' : 'System status & uptime:'}{' '}
            <Link to="/help" className="font-bold text-blue-600 hover:underline">
              {isAr ? 'مركز مساعدة النظام (S06)' : 'Smart Event Status Hub'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
