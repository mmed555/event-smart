import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { ShieldAlert, UserCheck, Home, Sparkles, Key } from 'lucide-react';

export const ForbiddenView: React.FC = () => {
  const { role, currentUser } = useApp();
  const { language } = useI18n();
  const navigate = useNavigate();
  const isAr = language === 'ar';

  const getRoleDashboard = () => {
    switch (role) {
      case 'organizer':
        return { path: '/organizer', label: isAr ? 'لوحة تحكم المنظم' : 'Organizer Dashboard' };
      case 'vendor':
        return { path: '/vendor', label: isAr ? 'لوحة تحكم الموردين' : 'Vendor Portal' };
      case 'admin':
        return { path: '/admin', label: isAr ? 'لوحة الحوكمة والإشراف' : 'Admin Governance' };
      default:
        return { path: '/', label: isAr ? 'بوابة الحاضرين الرئيسية' : 'Attendee Home' };
    }
  };

  const dashboard = getRoleDashboard();

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 bg-linear-to-b from-slate-50 to-slate-100/70">
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Security Shield Graphic */}
        <div className="relative mx-auto size-24 flex items-center justify-center rounded-3xl bg-red-50 text-red-600 border border-red-100 shadow-xl">
          <ShieldAlert className="size-12 animate-pulse" />
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
            <Sparkles className="size-3" />
            <span>S08 · {isAr ? 'خطأ 403 - وصول محظور' : 'Error 403 - Access Denied (RBAC)'}</span>
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isAr ? 'عفواً، لا تملك الصلاحية للوصول!' : 'Access Restricted by Security Policy'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'الصفحة التي تحاول فتحها تتطلب دوراً إدارياً أو صلاحيات متخصصة غير متاحة لحسابك الحالي بموجب سياسات حماية البيانات والتحكم في الوصول (RBAC).'
              : 'This endpoint or dashboard requires specific role-based access control (RBAC) permissions not granted to your current authenticated account.'}
          </p>
        </div>

        {/* Current Active Account Box */}
        <div className="mx-auto max-w-sm rounded-2xl bg-white p-4 border border-slate-200 shadow-soft text-start flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
            <UserCheck className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-400 font-semibold">{isAr ? 'الحساب النشط حالياً:' : 'Active Account:'}</p>
            <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Ahmed Hassan'}</p>
            <span className="inline-block mt-0.5 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700 uppercase">
              Role: {role}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(dashboard.path)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-xs font-bold text-white shadow-soft hover:bg-blue-600 transition"
          >
            <Home className="size-4" />
            <span>{isAr ? `العودة إلى ${dashboard.label}` : `Go to ${dashboard.label}`}</span>
          </button>

          <Link
            to="/auth"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-700 border border-slate-200 shadow-soft hover:bg-slate-50 transition"
          >
            <Key className="size-4 text-slate-500" />
            <span>{isAr ? 'تسجيل الدخول بحساب آخر' : 'Switch Account'}</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-200/80">
          <p className="text-xs text-slate-400">
            {isAr ? 'تحتاج إلى ترقية حسابك أو توثيق شركتك؟' : 'Need account upgrade or KYC verification?'}{' '}
            <Link to="/help" className="font-bold text-blue-600 hover:underline">
              {isAr ? 'راجع مركز المساعدة (S06)' : 'View Help Center (S06)'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
