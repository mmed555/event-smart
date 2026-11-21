import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorRFQItem } from '../../types';
import { X, Plus, Trash2, CheckCircle } from 'lucide-react';

interface SubmitQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: VendorRFQItem | null;
}

interface ItemRow {
  title: string;
  titleAr: string;
  qty: number;
  unitPrice: number;
}

export const SubmitQuotationModal: React.FC<SubmitQuotationModalProps> = ({
  isOpen,
  onClose,
  rfq,
}) => {
  const { submitQuotation } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [depositPercent, setDepositPercent] = useState<number>(40);
  const [timelineDays, setTimelineDays] = useState<number>(3);
  const [scopeSummary, setScopeSummary] = useState('');
  const [scopeSummaryAr, setScopeSummaryAr] = useState('');
  const [terms, setTerms] = useState(
    '40% deposit upon contract confirmation, 40% upon setup delivery, 20% post-event sign-off.'
  );
  const [termsAr, setTermsAr] = useState(
    'دفعة مقدمة 40% عند توقيع العقد، 40% يوم التركيب والجاهزية، 20% بعد ختام الفعالية.'
  );

  const [items, setItems] = useState<ItemRow[]>([
    {
      title: 'Turnkey Sound Reinforcement & Line Array',
      titleAr: 'تجهيز منظومة الصوت الاحترافية واللاين أراي',
      qty: 1,
      unitPrice: 65000,
    },
    {
      title: 'Intelligent Stage Lighting & DMX Control',
      titleAr: 'الإضاءة المسرحية الذكية والتحكم الرقمي',
      qty: 1,
      unitPrice: 45000,
    },
  ]);

  if (!isOpen || !rfq) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: 'Additional Audio/Visual Support Unit',
        titleAr: 'وحدة دعم فني وتجهيزات إضافية',
        qty: 1,
        unitPrice: 15000,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculatedTotal = items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuotation({
      rfqId: rfq.id,
      rfqCode: rfq.rfqCode,
      eventTitle: rfq.eventTitle,
      eventTitleAr: rfq.eventTitleAr,
      organizerName: rfq.organizerName,
      proposedPrice: calculatedTotal > 0 ? calculatedTotal : (rfq.estimatedBudgetMax || 150000),
      depositPercent,
      timelineDays,
      scopeSummary: scopeSummary || 'Comprehensive AV & Staging Execution Proposal',
      scopeSummaryAr: scopeSummaryAr || 'عرض فني ومالي متكامل لتشغيل وتجهيز الفعالية',
      items,
      terms,
      termsAr,
      validUntil: rfq.deadline,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full">
                {rfq.rfqCode}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? 'المنظم:' : 'Organizer:'} {rfq.organizerName}
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {isAr ? 'تقديم عرض سعر رسمي (Quotation Proposal)' : 'Submit Official RFQ Quotation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Target Event Info */}
          <div className="rounded-2xl bg-blue-50/60 p-4 border border-blue-100 space-y-1">
            <h4 className="text-xs font-bold text-slate-900">
              {isAr ? rfq.eventTitleAr : rfq.eventTitle}
            </h4>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
              <span>📍 {rfq.eventLocation}</span>
              <span>
                💰 {isAr ? 'الميزانية القصوى للمنظم:' : 'Organizer Max Budget:'}{' '}
                <strong>{rfq.estimatedBudgetMax.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</strong>
              </span>
            </div>
          </div>

          {/* Scope Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isAr ? 'ملخص نطاق العمل المقترح (Scope Summary)' : 'Scope of Work Summary'} *
            </label>
            <textarea
              required
              rows={2}
              value={isAr ? (scopeSummaryAr || scopeSummary) : scopeSummary}
              onChange={(e) => {
                setScopeSummary(e.target.value);
                setScopeSummaryAr(e.target.value);
              }}
              placeholder={
                isAr
                  ? 'ملخص التجهيزات والمواصفات الفنية المشمولة بالعرض...'
                  : 'Outline your technical equipment, team coverage, and operational deliverables...'
              }
              className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-[#2563EB] focus:outline-hidden"
            />
          </div>

          {/* Itemized Deliverables */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                {isAr ? 'بنود العرض المالي وتفصيل التكلفة (Itemized Quotation)' : 'Deliverables & Cost Breakdown'}
              </label>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="size-3.5" />
                <span>{isAr ? 'إضافة بند' : 'Add Item'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
                >
                  <input
                    type="text"
                    value={isAr ? item.titleAr : item.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setItems((prev) =>
                        prev.map((it, i) => (i === idx ? { ...it, title: val, titleAr: val } : it))
                      );
                    }}
                    placeholder={isAr ? 'اسم البند / الخدمة' : 'Item description'}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs focus:border-[#2563EB] focus:outline-hidden"
                  />
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-[10px] text-slate-400">{isAr ? 'كمية:' : 'Qty:'}</span>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => {
                        const qty = Number(e.target.value);
                        setItems((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, qty } : it))
                        );
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-mono text-center focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                  <div className="flex items-center gap-1 w-32">
                    <span className="text-[10px] text-slate-400">{isAr ? 'ج.م' : 'EGP'}</span>
                    <input
                      type="number"
                      step={500}
                      value={item.unitPrice}
                      onChange={(e) => {
                        const unitPrice = Number(e.target.value);
                        setItems((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, unitPrice } : it))
                        );
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-mono text-end focus:border-[#2563EB] focus:outline-hidden"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Total Display */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-bold">
              <span>{isAr ? 'إجمالي قيمة العرض المقترح:' : 'Total Proposed Quotation Value:'}</span>
              <span className="text-sm font-mono text-emerald-400">
                {calculatedTotal.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
              </span>
            </div>
          </div>

          {/* Payment Terms & Execution Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'نسبة الدفعة المقدمة المطلوبة' : 'Advance Deposit Required (%)'}
              </label>
              <select
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
              >
                <option value={30}>30% {isAr ? 'دفعة أولى' : 'Advance'}</option>
                <option value={40}>40% {isAr ? 'دفعة أولى (موصى بها)' : 'Advance (Standard)'}</option>
                <option value={50}>50% {isAr ? 'دفعة أولى' : 'Advance'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {isAr ? 'مدة التجهيز والتركيب (أيام قبل الفعالية)' : 'Setup Timeline (Days Prior)'}
              </label>
              <input
                type="number"
                min={1}
                value={timelineDays}
                onChange={(e) => setTimelineDays(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isAr ? 'شروط التنفيذ والتعاقد' : 'Contract Terms & Payment Milestones'}
            </label>
            <input
              type="text"
              value={isAr ? termsAr : terms}
              onChange={(e) => {
                setTerms(e.target.value);
                setTermsAr(e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-hidden"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              {isAr ? 'سيتلقى المنظم إشعاراً فورياً لدراسة العرض' : 'Organizer will receive instant alert'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2 text-xs font-bold transition shadow-soft flex items-center gap-1.5"
              >
                <CheckCircle className="size-4" />
                <span>{isAr ? 'إرسال العرض رسمياً' : 'Submit Quotation'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
