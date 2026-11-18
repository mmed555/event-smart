import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  RotateCcw,
  Building,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

export const KycReviewerView: React.FC = () => {
  const { adminKycQueue, selectedAdminKycId, reviewKyc, setActiveAdminTab } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const currentItem =
    adminKycQueue.find((k) => k.id === selectedAdminKycId) || adminKycQueue[0];

  const [activeDocTab, setActiveDocTab] = useState<'cr' | 'tax'>('cr');
  const [docZoom, setDocZoom] = useState<number>(100);
  const [actionNotes, setActionNotes] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  // Verification Checklist State
  const [checklist, setChecklist] = useState({
    crValid: true,
    taxValid: true,
    signatoryMatched: true,
    activityMatched: true,
  });

  if (!currentItem) {
    return (
      <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
        <AlertCircle className="size-10 text-slate-400 mx-auto" />
        <h3 className="mt-3 text-sm font-bold text-slate-800">
          {isAr ? 'لا يوجد طلب توثيق محدد' : 'No KYC submission selected'}
        </h3>
        <button
          onClick={() => setActiveAdminTab('kyc-queue')}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
        >
          {isAr ? 'العودة لطابور التوثيق' : 'Back to Verification Queue'}
        </button>
      </div>
    );
  }

  const activeDoc =
    activeDocTab === 'cr'
      ? currentItem.documents.commercialRegister
      : currentItem.documents.taxCard;

  const handleApprove = () => {
    reviewKyc(currentItem.id, 'VERIFIED');
    setShowRejectForm(false);
    setShowRevisionForm(false);
  };

  const handleReject = () => {
    if (!actionNotes.trim()) return;
    reviewKyc(currentItem.id, 'REJECTED', actionNotes);
    setShowRejectForm(false);
    setActionNotes('');
  };

  const handleRequestRevision = () => {
    if (!actionNotes.trim()) return;
    reviewKyc(currentItem.id, 'REVISION_REQUESTED', actionNotes);
    setShowRevisionForm(false);
    setActionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAdminTab('kyc-queue')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            {isAr ? <ArrowRight className="size-4" /> : <ArrowLeft className="size-4" />}
            <span>{isAr ? 'العودة لطابور التوثيق' : 'Back to Verification Queue'}</span>
          </button>
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="size-6 text-emerald-600" />
              {isAr ? 'فحص وتدقيق مستندات الـ KYC' : 'KYC Document Reviewer'}
            </h2>
            <span className="font-mono text-xs text-slate-500 font-bold">
              {currentItem.id} · {isAr ? currentItem.companyNameAr || currentItem.companyName : currentItem.companyName}
            </span>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider',
              currentItem.status === 'VERIFIED' && 'bg-emerald-100 text-emerald-800 border border-emerald-300',
              currentItem.status === 'PENDING' && 'bg-amber-100 text-amber-800 border border-amber-300',
              currentItem.status === 'REJECTED' && 'bg-red-100 text-red-800 border border-red-300',
              currentItem.status === 'REVISION_REQUESTED' && 'bg-blue-100 text-blue-800 border border-blue-300'
            )}
          >
            <span className="size-2 rounded-full bg-current" />
            {currentItem.status}
          </span>
        </div>
      </div>

      {/* Main Split Layout: Document Viewer (Left/Top) and Governance Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Document Canvas (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {/* Doc Switcher Header */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDocTab('cr')}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition',
                  activeDocTab === 'cr'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <FileText className="size-4" />
                <span>{isAr ? 'السجل التجاري (CR)' : 'Commercial Register'}</span>
              </button>

              <button
                onClick={() => setActiveDocTab('tax')}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition',
                  activeDocTab === 'tax'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <FileText className="size-4" />
                <span>{isAr ? 'البطاقة الضريبية (Tax Card)' : 'Tax Card'}</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <button
                onClick={() => setDocZoom((prev) => Math.max(75, prev - 15))}
                className="size-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <span className="w-10 text-center font-bold">{docZoom}%</span>
              <button
                onClick={() => setDocZoom((prev) => Math.min(150, prev + 15))}
                className="size-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Document Simulated Canvas */}
          <div className="relative rounded-2xl border border-slate-200 bg-slate-900/95 p-6 shadow-md overflow-hidden min-h-[460px] flex items-center justify-center">
            {/* Watermark Security Stamp */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-1.5 text-[11px] font-mono text-emerald-400 backdrop-blur-md border border-emerald-500/30">
              <ShieldCheck className="size-4" />
              <span>KYC VAULT · ENCRYPTED BLOB</span>
            </div>

            {/* Document Sheet Simulation */}
            <div
              style={{ transform: `scale(${docZoom / 100})`, transition: 'transform 0.2s ease-out' }}
              className="w-full max-w-xl rounded-xl bg-white p-8 text-slate-900 shadow-2xl border border-slate-300 font-sans"
            >
              <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black tracking-tight text-slate-900">
                    {isAr ? activeDoc.titleAr : activeDoc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Ministry of Supply and Internal Trade · General Authority for Investment (GAFI)
                  </p>
                </div>
                <div className="size-12 rounded-lg border border-slate-300 flex items-center justify-center text-[10px] font-mono text-slate-400">
                  OFFICIAL SEAL
                </div>
              </div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      {isAr ? 'اسم المنشأة' : 'Entity Name'}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {currentItem.companyName}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      {isAr ? 'رقم القيد / التسجيل' : 'Registration Number'}
                    </span>
                    <span className="font-mono font-bold text-blue-700 text-sm">
                      {activeDoc.docNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      {isAr ? 'تاريخ الإصدار' : 'Issue Date'}
                    </span>
                    <span className="font-mono text-slate-700">{activeDoc.issueDate}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      {isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700">{activeDoc.expiryDate}</span>
                  </div>
                </div>

                <div className="pb-3 border-b border-slate-100">
                  <span className="block text-[10px] font-bold uppercase text-slate-400">
                    {isAr ? 'النشاط المصرح به' : 'Licensed Activity'}
                  </span>
                  <span className="text-slate-800 leading-relaxed">
                    {currentItem.category} · Event production, sound staging, visual displays, technical event services.
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Security Hash: SHA256-49a8fe10b938
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600">
                    STATUS: DIGITALLY MATCHED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compliance Audit Checklist & Governance Actions (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {/* Company Brief Dossier */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Building className="size-4 text-blue-600" />
              {isAr ? 'بيانات المنشأة المقدمة' : 'Vendor Profile Data'}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'المدينة:' : 'City:'}</span>
                <span className="font-bold text-slate-800">{currentItem.city}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'سنة التأسيس:' : 'Established:'}</span>
                <span className="font-mono font-bold text-slate-800">{currentItem.establishedYear}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'المسؤول:' : 'Contact:'}</span>
                <span className="font-bold text-slate-800">{currentItem.contactPerson}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400">{isAr ? 'البريد:' : 'Email:'}</span>
                <span className="font-mono text-slate-800 truncate max-w-[180px]">{currentItem.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">{isAr ? 'تاريخ التقديم:' : 'Submitted:'}</span>
                <span className="font-mono text-slate-800">{currentItem.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600" />
              {isAr ? 'قائمة الفحص والتحقق القانوني' : 'Legal Compliance Checks'}
            </h3>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.crValid}
                  onChange={(e) => setChecklist({ ...checklist, crValid: e.target.checked })}
                  className="size-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium">
                  {isAr ? 'السجل التجاري سارٍ وغير منتهي' : 'Commercial Register is active & unexpired'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.taxValid}
                  onChange={(e) => setChecklist({ ...checklist, taxValid: e.target.checked })}
                  className="size-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium">
                  {isAr ? 'رقم التسجيل الضريبي مطابق ومميكن' : 'Tax Card number valid & verified'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.activityMatched}
                  onChange={(e) => setChecklist({ ...checklist, activityMatched: e.target.checked })}
                  className="size-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium">
                  {isAr ? 'نشاط الشركة مطابق لخدمات الفعاليات' : 'Entity activity matches Event RFQs'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.signatoryMatched}
                  onChange={(e) => setChecklist({ ...checklist, signatoryMatched: e.target.checked })}
                  className="size-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium">
                  {isAr ? 'صفة المفوض بالتوقيع معتمدة' : 'Signatory authorization verified'}
                </span>
              </label>
            </div>
          </div>

          {/* Action Decision Controls */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
              {isAr ? 'قرار الحوكمة والاعتماد' : 'Governance Decision'}
            </h3>

            {/* Revision / Rejection Note box */}
            {(showRejectForm || showRevisionForm) && (
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">
                  {showRejectForm
                    ? isAr ? 'سبب الرفض الإداري:' : 'Rejection Reason Notice:'
                    : isAr ? 'ملاحظات التعديل المطلوبة:' : 'Revision Request Instructions:'}
                </label>
                <textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  placeholder={
                    showRejectForm
                      ? isAr ? 'اكتب سبب رفض التوثيق...' : 'Specify grounds for rejection...'
                      : isAr ? 'وضح المستندات أو التعديلات المطلوبة من الشركة...' : 'Explain what the vendor must re-upload...'
                  }
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={handleApprove}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
              >
                <CheckCircle className="size-4" />
                <span>{isAr ? 'اعتماد التوثيق (Approve & Verify)' : 'Approve & Verify Vendor'}</span>
              </button>

              <button
                onClick={() => {
                  if (!showRevisionForm) {
                    setShowRevisionForm(true);
                    setShowRejectForm(false);
                  } else {
                    handleRequestRevision();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
              >
                <RotateCcw className="size-3.5" />
                <span>
                  {showRevisionForm
                    ? isAr ? 'إرسال طلب التعديل للشركة' : 'Confirm Revision Request'
                    : isAr ? 'طلب استكمال أو تعديل مستندات' : 'Request Revision'}
                </span>
              </button>

              <button
                onClick={() => {
                  if (!showRejectForm) {
                    setShowRejectForm(true);
                    setShowRevisionForm(false);
                  } else {
                    handleReject();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
              >
                <XCircle className="size-3.5" />
                <span>
                  {showRejectForm
                    ? isAr ? 'تأكيد رفض الطلب نهائياً' : 'Confirm Permanent Rejection'
                    : isAr ? 'رفض الطلب' : 'Reject Submission'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
