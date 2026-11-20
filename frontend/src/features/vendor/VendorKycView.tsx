import React from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  FileText,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';
import clsx from 'clsx';

export const VendorKycView: React.FC = () => {
  const { vendorProfile } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  return (
    <div className="space-y-4">
      {/* Verification Status Card */}
      <div
        className={clsx(
          'rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border',
          vendorProfile.kycStatus === 'VERIFIED'
            ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-emerald-800'
            : vendorProfile.kycStatus === 'PENDING'
            ? 'bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border-amber-800'
            : 'bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border-red-800'
        )}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border',
                vendorProfile.kycStatus === 'VERIFIED'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : vendorProfile.kycStatus === 'PENDING'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              )}
            >
              {vendorProfile.kycStatus === 'VERIFIED' ? (
                <ShieldCheck className="size-3.5" />
              ) : vendorProfile.kycStatus === 'PENDING' ? (
                <Clock className="size-3.5 animate-spin" />
              ) : (
                <ShieldAlert className="size-3.5" />
              )}
              <span>
                {vendorProfile.kycStatus === 'VERIFIED'
                  ? isAr
                    ? 'الحساب موثق رسمياً ومعتمد (Verified Vendor)'
                    : 'Officially Verified & Certified'
                  : vendorProfile.kycStatus === 'PENDING'
                  ? isAr
                    ? 'المستندات قيد مراجعة وتدقيق الإدارة'
                    : 'Documents Under Compliance Review'
                  : isAr
                  ? 'الحساب غير موثق'
                  : 'Unverified Account'}
              </span>
            </span>

            <h2 className="text-xl sm:text-2xl font-black">
              {isAr ? vendorProfile.nameAr : vendorProfile.name}
            </h2>

            <p className="text-xs text-slate-300 max-w-xl">
              {vendorProfile.kycStatus === 'VERIFIED'
                ? isAr
                  ? 'تمت مطابقة السجل التجاري والبطاقة الضريبية واعتماد الشركة كشريك تنفيذ معتمد لدى منصة Smart Event.'
                  : 'Your legal business documents have been authenticated by the platform governance board.'
                : isAr
                ? 'المستندات قيد المراجعة للتحقق من السجل والبطاقة الضريبية.'
                : 'Pending compliance check by the Super Administrator team.'}
            </p>
          </div>

          <div className="text-start sm:text-end shrink-0 text-xs text-slate-400">
            <span>{isAr ? 'تاريخ الاعتماد:' : 'Approval Date:'}</span>
            <span className="block font-bold text-white font-mono mt-0.5">
              {vendorProfile.kycReviewedAt
                ? new Date(vendorProfile.kycReviewedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Official Documents Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Commercial Register */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'مستند السجل التجاري' : 'Commercial Registration (CR)'}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {isAr ? 'رقم القيد:' : 'CR Number:'} {vendorProfile.crNumber}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="size-3" />
              <span>{isAr ? 'ساري' : 'Valid'}</span>
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'اسم المنشأة في السجل:' : 'Entity Name:'}</span>
              <span className="font-semibold">{vendorProfile.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'سنة التأسيس:' : 'Established:'}</span>
              <span className="font-mono">{vendorProfile.establishedYear}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'تاريخ التجديد القادم:' : 'Expiry Date:'}</span>
              <span className="font-mono">2027-12-31</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="size-3 text-slate-400" />
              <span>{isAr ? 'مستند مشفر ومحمي' : 'Encrypted Vault'}</span>
            </span>
            <button
              onClick={() => alert(isAr ? 'معاينة مستند السجل التجاري الرسمي' : 'Viewing certified CR file')}
              className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1"
            >
              <span>{isAr ? 'معاينة المستند' : 'View File'}</span>
              <ExternalLink className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Tax Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'مستند البطاقة الضريبية' : 'Tax Card Registration'}
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {isAr ? 'رقم التسجيل:' : 'Tax Number:'} {vendorProfile.taxNumber}
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="size-3" />
              <span>{isAr ? 'معتمد' : 'Verified'}</span>
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'المأمورية التابع لها:' : 'Tax Office:'}</span>
              <span className="font-semibold">{isAr ? 'مأمورية ضرائب الشركات المساهمة - القاهرة' : 'Cairo Corporate Tax Dept'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'حالة الالتزام الضريبي:' : 'Compliance:'}</span>
              <span className="font-semibold text-emerald-600">{isAr ? 'ملتزم ومنتظم' : 'Good Standing'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">{isAr ? 'تاريخ المراجعة:' : 'Audit Date:'}</span>
              <span className="font-mono">2026-01-16</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="size-3 text-slate-400" />
              <span>{isAr ? 'مستند مشفر ومحمي' : 'Encrypted Vault'}</span>
            </span>
            <button
              onClick={() => alert(isAr ? 'معاينة مستند البطاقة الضريبية' : 'Viewing Tax Card file')}
              className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1"
            >
              <span>{isAr ? 'معاينة المستند' : 'View File'}</span>
              <ExternalLink className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Guidelines */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-xs text-slate-600">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-emerald-600" />
          <span>{isAr ? 'إرشادات التوثيق والأمان التجاري' : 'Security & Commercial Compliance'}</span>
        </h4>
        <p className="leading-relaxed">
          {isAr
            ? 'تضمن منصة Smart Event الحفاظ على سرية المستندات الرسمية وأرقام التسجيل الضريبي، ويتم استخدامها حصراً لأغراض إبرام العقود الإلكترونية وإصدار الفواتير القانونية بين المنظمين وشركات التنفيذ.'
            : 'Smart Event ensures complete vault encryption of legal business documents. They are exclusively utilized for generating binding e-contracts and verified invoicing.'}
        </p>
      </div>
    </div>
  );
};
