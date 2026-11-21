import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { Compass, Home, Search, HelpCircle, Sparkles } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { language } = useI18n();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Floating Creative Graphic */}
        <div className="relative mx-auto size-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-blue-100 animate-pulse blur-md opacity-60" />
          <div className="relative flex size-24 items-center justify-center rounded-3xl bg-white border border-blue-100 shadow-xl text-[#2563EB]">
            <Compass className="size-12 animate-spin-slow" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2563EB]">
            <Sparkles className="size-3" />
            <span>S07 · {isAr ? 'خطأ 404 - صفحة مفقودة' : 'Error 404 - Page Not Found'}</span>
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {isAr ? 'عذراً، لم نتمكن من العثور على هذه الصفحة!' : 'Oops, we could not find that page!'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'يبدو أن الرابط الذي طلبته قد تم نقله أو حذفه، أو أنك أدخلت عنواناً غير صحيح. يمكنك العودة للصفحة الرئيسية أو استكشاف الفعاليات المتاحة.'
              : 'The link you followed may be broken, deleted, or entered incorrectly. You can return home or explore active events across Egypt.'}
          </p>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-soft hover:bg-slate-800 transition"
          >
            <Home className="size-4" />
            <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Back to Home'}</span>
          </button>

          <Link
            to="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-700 border border-slate-200 shadow-soft hover:bg-slate-50 transition"
          >
            <Search className="size-4 text-blue-600" />
            <span>{isAr ? 'استكشاف الفعاليات' : 'Explore Events'}</span>
          </Link>

          <Link
            to="/help"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-700 border border-slate-200 shadow-soft hover:bg-slate-50 transition"
          >
            <HelpCircle className="size-4 text-purple-600" />
            <span>{isAr ? 'مركز المساعدة' : 'Help Center (S06)'}</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200/80">
          <p className="text-xs text-slate-400">
            {isAr ? 'هل تعتقد أن هذا خطأ بالنظام؟' : 'Believe this is a system glitch?'}{' '}
            <Link to="/help" className="font-bold text-blue-600 hover:underline">
              {isAr ? 'أبلغ فريق الدعم الفني' : 'Report to Support'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
