import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useI18n } from '../../i18n';
import { VendorQuotationItem, QuotationStatus } from '../../types';
import {
  FileText,
  Clock,
  XCircle,
  Search,
  Eye,
  Trash2,
  Award,
  X,
} from 'lucide-react';
import clsx from 'clsx';

export const MyQuotationsView: React.FC = () => {
  const { vendorQuotations, withdrawQuotation, setActiveVendorTab } = useApp();
  const { language } = useI18n();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'ALL' | QuotationStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewQuote, setPreviewQuote] = useState<VendorQuotationItem | null>(null);

  const filteredQuotes = vendorQuotations.filter((q) => {
    const matchesTab = activeTab === 'ALL' || q.status === activeTab;
    const matchesSearch =
      q.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.eventTitleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.rfqCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.organizerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const acceptedCount = vendorQuotations.filter((q) => q.status === 'ACCEPTED').length;
  const pendingCount = vendorQuotations.filter((q) => q.status === 'PENDING').length;
  const totalValue = vendorQuotations.reduce((sum, q) => sum + q.proposedPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="size-6 text-[#2563EB]" />
            <span>{isAr ? 'متابعة عروض الأسعار المقدمة' : 'My Quotations & Proposals'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isAr
              ? 'متابعة العروض المرسلة للمنظمين وموقف كل عرض (V10 / V11)'
              : 'Track submitted proposals, award statuses, and organizer decision milestones'}
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">
            {isAr ? 'إجمالي العروض' : 'Total Proposals'}
          </span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">
            {vendorQuotations.length}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <span className="text-[11px] font-bold text-amber-500 block uppercase">
            {isAr ? 'قيد دراسة المنظم' : 'Pending Review'}
          </span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCount}</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <span className="text-[11px] font-bold text-emerald-500 block uppercase">
            {isAr ? 'عقود تم قبولها' : 'Awarded Quotes'}
          </span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{acceptedCount}</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">
            {isAr ? 'قيمة العروض' : 'Pipeline Value'}
          </span>
          <span className="text-xl font-black text-slate-900 mt-1 block font-mono">
            {(totalValue / 1000).toLocaleString()}k {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-soft">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'البحث في العروض المقدمة...' : 'Search proposals...'}
            className="w-full rounded-xl bg-slate-50 ps-9 pe-4 py-2 text-xs border border-transparent focus:border-[#2563EB] focus:bg-white focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {(
            [
              { id: 'ALL', labelEn: 'All Quotes', labelAr: 'الكل' },
              { id: 'PENDING', labelEn: 'Pending', labelAr: 'قيد المراجعة' },
              { id: 'ACCEPTED', labelEn: 'Awarded', labelAr: 'تم القبول' },
              { id: 'REJECTED', labelEn: 'Declined', labelAr: 'مرفوض' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table / List */}
      <div className="space-y-3">
        {filteredQuotes.map((quote) => (
          <div
            key={quote.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-md transition space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {quote.rfqCode}
                </span>
                <span
                  className={clsx(
                    'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border',
                    quote.status === 'ACCEPTED'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : quote.status === 'PENDING'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  )}
                >
                  {quote.status === 'ACCEPTED' ? (
                    <Award className="size-3 text-emerald-600" />
                  ) : quote.status === 'PENDING' ? (
                    <Clock className="size-3 text-amber-600" />
                  ) : (
                    <XCircle className="size-3 text-red-600" />
                  )}
                  <span>
                    {quote.status === 'ACCEPTED'
                      ? isAr
                        ? 'تم قبول العرض والترسية'
                        : 'Awarded & Accepted'
                      : quote.status === 'PENDING'
                      ? isAr
                        ? 'قيد دراسة المنظم'
                        : 'Under Review'
                      : isAr
                      ? 'لم يتم الاختيار'
                      : 'Declined'}
                  </span>
                </span>
              </div>

              <span className="text-xs text-slate-400">
                {isAr ? 'تاريخ التقديم:' : 'Submitted:'}{' '}
                {new Date(quote.submittedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? quote.eventTitleAr : quote.eventTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAr ? 'المنظم:' : 'Organizer:'} <strong>{quote.organizerName}</strong>
                </p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                  {isAr ? quote.scopeSummaryAr : quote.scopeSummary}
                </p>
              </div>

              <div className="text-start sm:text-end shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isAr ? 'قيمة العرض المالي' : 'Proposed Price'}
                </span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {quote.proposedPrice.toLocaleString()}{' '}
                  <span className="text-xs font-bold text-slate-500">{isAr ? 'ج.م' : 'EGP'}</span>
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {isAr ? `دفعة مقدمة ${quote.depositPercent}%` : `${quote.depositPercent}% advance`}
                </span>
              </div>
            </div>

            {quote.feedbackFromOrganizer && (
              <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-800">
                <strong>{isAr ? 'ملاحظة المنظم:' : 'Organizer Note:'}</strong> {quote.feedbackFromOrganizer}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                {quote.status === 'ACCEPTED' && (
                  <button
                    onClick={() => setActiveVendorTab('orders')}
                    className="font-bold text-[#2563EB] hover:underline"
                  >
                    {isAr ? 'انتقل إلى أمر التنفيذ المرتبط →' : 'Go to linked Service Order →'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewQuote(quote)}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition"
                >
                  <Eye className="size-3.5" />
                  <span>{isAr ? 'تفاصيل العرض' : 'View Proposal'}</span>
                </button>

                {quote.status === 'PENDING' && (
                  <button
                    onClick={() => {
                      if (confirm(isAr ? 'هل أنت متأكد من سحب هذا العرض؟' : 'Withdraw this quote?')) {
                        withdrawQuotation(quote.id);
                      }
                    }}
                    className="flex items-center gap-1 text-slate-400 hover:text-red-600 px-2 py-1.5 text-xs transition"
                  >
                    <Trash2 className="size-3.5" />
                    <span>{isAr ? 'سحب' : 'Withdraw'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredQuotes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
            <FileText className="size-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">
              {isAr ? 'لا توجد عروض أسعار مطابقة' : 'No quotations found'}
            </h4>
          </div>
        )}
      </div>

      {/* Proposal Details Modal */}
      {previewQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold">{previewQuote.rfqCode}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {isAr ? previewQuote.eventTitleAr : previewQuote.eventTitle}
                </h3>
              </div>
              <button
                onClick={() => setPreviewQuote(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 space-y-1">
                <span className="text-slate-500 block">{isAr ? 'نطاق العمل:' : 'Scope Summary:'}</span>
                <p className="font-semibold text-slate-800">
                  {isAr ? previewQuote.scopeSummaryAr : previewQuote.scopeSummary}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 mb-1.5 block">
                  {isAr ? 'البنود والأسعار:' : 'Itemized Deliverables:'}
                </span>
                <div className="space-y-1">
                  {previewQuote.items.map((it, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <span className="text-slate-700">{isAr ? it.titleAr : it.title} (x{it.qty})</span>
                      <span className="font-mono font-bold text-slate-900">
                        {(it.qty * it.unitPrice).toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white font-bold">
                <span>{isAr ? 'الإجمالي المقترح:' : 'Total Value:'}</span>
                <span className="text-sm font-mono text-emerald-400">
                  {previewQuote.proposedPrice.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>

              <div className="text-[11px] text-slate-500">
                <strong>{isAr ? 'شروط السداد:' : 'Payment Terms:'}</strong> {isAr ? previewQuote.termsAr : previewQuote.terms}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setPreviewQuote(null)}
                className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 text-xs transition"
              >
                {isAr ? 'إغلاق المعاينة' : 'Close Preview'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
