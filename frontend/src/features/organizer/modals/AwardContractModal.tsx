import React from 'react';
import { useI18n } from '../../../i18n';
import { OrganizerQuotationComparison } from '../../../types';
import { X, Award, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

interface AwardContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: OrganizerQuotationComparison | null;
  rfqTitle: string;
  onConfirm: () => void;
}

export const AwardContractModal: React.FC<AwardContractModalProps> = ({
  isOpen,
  onClose,
  quotation,
  rfqTitle,
  onConfirm,
}) => {
  const { language } = useI18n();
  const isAr = language === 'ar';

  if (!isOpen || !quotation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAr ? 'ترسية العقد وإصدار أمر التنفيذ' : 'Award Contract & Issue Service Order'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr ? 'تأكيد التعاقد واعتماد عرض السعر المختار' : 'Confirm contract award & authorize execution milestones'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{isAr ? 'المناقصة / الطلب:' : 'Target RFQ:'}</span>
              <span className="text-xs font-bold text-slate-800">{rfqTitle}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{isAr ? 'شركة التنفيذ:' : 'Awarded Vendor:'}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{quotation.vendorName}</span>
                {quotation.verifiedKyc && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    <ShieldCheck className="size-3" />
                    <span>KYC</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{isAr ? 'السعر المقترح الإجمالي:' : 'Total Contract Value:'}</span>
              <span className="text-sm font-black text-slate-900">
                {quotation.proposedPrice.toLocaleString()} {quotation.currency}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{isAr ? 'مدة التسليم والتجهيز:' : 'Setup & Delivery Turnaround:'}</span>
              <span className="text-xs font-semibold text-slate-700">
                {quotation.deliveryDays} {isAr ? 'أيام' : 'days'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{isAr ? 'نسبة التوافق الذكي:' : 'AI Match Score:'}</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {quotation.aiMatchScore}% Match
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
              <FileText className="size-4" />
              <span>{isAr ? 'الشروط المالية والتعاقدية' : 'Payment & Contract Terms'}</span>
            </div>
            <p>{quotation.paymentTerms}</p>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
            <CheckCircle2 className="size-4 shrink-0 text-amber-600 mt-0.5" />
            <span>
              {isAr
                ? 'بمجرد التأكيد سيتم تحويل حالة العرض إلى مقبول وإصدار أمر تنفيذ لوجستي للمورد، مع تحويل الدفعة المقدمة عبر حساب الضمان التجريبي.'
                : 'Confirming will issue a binding Service Order to the vendor, notify team members, and release initial staging milestones.'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            {isAr ? 'تراجع' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-emerald-700 transition"
          >
            <Award className="size-3.5" />
            <span>{isAr ? 'تأكيد الترسية وإصدار العقد' : 'Confirm Award & Issue Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
