import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { OrganizerQuotationComparison } from '../../types';
import { AwardContractModal } from './modals/AwardContractModal';
import {
  Award,
  Star,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import clsx from 'clsx';

export const QuotesComparisonView: React.FC = () => {
  const {
    organizerRfqs,
    organizerQuotes,
    awardQuotationContract,
    setActiveOrganizerTab,
  } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const defaultRfqId = organizerRfqs[0]?.id || 'rfq-201';
  const [selectedRfqId, setSelectedRfqId] = useState<string>(defaultRfqId);

  const [awardModalOpen, setAwardModalOpen] = useState<boolean>(false);
  const [selectedQuoteForAward, setSelectedQuoteForAward] = useState<OrganizerQuotationComparison | null>(null);

  const currentRfq = organizerRfqs.find((r) => r.id === selectedRfqId) || organizerRfqs[0];
  const quotesList = (currentRfq && organizerQuotes[currentRfq.id]) || [];

  const handleOpenAwardModal = (quote: OrganizerQuotationComparison) => {
    setSelectedQuoteForAward(quote);
    setAwardModalOpen(true);
  };

  const handleConfirmAward = () => {
    if (currentRfq && selectedQuoteForAward) {
      awardQuotationContract(currentRfq.id, selectedQuoteForAward.id);
      setActiveOrganizerTab('orders');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {isAr ? 'مقارنة عروض الأسعار وترسية العقد (O19–O21)' : 'Quotation Matrix & Contract Awarding'}
          </h1>
          <p className="text-xs text-slate-500">
            {isAr
              ? 'مقارنة دقيقة جانبية بين عروض شركات التنفيذ المعتمدة وترسية العقد بضمان المنصة'
              : 'Side-by-side comparison of incoming vendor proposals with AI matching and instant contract execution'}
          </p>
        </div>

        {currentRfq && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{isAr ? 'الطلب الحالي:' : 'Active Tender:'}</span>
            <select
              value={currentRfq.id}
              onChange={(e) => setSelectedRfqId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden"
            >
              {organizerRfqs.map((rfq) => (
                <option key={rfq.id} value={rfq.id}>
                  {rfq.rfqCode} — {rfq.eventTitle}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2. Tender Quick Specs Banner */}
      {currentRfq && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                {currentRfq.rfqCode}
              </span>
              <h2 className="text-sm font-bold text-slate-900">{currentRfq.eventTitle}</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-500">
                {isAr ? 'الميزانية التقديرية:' : 'Max Budget:'}{' '}
                <b className="text-slate-900">{currentRfq.budgetMax.toLocaleString()} ج.م</b>
              </span>
              <span className="text-slate-500">
                {isAr ? 'تاريخ الفعالية:' : 'Event Date:'} <b className="text-slate-900">{currentRfq.eventDate}</b>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Comparison Matrix Grid (Side-by-Side Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotesList.map((quote) => {
          const isAccepted = quote.status === 'ACCEPTED';
          const isBelowBudget = currentRfq ? quote.proposedPrice <= currentRfq.budgetMax : true;

          return (
            <div
              key={quote.id}
              className={clsx(
                'rounded-3xl border bg-white p-6 shadow-soft hover:shadow-md transition flex flex-col justify-between space-y-4',
                isAccepted
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200'
              )}
            >
              <div className="space-y-4">
                {/* Vendor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={quote.vendorLogo}
                      alt={quote.vendorName}
                      className="size-12 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{quote.vendorName}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-0.5">
                        <Star className="size-3 text-amber-500 fill-amber-400" />
                        <span className="font-bold text-slate-700">{quote.vendorRating}</span>
                        <span>({quote.vendorReviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-bold text-indigo-700 font-mono">
                    <Sparkles className="size-3" />
                    <span>{quote.aiMatchScore}%</span>
                  </span>
                </div>

                {/* Proposed Price Highlight */}
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {isAr ? 'السعر المقترح للتنفيذ:' : 'Proposed Contract Price:'}
                  </span>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {quote.proposedPrice.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-slate-400">{quote.currency}</span>
                  </div>
                  {isBelowBudget && (
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      ✓ {isAr ? 'ضمن الميزانية التقديرية المحددة' : 'Within target budget ceiling'}
                    </span>
                  )}
                </div>

                {/* Scope Summary */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700 block">
                    {isAr ? 'نطاق العمل والتجهيزات:' : 'Scope of Deliverables:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isAr ? quote.scopeSummaryAr : quote.scopeSummary}
                  </p>
                </div>

                {/* Turnaround & Terms */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'مدة التجهيز:' : 'Setup Lead Time:'}</span>
                    <span className="font-bold text-slate-800">{quote.deliveryDays} {isAr ? 'أيام' : 'days'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{isAr ? 'التوثيق القانوني:' : 'KYC Status:'}</span>
                    <span className="font-bold text-emerald-600">✓ {isAr ? 'موثق ومعتمد' : 'Verified'}</span>
                  </div>
                </div>

                {/* Match Highlights */}
                <div className="space-y-1 pt-1">
                  {quote.matchHighlights.map((hl, i) => (
                    <div key={i} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-indigo-500" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                {isAccepted ? (
                  <div className="w-full rounded-xl bg-emerald-100 py-2.5 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="size-4" />
                    <span>{isAr ? 'تمت ترسية العقد على هذا المورد' : 'Contract Awarded & Active'}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenAwardModal(quote)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-soft hover:bg-blue-700 transition"
                  >
                    <Award className="size-4" />
                    <span>{isAr ? 'ترسية العقد وإصدار أمر التنفيذ' : 'Award Contract & Issue Order'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contract Award Confirmation Modal */}
      <AwardContractModal
        isOpen={awardModalOpen}
        onClose={() => setAwardModalOpen(false)}
        quotation={selectedQuoteForAward}
        rfqTitle={currentRfq?.eventTitle || ''}
        onConfirm={handleConfirmAward}
      />
    </div>
  );
};
