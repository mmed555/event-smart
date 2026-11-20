import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  ShieldAlert,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';

export const VendorOnboardingGate: React.FC = () => {
  const { vendorProfile, updateVendorProfile, setVendorKycStatus } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [crFile, setCrFile] = useState<string | null>(null);
  const [taxFile, setTaxFile] = useState<string | null>(null);
  const [crNumber, setCrNumber] = useState(vendorProfile.crNumber || '');
  const [taxNumber, setTaxNumber] = useState(vendorProfile.taxNumber || '');

  const handleUploadDocs = (e: React.FormEvent) => {
    e.preventDefault();
    updateVendorProfile({
      crNumber,
      taxNumber,
      kycStatus: 'PENDING',
      kycSubmittedAt: new Date().toISOString(),
    });
  };

  const handleSimulateApproval = () => {
    setVendorKycStatus('VERIFIED');
  };

  return (
    <div className="mx-auto max-w-4xl py-8 px-4 sm:px-6">
      {/* Top Banner Alert */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute -end-10 -bottom-10 size-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border',
                  vendorProfile.kycStatus === 'PENDING'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                )}
              >
                {vendorProfile.kycStatus === 'PENDING' ? (
                  <Clock className="size-3.5 animate-spin" />
                ) : (
                  <ShieldAlert className="size-3.5" />
                )}
                <span>
                  {isAr
                    ? vendorProfile.kycStatus === 'PENDING'
                      ? 'مستندات التوثيق قيد مراجعة الإدارة'
                      : 'بوابة التوثيق الإلزامية — حساب غير مفعل'
                    : vendorProfile.kycStatus === 'PENDING'
                    ? 'KYC Under Review by Super Admin'
                    : 'Mandatory Onboarding & KYC Gate'}
                </span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAr ? 'توثيق حساب شركة التنفيذ (KYC Gate)' : 'Execution Company Official Verification'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'وفقاً لسياسات المنصة وحوكمة العقود (ADR-0002)، يتطلب تقديم عروض الأسعار والتعاقد مع المنظمين اعتماد السجل التجاري والبطاقة الضريبية لضمان سلامة التعاملات التجارية.'
                : 'In accordance with platform governance and contract security, submitting RFQ proposals and executing contracts requires approved Commercial Register and Tax Card documents.'}
            </p>
          </div>

          {/* Quick Prototype Simulator Button */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={handleSimulateApproval}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-3 text-xs shadow-lg transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="size-4" />
              <span>{isAr ? '⚡ اعتماد فوري وتخطي (للمعاينة)' : '⚡ Instant Simulate Approval'}</span>
            </button>
            <span className="text-[11px] text-slate-400 text-center font-mono">
              {isAr ? 'ميزة تجريبية للمعاينة' : 'Prototype test shortcut'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Flow: Upload or Under Review */}
      {vendorProfile.kycStatus === 'PENDING' ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 sm:p-8 text-center space-y-6 shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-inner">
            <Clock className="size-8 animate-pulse" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-lg font-bold text-slate-900">
              {isAr ? 'تم استلام المستندات وهي قيد المراجعة والتدقيق' : 'Documents Received & Under Review'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isAr
                ? 'يقوم فريق المشرف العام بمطابقة بيانات السجل التجاري والبطاقة الضريبية مع الجهات الحكومية. يستغرق الاعتماد عادة أقل من 24 ساعة عمل.'
                : 'The Super Admin compliance team is validating your CR and Tax Card records. Verification typically takes less than 24 hours.'}
            </p>
          </div>

          <div className="mx-auto max-w-md rounded-2xl bg-white p-4 border border-amber-200 text-start space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">{isAr ? 'تاريخ التقديم:' : 'Submission Date:'}</span>
              <span className="font-semibold text-slate-800">
                {new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500">{isAr ? 'رقم السجل التجاري:' : 'CR Number:'}</span>
              <span className="font-mono font-bold text-slate-800">{vendorProfile.crNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{isAr ? 'رقم التسجيل الضريبي:' : 'Tax Number:'}</span>
              <span className="font-mono font-bold text-slate-800">{vendorProfile.taxNumber}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSimulateApproval}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 text-xs transition"
            >
              <span>{isAr ? 'تأكيد الاعتماد وفتح لوحة التحكم' : 'Approve & Unlock Full Dashboard'}</span>
              <ArrowRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft">
          <form onSubmit={handleUploadDocs} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="size-5 text-[#2563EB]" />
                <span>{isAr ? 'بيانات التوثيق الرسمية ومستندات الشركة' : 'Official Business KYC Submission'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isAr
                  ? 'يرجى إرفاق صور واضحة أو مستندات PDF للسجل التجاري الساري والبطاقة الضريبية.'
                  : 'Please provide valid Commercial Registration (CR) and Tax Card documents in PDF or high-res image.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {isAr ? 'رقم السجل التجاري (CR Number)' : 'Commercial Registration (CR) Number'}
                </label>
                <input
                  type="text"
                  required
                  value={crNumber}
                  onChange={(e) => setCrNumber(e.target.value)}
                  placeholder="e.g. 109847291"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {isAr ? 'رقم الملف الضريبي (Tax Card Number)' : 'Tax Card Number'}
                </label>
                <input
                  type="text"
                  required
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder="e.g. 482-910-385"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
                />
              </div>
            </div>

            {/* Document Upload Dropzones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CR Upload */}
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center hover:border-[#2563EB] transition bg-slate-50/50">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] mb-2">
                  <UploadCloud className="size-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  {isAr ? 'مستند السجل التجاري' : 'Commercial Register'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 mb-3">
                  {isAr ? 'PDF أو JPG بحجم أقصى 10MB' : 'PDF or JPG up to 10MB'}
                </p>
                <button
                  type="button"
                  onClick={() => setCrFile('cr_document_certified.pdf')}
                  className={clsx(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                    crFile
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {crFile ? <CheckCircle2 className="size-3.5" /> : <FileText className="size-3.5" />}
                  <span>{crFile || (isAr ? 'اختيار الملف' : 'Select File')}</span>
                </button>
              </div>

              {/* Tax Card Upload */}
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center hover:border-[#2563EB] transition bg-slate-50/50">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                  <UploadCloud className="size-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-800">
                  {isAr ? 'مستند البطاقة الضريبية' : 'Tax Card Document'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 mb-3">
                  {isAr ? 'PDF أو JPG بحجم أقصى 10MB' : 'PDF or JPG up to 10MB'}
                </p>
                <button
                  type="button"
                  onClick={() => setTaxFile('tax_card_certified.pdf')}
                  className={clsx(
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                    taxFile
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {taxFile ? <CheckCircle2 className="size-3.5" /> : <FileText className="size-3.5" />}
                  <span>{taxFile || (isAr ? 'اختيار الملف' : 'Select File')}</span>
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                {isAr
                  ? 'يتم تخزين المستندات في خزنة مشفرة ومحمية (KYC Vault) وفق معايير الأمان.'
                  : 'Files are encrypted and stored in protected KYC vault in compliance with security standards.'}
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-2.5 text-xs shadow-soft transition"
                >
                  <span>{isAr ? 'إرسال المستندات للمراجعة' : 'Submit Documents for Verification'}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
